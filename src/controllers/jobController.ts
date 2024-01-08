import { Request, Response, NextFunction } from 'express';
import JobModel, { JobDocument } from '../models/job';
import JobApplicationModel, { JobApplicationDocument } from '../models/jobApplication';
import { AuthenticatedRequest } from '../middlewares/authorizeMiddleware';
import mongoose, { Types } from 'mongoose';

class JobController {
  async createJob(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, image, active, postedAt, company, salary } = req.body;
      const newJob = new JobModel({
        title,
        description,
        image,
        active,
        postedAt,
        company,
        salary,
      });

      await newJob.save();
      res.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async listJob(req: Request, res: Response, next: NextFunction) {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const pageNumber = parseInt(page.toString(), 10);
        const pageSizeNumber = parseInt(pageSize.toString(), 10);

        if (isNaN(pageNumber) || isNaN(pageSizeNumber) || pageNumber < 1 || pageSizeNumber < 1) {
            return res.status(400).json({ error: 'Invalid page or pageSize values' });
        }

        const skip = (pageNumber - 1) * pageSizeNumber;
        const jobs: JobDocument[] = await JobModel.find({ active: true })
        .skip(skip)
        .limit(pageSizeNumber)
        .select('-description -postedAt -active -salary');

        res.status(200).json({
            jobs,
            page: pageNumber,
            pageSize: pageSizeNumber,
        });
    } catch (error) {
        next(error);
    }
  }

  async deleteJob(req: Request, res: Response, next: NextFunction) {
    try {
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({ error: 'Invalid job ID parameter' });
        }

        const deletedJob = await JobModel.findByIdAndDelete(jobId);
        if (!deletedJob) {
          return res.status(404).json({ error: 'Job not found' });
        }  

        res.status(200).json({ message: 'Job deleted successfully'});
    } catch (error) {
        next(error);
    }
  }

  async getJob(req: Request, res: Response, next: NextFunction) {
    try {
      const jobId = req.params.id;
      if (!jobId) {
        return res.status(400).json({ error: 'Invalid job ID' });
      }

      const job: JobDocument | null = await JobModel.findById(jobId);
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

      res.status(200).json({ job });
    } catch (error) {
        next(error);
    }
  }

  async applyToJob(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const jobId = req.params.id;
      const userId = req.user?.userId; 
      const { resume } = req.body;

      if (!jobId || !userId) {
        return res.status(400).json({ error: 'Invalid request parameters or missing fields' });
      }

      const job: JobDocument | null = await JobModel.findById(jobId);
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

      const application = new JobApplicationModel({
        jobId: job._id,
        userId: userId,
        resume,
      });

      const savedApp = await application.save();
      res.status(200).json({ message: 'Application submitted successfully', savedApp });
    } catch (error) {
        next(error);
    }
  }

  async getAppliedJobs(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }

      const appliedJobsData: JobApplicationDocument[] = await JobApplicationModel.find({ userId });
      const validJobIds: Types.ObjectId[] = await getValidJobIds(appliedJobsData);
      const appliedJobs: JobDocument[] = await JobModel.find({ _id: { $in: validJobIds }, active: true })
        .select('-description -postedAt -active -salary -_id');
      res.status(200).json({
        appliedJobs,
      });
    } catch (error) {
      next(error);
    }
  }
}

async function getValidJobIds(appliedJobsData: JobApplicationDocument[]): Promise<Types.ObjectId[]> {
  const validJobIds: Types.ObjectId[] = [];

  for (const application of appliedJobsData) {
    if (mongoose.Types.ObjectId.isValid(application.jobId)) {
      validJobIds.push(new mongoose.Types.ObjectId(application.jobId.toString()));
    } else {
      console.error(`Invalid ObjectId: ${application.jobId}`);
    }
  }

  return validJobIds;
}

export default new JobController();
