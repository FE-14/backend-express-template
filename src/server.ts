import bodyParser from "body-parser";
import cors from "cors";
import morgan from 'morgan'
import App from "./app";
import dotEnv from 'dotenv'
import modelInit from "./models";
import controllers from "./controllers";

dotEnv.config()

const { app } = new App({
    // TODO: buat dinamis
    controllers: controllers,
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        cors(),
        // TODO: simpan di file, pisah per hari
        morgan("combined"),
    ]
})

const PORT = +(process.env.PORT || 4000);

app.listen(PORT, '0.0.0.0', async () => {
    await modelInit()
    console.log(`[LISTEN] starting http://localhost:${PORT}/api/v1`)
})