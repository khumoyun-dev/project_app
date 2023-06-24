import express from 'express';
import cors from 'cors';

import authRouter from './src/routers/authRouter.js'
import userRouter from './src/routers/userRouter.js'
import collectionRouter from './src/routers/collectionRouter.js';
import { postgres } from './src/modules/postges.js';
import itemRouter from './src/routers/itemRouter.js';
import commentRouter from './src/routers/commentRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/collections", collectionRouter);
app.use("/items", itemRouter);
app.use("/comments", commentRouter);

// app.use(async (req, res, next) => {
//     req.postgres = db;
//     next();
// });


const PORT = process.env.PORT || 3000;
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


