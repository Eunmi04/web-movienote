import mongoose, { Schema } from 'mongoose'
const memoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isStarred: { type: Boolean, default: false },
    folderId: { type: String, default: '전체' },
  },
  { timestamps: true }
)
const Memo = mongoose.models.Memo || mongoose.model('Memo', memoSchema)
export default Memo