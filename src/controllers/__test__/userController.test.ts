import { Response, NextFunction } from 'express';
import { expect } from 'chai';
import sinon, { SinonSandbox, SinonStub, SinonStubbedInstance } from 'sinon';
import UserModel, { UserDocument } from '../../models/user';
import UserController from '../userController';
import { AuthenticatedRequest } from '../../middlewares/authorizeMiddleware';

type StubbedResponse = SinonStubbedInstance<Response>;

describe('UserController', () => {
  let sandbox: SinonSandbox;
  let req: AuthenticatedRequest;
  let res: StubbedResponse;
  let next: SinonStub;
  let findByIdStub: SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    req = {
      user: {
        userId: 'someUserId', 
      },
    } as AuthenticatedRequest;

   
    res = {
      status: sandbox.stub(),
      json: sandbox.stub(),
    } as StubbedResponse;

    next = sandbox.stub();


    findByIdStub = sandbox.stub(UserModel, 'findById');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should view user profile details', async () => {
    const mockUser: UserDocument = {
      _id: 'user123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    } as UserDocument;

    findByIdStub.resolves(mockUser);
    await UserController.viewUserProfileDetails(req, res as Response, next);

    expect(findByIdStub.calledWith('someUserId')).to.equal(true);
    expect(res.status.calledWith(200)).to.equal(true);
    expect(res.json.calledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    })).to.equal(true);
    expect(next.called).to.equal(false);
  });

  it('should handle user not found', async () => {
    findByIdStub.resolves(null);
    await UserController.viewUserProfileDetails(req, res as Response, next);
    expect(res.status.calledWith(404)).to.equal(true);
    expect(res.json.calledWith({ error: 'User not found' })).to.equal(true);
    expect(next.called).to.equal(false);
  });

  it('should handle invalid user ID', async () => {
    req.user = undefined

    await UserController.viewUserProfileDetails(req, res as Response, next);
    expect(res.status.calledWith(401)).to.equal(true);
    expect(res.json.calledWith({ error: 'Unauthorized' })).to.equal(true);
    expect(next.called).to.equal(false);
  });
});
