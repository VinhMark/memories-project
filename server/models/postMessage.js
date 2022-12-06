import mongoose from 'mongoose';
import URLSlug from 'mongoose-slug-generator';

mongoose.plugin(URLSlug);
const postSChema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] },
  createAt: { type: Date, default: new Date() },
  slug: { type: String, slug: 'title', unique: true },
  comments: { type: Array, default: [] },
});

const PostMessage = mongoose.model('PostMessage', postSChema);
export default PostMessage;
