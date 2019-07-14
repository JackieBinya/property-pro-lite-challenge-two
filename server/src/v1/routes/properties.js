import { Router } from 'express';
import { cloudinaryConfig } from '../middlewares/cloudinary';
import { multerUpload, imageFormatValidator } from '../middlewares/multer';
import {uploadImage, editImage } from '../middlewares/uploadImage';
import {
  createPropertyAd,
  fetchAllProperties,
  fetchSpecificProperty,
  deletePropertyAd,
  fetchMyads,
  findAdsOfSpecificType,
  markPropertySold,
  editPropertyAd,
} from '../controllers/property';
import {
  postPropertyAdValiadator,
  editAdValidator,
} from '../middlewares/inputValidators';
import { verifyAuthUser, verifyExistingProperty, verifyPropertyBelongsToUser } from '../middlewares/verify';

const router = Router();

router.get('/', fetchAllProperties);
router.get('/', findAdsOfSpecificType);

// Auth user all routes for authenticated user/agents
router.use(verifyAuthUser);

router.post('/', cloudinaryConfig, multerUpload, imageFormatValidator, uploadImage, postPropertyAdValiadator, createPropertyAd);
router.patch('/:propertyId', verifyExistingProperty, verifyPropertyBelongsToUser, editAdValidator, editPropertyAd);
router.patch('/:propertyId/sold', verifyExistingProperty, verifyPropertyBelongsToUser, markPropertySold);
router.delete('/:propertyId', verifyExistingProperty, verifyPropertyBelongsToUser, deletePropertyAd);

export default router;
