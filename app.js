import express from "express";
import config from "config";
import mongoose from "mongoose";
import {
    authRouter
} from "./routes/auth.routes.js";
const PORT = process.env.PORT || config.get('port') || 3000;
const app = express();

app.use(express.json({
    extended: true
}));
app.use('/api/auth', authRouter);

async function start() {
    try {
        await mongoose.connect(config.get("mongoURI"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}`);
        })
    } catch (e) {
        console.log(`Server error,${e.message}`)
        process.exit(1);
    }
}
start();