import mongoose from 'mongoose';

const routineSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  milestones: [{
    week: Number,
    benefit: String
  }],
  steps: [{
    name: String,
    description: String,
  }],
});

export default mongoose.model('Routine', routineSchema);

