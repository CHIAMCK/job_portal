import { Request, Response, NextFunction } from 'express';
import { expect } from 'chai';
import sinon, { SinonSandbox, SinonStub, SinonStubbedInstance } from 'sinon';
import JobController from '../jobController';
import JobModel from '../../models/job';

type StubbedResponse = SinonStubbedInstance<Response>;

describe('JobController', () => {
  let sandbox: SinonSandbox;
  let req: Partial<Request>;
  let res: StubbedResponse;
  let next: SinonStub;
  let saveStub: SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    req = {
      body: {
        title: 'Software Engineer',
        description: 'Exciting job opportunity',
        image: 'job_image.jpg',
        active: true,
        postedAt: new Date(),
        company: 'Awesome Company',
        salary: 80000,
      },
    };

    // Manually create a stubbed instance of Response
    res = {
      status: sandbox.stub(),
      json: sandbox.stub(),
    } as StubbedResponse;

    next = sandbox.stub();

    saveStub = sandbox.stub(JobModel.prototype, 'save');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create a new job', async () => {
    saveStub.resolves();

    await JobController.createJob(req as Request, res as Response, next);

    expect(saveStub.calledOnce).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(next.called).to.be.false;
  });

  it('should handle errors during job creation', async () => {
    saveStub.rejects(new Error('Database error'));

    await JobController.createJob(req as Request, res as Response, next);

    expect(next.calledWithMatch(sinon.match.instanceOf(Error))).to.be.true;
  });
});