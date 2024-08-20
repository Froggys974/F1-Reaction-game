const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.userRegister = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email déjà utilisé' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role || 1
        });

        const user = await newUser.save();
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_KEY, { expiresIn: '10h' });

        res.status(201).json({ message: `Utilisateur créé: ${user.email}`, token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_KEY, { expiresIn: '10h' });

        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
