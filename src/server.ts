import app from "./app";

/**
 * Load port configution from environment variable
 */
const { PORT } = process.env;

/**
 * port initization
 */
const port = PORT || 3000;

/**
 * Server start with listening the port
 */
app.listen(port, () => {
	console.log(`Server is ready receive the request on port ${port} 🚀🚀🚀`);
});
