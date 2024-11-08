import { Multer } from 'multer';

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;  // Add file type for single file uploads
    }
  }
}
