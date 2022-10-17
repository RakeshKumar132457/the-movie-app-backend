const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((con) => {
		console.log("DB connection successfully");
	});

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`Server running on http://127.0.0.1:${port}`);
});
