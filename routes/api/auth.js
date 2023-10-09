const express = require("express");
const { body } = require("express-validator");
const authController = require("../../controllers/auth");
const authenticate = require("../../middlewares/auth");
const User = require("../../models/users");

const router = express.Router();

router.post(
  "/signup",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  authController.signup
);

router.get("/verify/:verificationToken", async (req, res) => {
  try {
    const { verificationToken } = req.params;

    if (!verificationToken) {
      return res.status(400).json({ message: "Verification token is missing" });
    }

    // Znajdź użytkownika po tokenie weryfikacyjnym
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Oznacz użytkownika jako zweryfikowanego
    user.verify = true;
    await user.save();

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error("Błąd weryfikacji emaila:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint do ponownego wysyłania emaila z odnośnikiem do weryfikacji
router.post("/verify", async (req, res) => {
  try {
    const { email } = req.body;

    // Znajdź użytkownika po emailu
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Jeśli użytkownik jest już zweryfikowany, nie wysyłaj ponownie emaila
    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    // Generuj nowy token weryfikacyjny
    const newVerificationToken = uuidv4(); // Możesz użyć innej biblioteki do generowania tokenów

    // Aktualizuj token weryfikacyjny użytkownika
    user.verificationToken = newVerificationToken;
    await user.save();

    // Wyślij ponownie e-mail weryfikacyjny
    sendVerificationEmail(user.email, user.verificationToken);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Błąd ponownego wysyłania emaila weryfikacyjnego", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", authController.login);

router.get("/logout", authenticate, authController.logout);

module.exports = router;
