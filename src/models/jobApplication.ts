import mongoose, { Schema, Document } from 'mongoose';

interface JobApplicationDocument extends Document {
  jobId: mongoose.Types.ObjectId;
  applicantName: string;
  applicantEmail: string;
  applicationText: string;
}

const jobApplicationSchema = new Schema({
  jobId: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true },
  resume: { type: String, required: true },
});

const jobApplicationModel = mongoose.model<JobApplicationDocument>('JobApplication', jobApplicationSchema);

export default jobApplicationModel;
