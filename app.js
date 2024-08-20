const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/userRoute');
const timerRoutes = require('./api/routes/timerRoute');
const cors = require('cors');


require('dotenv').config();

const app = express();

const allowedOrigins = [
    'http://localhost',
    //'http://'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connexion à MongoDB réussie'))
.catch(err => console.error('Erreur de connexion à MongoDB', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

userRoutes(app);
timerRoutes(app);

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
