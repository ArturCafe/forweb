import mongoose from "mongoose";

const VebSchema = new mongoose.Schema({
  originalName: String,

  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    required: true,
  },

  currentPath: String,

  fileSize: Number,

  processedAt: {
    type: Date,
    default: Date.now,
  },
});

const Veb = mongoose.model("Veb", VebSchema);

export default Veb;
