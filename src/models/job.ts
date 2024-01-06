import { Schema, model, Document } from 'mongoose';

interface Job {
  title: string;
  description: string;
  image?: string;
  active: boolean;
  postedAt: Date;
  company: string;
  salary: number;
}

interface JobDocument extends Job, Document {}

const jobSchema = new Schema<JobDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // Optional image URL
  active: { type: Boolean, default: true },
  postedAt: { type: Date, default: Date.now },
  company: { type: String, required: true },
  salary: { type: Number, required: true },
},
{
  versionKey: false
});

const JobModel = model<JobDocument>('Job', jobSchema);

export { JobDocument }
export default JobModel;
