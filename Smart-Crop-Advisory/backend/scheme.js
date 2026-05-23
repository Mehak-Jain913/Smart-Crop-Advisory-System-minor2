import mongoose from 'mongoose'

//mongoose.connect('mongodb://localhost:27017/dbms')
const schemeSchema = new mongoose.Schema({
  title: String,
  url: {
    type:String,
    unique: true,
    },
  source: String,
  card:String,
  scrapedAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model('Scheme', schemeSchema);

