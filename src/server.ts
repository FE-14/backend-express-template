import bodyParser from "body-parser";
import cors from "cors";
import App from "./app";
import dotEnv from 'dotenv'
import WelcomeController from "./controllers/welcome.controller";

dotEnv.config()

const { app } = new App({
    controllers: [
        new WelcomeController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        cors()
    ]
})

const PORT = Number(process.env.APP_PORT) || 4000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`[LISTEN] starting http://localhost:${PORT}/api/v1`)
})