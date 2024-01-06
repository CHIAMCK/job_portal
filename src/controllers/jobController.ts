// controllers/JobController.ts
import { Request, Response, NextFunction } from 'express';
import JobModel, { JobDocument } from '../models/job';

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

        const jobs: JobDocument[] = await JobModel.find()
        .skip(skip)
        .limit(pageSizeNumber);

        res.status(200).json({
            jobs,
            page: pageNumber,
            pageSize: pageSizeNumber,
        });
    } catch (error) {
        next(error);
    }
  }
}

export default new JobController();
