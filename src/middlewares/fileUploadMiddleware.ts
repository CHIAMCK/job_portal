import express from 'express';
import multer from 'multer';
import fs from 'fs';

const uploadDestination = './uploads/';

// Create the destination folder if it doesn't exist
if (!fs.existsSync(uploadDestination)) {
  fs.mkdirSync(uploadDestination);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDestination);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage });

const fileUploadMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const singleUpload = upload.single('image'); 

  singleUpload(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    next(); 
  });
};

export { fileUploadMiddleware };
