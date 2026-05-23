import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    input: {
      location: String,
      soilType: String,
      landArea: Number,
      season: String,
    },
    result: {
      crop: String,
      yield: String,
      profit: String,
      reason: String,
      mixFarming: {
        suggestion: String,
        benefit: String,
        profitIncrease: String,
      },
      tips: [String],
      rawAI: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Recommendation', recommendationSchema);
