import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from '../config/db';

const ticketRouter = require('../src/routers/ticketRouter');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/tickets", ticketRouter)

async function startApp() {
    try {
        await db.authenticate();
        console.log("✅ Successful connection to the database");

        await db.sync();
        console.log("✅ Database synchronized");

        app.listen(PORT, () => {
            console.log(`✅ Server started on port ${PORT}`);
        });
    } catch (error: any) {
        console.error("❌ Error in connection to the database:", error);
        throw new Error(error);
    }
}

startApp();

