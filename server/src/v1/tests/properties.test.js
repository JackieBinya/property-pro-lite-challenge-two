/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models';
import generateToken from '../utils/authService';

chai.use(chaiHttp);
const { expect } = chai;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiMDk2M2RmOTMtZmI4Ny00ZDc5LWI0YzctY2QwY2U0ZGQ3MzQ4IiwiaWF0IjoxNTYxNTY3NDMzfQ.U-jbZoPtBeAcNFNUqR_C93xnjjH9xr3Yc_T67UK5nPs';

describe('properties', () => {
  beforeEach((done) => {
    models.Property.remove();
    done();
  });

  it('POST /property, should post /', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.equal('success');
        expect(res.body.data).to.have.key('imageUrl', 'address', 'state', 'city', 'title', 'description', 'price', 'type', 'id', 'owner', 'status', 'createdOn');
        expect(res.body.data.imageUrl).to.be.a('string');
        expect(res.body.data.address).to.equal('4 De Waat Terraces, Goodwood');
        expect(res.body.data.state).to.equal('Goodwood');
        expect(res.body.data.city).to.equal('Bulawayo');
        expect(res.body.data.title).to.equal('One bedroom  in a quiet surburb');
        expect(res.body.data.description).to.equal('Cosy bedsitter, suitable for singles');
        expect(res.body.data.price).to.equal('$120');
        expect(res.body.data.type).to.equal('1 bedroom');
        done(err);
      });
  });

  it('POST /property, should not post / if user does not have token', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', '')
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.equal('error');
        expect(res.body.msg).to.equal('No token access denied');
        done(err);
      });
  });

  it('POST /property, should not post / if user does not upload image', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', '')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.msg).to.equal('Please upload an image of your property to continue.');
        done(err);
      });
  });

  it('POST /property, should not post / if user does not fill in address field', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.msg).to.equal('Please provide the address of your property.');
        done(err);
      });
  });

  it('POST /property, should not post / if user does not fill in state field', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', '')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.msg).to.equal('Please provide the state in which your property is located.');
        done(err);
      });
  });

  it('POST /property, should not post / if user does not fill in  city field', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', '')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.msg).to.equal('Please provide the city where your property is located.');
        done(err);
      });
  });

  it('POST /property, should not post / if user does not fill in title field', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', '')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.msg).to.equal('Please provide a title for your property ad.');
        done(err);
      });
  });

  it('POST /property, should not post / if user does not fill in description field', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', '')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.msg).to.equal('Please provide a description of your property.');
        done(err);
      });
  });

  it('POST /property, should not post / if description exceeds 150 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. ')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.msg).to.equal('The description is too long, make sure its no more than 150 characters long!');
        done(err);
      });
  });

  it('POST /property, should not post / if title provided by user exceeds', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus.')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.msg).to.equal('The title is too long, make sure its no more than 45 characters long!');
        done(err);
      });
  });

  it('POST /property, should not post / if user does not fill in price field', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.msg).to.equal('Please provide a valid price of your property.');
        done(err);
      });
  });

  it('POST /property, should not post / if user does not select a type', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.msg).to.equal('Please select a type that matches your property.');
        done(err);
      });
  });

  it('PATCH /:propertyId, should update an existing ads title given id', (done) => {
    const newUser = models.User.create({
      firstName: 'foo',
      lastName: 'bar',
      email: 'foo@bar.com',
      password: 'abcdef',
    });

    const property = models.Property.create({
      imageUrl: 'my image 05',
      address: '4 De Waat Terraces, Goodwood',
      state: 'Goodwood',
      city: 'Bulawayo',
      title: 'One bedroom  in a quiet surburb',
      description: 'Cosy bedsitter, suitable for singles',
      price: '$120',
      type: '1 bedroom',
      owner: `${newUser.id}`,
    });

    const myToken = generateToken(newUser.id);

    chai
      .request(app)
      .patch(`/api/v1/property/${property.id}`)
      .set('x-auth-token', myToken)
      .send({
        title: '1 bed in Goodwood, TO RENT!',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.key('imageUrl', 'address', 'state', 'city', 'title', 'description', 'price', 'type', 'id', 'status', 'owner', 'createdOn');
        expect(res.body.data.id).to.be.equal(`${property.id}`);
        expect(res.body.data.title).to.equal('1 bed in Goodwood, TO RENT!');
        done(err);
      });
  });

  it('PATCH /:propertyId/sold, should mark a property as sold', (done) => {
    const newUser = models.User.create({
      firstName: 'foo',
      lastName: 'bar',
      email: 'foo@bar.com',
      password: 'abcdef',
    });

    const property = models.Property.create({
      imageUrl: 'my image 06',
      address: '4 De Waat Terraces, Goodwood',
      state: 'Goodwood',
      city: 'Bulawayo',
      title: 'One bedroom  in a quiet surburb',
      description: 'Cosy bedsitter, suitable for singles',
      price: '$120',
      type: '1 bedroom',
      owner: `${newUser.id}`,
    });

    const myToken = generateToken(newUser.id);

    chai
      .request(app)
      .patch(`/api/v1/property/${property.id}/sold`)
      .set('x-auth-token', myToken)
      .send({
        title: '1 bed in Goodwood, TO RENT!',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.key('imageUrl', 'address', 'state', 'city', 'title', 'description', 'price', 'type', 'id', 'status', 'owner', 'createdOn');
        expect(res.body.data.id).to.be.equal(`${property.id}`);
        expect(res.body.data.status).to.equal('sold');
        done(err);
      });
  });

  it('DELETE /property/:propertyId, should enable a user to delete their own ad', (done) => {
    const newUser = models.User.create({
      firstName: 'foo',
      lastName: 'bar',
      email: 'foo@bar.com',
      password: 'abcdef',
    });

    const newPropertyAd = models.Property.create({
      imageUrl: 'my image 08',
      address: '4 De Waat Terraces, Goodwood',
      state: 'Goodwood',
      city: 'Bulawayo',
      title: 'One bedroom  in a quiet surburb',
      description: 'Cosy bedsitter, suitable for singles',
      price: '$120',
      type: '1 bedroom',
      owner: `${newUser.id}`,
    });

    const newToken = generateToken(newUser.id);

    chai
      .request(app)
      .delete(`/api/v1/property/${newPropertyAd.id}`)
      .set('x-auth-token', newToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.msg).to.be.equal('Property ad is sucessfully deleted');
        done(err);
      });
  });

  it('GET /property, should get all property ads ', (done) => {
    chai
      .request(app)
      .get('/api/v1/property')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data.length).to.equal(0);
        done(err);
      });
  });

  it('GET /property, should get property ads of a specific type', (done) => {
    chai
      .request(app)
      .get('/api/v1/property/?type=1%20bedroom')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data.length).to.be.equal(0);
        done(err);
      });
  });

  it('GET /property/:propertyId, should get a specific property ad', (done) => {
    const property = models.Property.create({
      imageUrl: 'my image 04',
      address: '4 De Waat Terraces, Goodwood',
      state: 'Goodwood',
      city: 'Bulawayo',
      title: 'One bedroom  in a quiet surburb',
      description: 'Cosy bedsitter, suitable for singles',
      price: '$120',
      type: '1 bedroom',
      owner: '123',
    });

    chai
      .request(app)
      .get(`/api/v1/property/${property.id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.key('imageUrl', 'address', 'state', 'city', 'id', 'status', 'type', 'price', 'title', 'description', 'createdOn', 'owner');
        done(err);
      });
  });

  it('GET /property/:propertyId, should not get an advert if provide a non existant id', (done) => {
    const id = 'abcdef';

    chai
      .request(app)
      .get(`/api/v1/property/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.msg).to.be.equal('Property ad is not found!');
        done(err);
      });
  });
});
