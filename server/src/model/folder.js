import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
  folderName: {
    type: String,
    required: true,
    unique: true,
  },

  processedAt: {
    type: Date,
    default: Date.now,
  },
});

const Folder = mongoose.model("Folder", FolderSchema);

export default Folder;
