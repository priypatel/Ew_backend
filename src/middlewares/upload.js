import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!filetypes.includes(file.mimetype)) {
      return cb(
        new Error("Only .jpg, .jpeg, and .png files are allowed!"),
        false,
      );
    }
    cb(null, true);
  },
});

export default upload;
