const multer = require("multer");
const jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024, // Maksymalny rozmiar pliku (1MB)
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
    } else {
      callback(new Error("Only images are allowed."));
    }
  },
});

// Funkcja middleware do obsługi przesyłania i zapisywania awatara użytkownika
const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const image = await jimp.read(req.file.buffer);
    await image.cover(250, 250).quality(85); // Obróbka i zmniejszenie rozmiaru obrazu
    const filename = `${uuidv4()}.jpg`; // Unikalna nazwa pliku

    // Zapisz przetworzony obraz do folderu public/avatars
    await image.write(`public/avatars/${filename}`);

    req.user.avatarURL = `/avatars/${filename}`;

    return res.status(200).json({ avatarURL: `/avatars/${filename}` });
  } catch (error) {
    console.error("Błąd przesyłania i zapisywania awatara:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { upload, uploadAvatar };
