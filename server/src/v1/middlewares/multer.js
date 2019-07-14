import multer from 'multer';
import fileType from 'file-type';

const acceptedExtensions = ['jpg', 'png'];

const storage = multer.memoryStorage();

const imageFormatValidator = (req, res, next) => {
  if (req.file) {
    if (req.file.buffer) {
      // For MemoryStorage, validate the format using `req.file.buffer`
      const mime = fileType(req.file.buffer);

      // if can't be determined or format not accepted
      if (!mime || !acceptedExtensions.includes(mime.ext)) { return next(new Error(`The uploaded file is not in  ${acceptedExtensions.join(',')} format!`)); }
    }
  }
  next();
};

const multerUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB upload limit

  },
  fileFilter: (req, file, cb) => {
    // if the file extension is in our accepted list
    if (acceptedExtensions.some(ext => file.originalname.endsWith(`.${ext}`))) {
      return cb(null, true);
    }

    // otherwise, return error
    return cb(new Error(`Only ${acceptedExtensions.join(',')} files are allowed!`));
  },
}).single('image');

export { multerUpload, imageFormatValidator };
