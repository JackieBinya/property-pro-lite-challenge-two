import uuid from 'uuid';
import moment from 'moment';

class Property {
  constructor() {
    this.properties = [];
  }

  //  Fetch all properties
  findAll() {
    return this.properties;
  }

  findAllMyAds(id) {
    return this.properties.filter(prop => prop.owner === id);
  }

  findAdsOfSpecificType(type) {
    return this.properties.filter(property => property.type === type);
  }

  // Create and save a property
  create({
    status = 'available', price, state, city, address, type, imageUrl, description, title, owner,
  }) {
    const newProperty = {
      id: uuid.v4(),
      status,
      price,
      state,
      city,
      address,
      type,
      description,
      title,
      imageUrl,
      owner,
      createdOn: moment(),
    };

    this.properties.push(newProperty);

    return newProperty;
  }

  // Get a property by id
  findOne(id) {
    return this.properties.find(user => user.id === id);
  }

  // Delete a property
  delete(id) {
    // const property = this.findOne(id);
    const newProperties = this.properties.filter(property => property.id !== id);
    this.properties = [...newProperties];
    return true;
  }

  // Update a property
  update(id, data) {
    const property = this.findOne(id);
    const index = this.properties.indexOf(property);
    Object.assign(this.properties[index], data);
    return this.properties[index];
  }

  markPropertySold(id) {
    const property = this.findOne(id);
    const index = this.properties.indexOf(property);
    this.properties[index].status = 'sold';

    return this.properties[index];
  }

  remove() {
    this.properties = [];
  }
}

export default new Property();
