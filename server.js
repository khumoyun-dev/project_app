import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors);

app.use(async (req, res, next) => {
    req.postgres = db;
    next();
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});

