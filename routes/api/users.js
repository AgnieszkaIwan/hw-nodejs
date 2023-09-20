const express = require("express");
const authenticate = require("../../middlewares/auth");
const usersController = require("../../controllers/auth");
const { upload, uploadAvatar } = require("../../middlewares/avatar");

const router = express.Router();

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"), // Prześlij plik o nazwie "avatar"
  uploadAvatar // Wywołaj middleware do obsługi przesyłania awatara
);

router.get("/current", authenticate, usersController.getCurrentUser);

module.exports = router;
