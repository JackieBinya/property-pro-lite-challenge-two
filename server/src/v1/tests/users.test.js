/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../app';
import models from '../models';

chai.use(chaiHttp);
const { expect } = chai;

describe('users', () => {
  beforeEach((done) => {
    models.User.remove();
    done();
  });
  it('POST /auth/signup, should authenticate a user when provided with the required details', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: '123456',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.equal('success');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.user.firstName).to.be.equal('foo');
        expect(res.body.data.user.lastName).to.be.equal('bar');
        expect(res.body.data.user.email).to.be.equal('foo@bar.com');
        expect(res.body.data.user.id).to.be.a('string');
        done(err);
      });
  });

  it('POST /auth/signup, should not sign up a user if firstname field is not filled', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: '',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: '123456',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.msg).to.equal('Please enter your first name.');
        done(err);
      });
  });

  it('POST /auth/signup, should not sign up a user if lastname field is not filled', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'foo',
        lastName: '',
        email: 'foo@bar.com',
        password: '123456',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.msg).to.equal('Please enter your last name.');
        done(err);
      });
  });

  it('POST /auth/signup, should not sign up a user if email field is not filled', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'foo',
        lastName: 'bar',
        email: '',
        password: '123456',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.msg).to.equal('Please enter your email.');
        done(err);
      });
  });

  it('POST /auth/signup, should not sign up a user if password field is not filled', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.msg).to.equal('Please enter your password.');
        done(err);
      });
  });

  it('POST /auth/signup, should not sign up a user if password is less than 6 characters long', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: '12345',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.msg).to.equal('Password should be no less than 6 characters long.');
        done(err);
      });
  });

  it('POST /auth/signup, should not register a user with an account already', (done) => {
    const user = models.User.create({
      firstName: 'foo',
      lastName: 'bar',
      email: 'foo@bar.com',
      password: '123456',
    });
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: '123456',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.msg).to.equal('Your email is already registered in the app, you are only allowed to have one account.');
        done(err);
      });
  });

  it('POST /auth/signup, should not register a user who provides an invalid email', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'foo',
        lastName: 'bar',
        email: 'foobar.com',
        password: '123456',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.msg).to.equal('Email invalid!');
        done(err);
      });
  });
});
