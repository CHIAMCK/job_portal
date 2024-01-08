import { Request, Response, NextFunction } from 'express';
import { expect } from 'chai';
import sinon, { SinonSandbox, SinonStub, SinonStubbedInstance } from 'sinon';
import bcrypt from 'bcrypt';
import UserModel from '../../models/user';
import AuthController from '../authController';

type StubbedResponse = SinonStubbedInstance<Response>;

describe('AuthController', () => {
  let sandbox: SinonSandbox;
  let req: Partial<Request>;
  let res: StubbedResponse;
  let next: SinonStub;
  let hashStub: SinonStub;
  let saveStub: SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    req = {
      body: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'securePassword',
        role: 'user',
      },
    };

    res = {
      status: sandbox.stub(),
      json: sandbox.stub(),
    } as StubbedResponse;

    next = sandbox.stub();

    // Mock bcrypt.hash and UserModel.save
    hashStub = sandbox.stub(bcrypt, 'hash');
    saveStub = sandbox.stub(UserModel.prototype, 'save');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should register a new user', async () => {
    // Mock bcrypt.hash to resolve with a hashed password
    hashStub.resolves('hashedPassword');

    // Mock UserModel.save to resolve successfully
    saveStub.resolves();

    // Invoke the register function
    await AuthController.register(req as Request, res as Response, next);

    expect(hashStub.calledWith('securePassword', 10)).to.equal(true);
    expect(saveStub.called).to.equal(true);
    expect(res.status.calledWith(201)).to.equal(true);
    expect(res.json.called).to.equal(true);
    expect(next.called).to.equal(false);
  });

  it('should handle registration error', async () => {
    // Mock bcrypt.hash to reject with an error
    hashStub.rejects(new Error('Bcrypt error'));

    // Invoke the register function
    await AuthController.register(req as Request, res as Response, next);

    // Assertions
    expect(res.status.called).to.equal(false);
    expect(res.json.called).to.equal(false);
    expect(next.calledWithMatch(new Error('Bcrypt error'))).to.equal(true);
  });
});
