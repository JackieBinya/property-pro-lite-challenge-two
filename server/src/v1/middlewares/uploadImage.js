import Datauri from 'datauri';
import path from 'path';
import { uploader } from './cloudinary';

const dUri = new Datauri();
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

const uploadImage = (req, res, next) => {
  if (req.file) {
    const file = dataUri(req).content;
    uploader.upload(file)
      .then((result) => {
        req.imageUrl = result.url;
        next();
      })
      .catch(err => res.status(500).json({
        status: 'error',
        msg: 'Something went wrong while processing your request.',
        error: err,
      }));
  }
  if (!req.file) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please upload an image of your property to continue.',
    });
  }
};

const editImage = (req, res, next) => {
  if (req.file) {
    const file = dataUri(req).content;
    uploader.upload(file)
      .then((result) => {
        req.imageUrl = result.url;
        next();
      })
      .catch(err => res.status(500).json({
        status: 'error',
        msg: 'Something went wrong while processing your request.',
        error: err,
      }));
  }
};

export { uploadImage, editImage };