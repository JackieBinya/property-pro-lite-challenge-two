import models from '../models';

const createPropertyAd = (req, res) => {
  const { imageUrl } = req;
  const owner = req.decoded.payload;

  const {
    title, address, state, city, type, price, description,
  } = req.body;

  const result = models.Property.create({
    imageUrl,
    title: title.trim(),
    address: address.trim(),
    state: state.trim(),
    city: city.trim(),
    type: type.trim(),
    price: price.trim(),
    description: description.trim(),
    owner,
  });

  res.status(201).json({
    status: 'success',
    data: result,
  });
};

const fetchAllProperties = (req, res) => {
  const properties = models.Property.findAll();
  res.status(200).json({
    status: 'success',
    data: properties,
  });
};

const findAdsOfSpecificType = (req, res) => {
  let { type } = req.query;
  type = decodeURI(type);
  const properties = models.Property.findAdsOfSpecificType(type);
  res.status(200).json({
    status: 'success',
    data: properties,
  });
};

const fetchSpecificProperty = (req, res) => {
  const { propertyId } = req.params;
  const result = models.Property.findOne(propertyId);

  if (result) {
    return res.status(200).json({
      status: 'success',
      data: result,
    });
  }

  if (!result) {
    return res.status(400).json({
      status: 'error',
      msg: 'Property ad is not found!',
    });
  }
};

const deletePropertyAd = (req, res) => {
  const { propertyId } = req.params;
  const result = models.Property.delete(propertyId);

  if (result) {
    return res.status(200).json({
      status: 'success',
      msg: 'Property ad is sucessfully deleted',
    });
  }
};

const fetchMyads = (req, res) => {
  const id = req.decoded.payload;
  const properties = models.Property.findAllMyAds(id);

  if (properties.length) {
    return res.status(200).json({
      status: 'success',
      data: properties,
    });
  }

  if (!properties.length) {
    return res.status(400).json({
      status: 'error',
      msg: 'No properties found!',
    });
  }
};

const editPropertyAd = (req, res) => {
  const { propertyId } = req.params;

  const obj = Object.assign({}, req.body);

  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      obj[key] = obj[key].trim();
    }
  });

  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      delete obj[key];
    }
  });

  const result = models.Property.update(propertyId, obj);
  res.status(200).json({
    status: 'success',
    data: result,
  });
};

const markPropertySold = (req, res) => {
  const { propertyId } = req.params;
  const result = models.Property.markPropertySold(propertyId);
  res.status(200).json({
    status: 'success',
    data: result,
  });
};

export {
  createPropertyAd,
  fetchAllProperties,
  fetchSpecificProperty,
  deletePropertyAd,
  fetchMyads,
  findAdsOfSpecificType,
  editPropertyAd,
  markPropertySold,
};
