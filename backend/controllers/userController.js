const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => jwt.sign(
  { id: user._id, role: user.role }, 
  process.env.JWT_SECRET, 
  { expiresIn: "7d" }
);

exports.register = async (req, res) => {
  const { email, password, role = "public", adminToken } = req.body;

  try {
    // تحقق من وجود المستخدم بالفعل
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Ce mail est déjà utilisé" });

    // التحقق من صلاحيات الإدمن
    if (role === "admin") {
      console.log("🔍 Vérification adminToken reçu :", adminToken);
      console.log("🔑 Clé attendue :", process.env.ADMIN_SECRET_TOKEN);

      if (!adminToken || adminToken !== process.env.ADMIN_SECRET_TOKEN) {
        return res.status(403).json({ error: "Accès refusé : Clé admin invalide" });
      }
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء وحفظ المستخدم
    user = new User({ email, password: hashedPassword, role });
    await user.save();

    return res.json({
      message: "Inscription réussie !",
      token: generateToken(user),
      role: user.role
    });

  } catch (err) {
    console.error("Erreur d'inscription :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ error: "Mot de passe incorrect" });

    return res.json({
      token: generateToken(user),
      role: user.role
    });

  } catch (err) {
    console.error("Erreur serveur :", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
