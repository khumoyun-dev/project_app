import express from 'express';
import cors from 'cors';

import authRouter from './src/routers/authRouter.js'
import userRouter from './src/routers/userRouter.js'
import testRouter from './src/routers/testRouter.js';
import postgres from './src/modules/postges.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);

// app.use("/auth", authRouter);
// app.use("/users", userRouter);

// app.use('/', testRouter);

app.use((err, req, res, next) => {
    // Log the error
    console.error(err);

    // Send the error response
    res.send(`${err}`);
    next();
});

// app.use(async (req, res, next) => {
//     req.postgres = db;
//     next();
// });


const PORT = process.env.PORT || 8000;
const start = async () => {
    try {
        await postgres();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}...`);
        });
    } catch (error) {
        throw new Error(`${error}`)
    }
}

start();


