import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname =
      file.originalname.split('.').pop() !== undefined &&
      fileTypes.test(file.originalname.split('.').pop()!);

    if (mimeType && extname) {
      return cb(null, true);
    } else {
      return cb(
        new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname)
      );
    }
  },
});

export default upload;
