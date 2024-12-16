import mongoose from 'mongoose'

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isDefault: {
    type: Boolean,
    default: false
  }
})

const Folder = mongoose.models.Folder || mongoose.model('Folder', folderSchema)
export default Folder 