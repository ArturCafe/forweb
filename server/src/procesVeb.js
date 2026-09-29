import fs from "fs-extra";
import path from "path";
import mongoose from "mongoose";
import chokidar from "chokidar";
import Veb from "./model/veb.js";
import Folder from "./model/folder.js";
import dotenv from "dotenv";

dotenv.config();

const MEDIA_EXTENSIONS = [
  ".mp4",
  ".mkv",
  ".avi",
  ".mov",
  ".flv",
  ".wmv",
  ".png",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".bmp",
  ".tiff",
  ".tif",
];

const sourceDir = process.env.WATCH_DIR;
const destDir = process.env.DEST_DIR;

/**
 * Procesează un singur fișier
 */
async function procesWeb(sourcePath) {
  try {
    const file = path.basename(sourcePath);
    const ext = path.extname(file).toLowerCase();

    if (!MEDIA_EXTENSIONS.includes(ext)) {
      return;
    }

    const stats = await fs.stat(sourcePath);

    if (!stats.isFile()) {
      return;
    }

    // Folderul final = ziua procesării
    const dateFolder = new Date().toLocaleDateString("en-CA", {
      timeZone: "Europe/Chisinau",
    });

    // Calea relativă salvată în DB
    const relativeCurrentPath = path.join(dateFolder, file);

    // Calea fizică pe VPS
    const finalDir = path.join(destDir, dateFolder);

    await fs.ensureDir(finalDir);

    const destPath = path.join(finalDir, file);

    console.log(`📅 Ziua: ${dateFolder}`);
    console.log(`📂 Destinație: ${finalDir}`);
    console.log("\n🎬 Fișier nou");
    console.log(`📄 Fișier: ${file}`);
    console.log(`📅 Ziua: ${dateFolder}`);
    console.log(`📥 Din: ${sourcePath}`);
    console.log(`📤 În: ${destPath}`);

    // Găsește folderul zilei sau îl creează
    const folder = await Folder.findOneAndUpdate(
      { folderName: dateFolder },
      { $setOnInsert: { folderName: dateFolder } },
      {
        new: true,
        upsert: true,
      },
    );

    // Salvează fișierul și legătura cu Folder
    const vebDoc = new Veb({
      originalName: file,
      folderId: folder._id,
      currentPath: relativeCurrentPath,
      fileSize: stats.size,
    });

    await vebDoc.save();

    console.log(`📝 MongoDB: ${vebDoc._id}`);

    // Mută fișierul
    await fs.move(sourcePath, destPath, {
      overwrite: true,
    });

    console.log(`🚚 Mutat în: ${destPath}`);

    // Șterge directoarele goale
    await removeEmptyDirectories(path.dirname(sourcePath));
  } catch (error) {
    console.error("❌ Eroare procesare:", error);
  }
}

async function removeEmptyDirectories(dir) {
  try {
    // Nu urcăm mai sus de incoming
    if (path.resolve(dir) === path.resolve(sourceDir)) {
      return;
    }

    const entries = await fs.readdir(dir);

    // Dacă folderul nu este gol, îl lăsăm
    if (entries.length > 0) {
      return;
    }

    await fs.remove(dir);

    console.log(`🗑️ Director gol șters: ${dir}`);

    // Verifică și directorul părinte
    await removeEmptyDirectories(path.dirname(dir));
  } catch (error) {
    console.error("❌ Eroare ștergere director:", error);
  }
}

/**
 * Pornește serviciul
 */
async function start() {
  try {
    if (!sourceDir) {
      throw new Error("WATCH_DIR nu este definit în .env");
    }

    if (!destDir) {
      throw new Error("DEST_DIR nu este definit în .env");
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI nu este definit în .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB conectat");

    // Creează directoarele principale
    await fs.ensureDir(sourceDir);
    await fs.ensureDir(destDir);

    console.log(`👀 Urmăresc recursiv: ${sourceDir}`);

    /*
     * ignoreInitial: false
     *
     * Procesează și fișierele care existau deja
     * când serviciul a fost pornit.
     */
    chokidar
      .watch(sourceDir, {
        ignored: (filePath) => {
          return filePath === destDir;
        },

        ignoreInitial: false,

        awaitWriteFinish: {
          stabilityThreshold: 2000,
          pollInterval: 100,
        },
      })

      .on("add", procesWeb)

      .on("error", (error) => {
        console.error("❌ Chokidar:", error);
      });
  } catch (error) {
    console.error("❌ Pornire eșuată:", error);

    process.exit(1);
  }
}

start();
