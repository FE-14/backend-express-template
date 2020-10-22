import bodyParser from "body-parser";
import cors from "cors";
import morgan from 'morgan'
import App from "./app";
import dotEnv from 'dotenv'
import WelcomeController from "./controllers/welcome.controller";
import { startModel } from "./models";
import UserController from "./controllers/user.controller";
import AuthController from "./controllers/auth.controller";

dotEnv.config()

const { app } = new App({
    // TODO: buat dinamis
    controllers: [
        new WelcomeController(),
        new UserController(),
        new AuthController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        cors(),
        morgan("combined")
    ]
})

const PORT = +(process.env.PORT || 4000);

app.listen(PORT, '0.0.0.0', async () => {
    await startModel()
    console.log(`[LISTEN] starting http://localhost:${PORT}/api/v1`)
})