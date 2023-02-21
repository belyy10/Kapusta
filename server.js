const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.set("strictQuery", false);

const { HOST_URI } = process.env;

async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
      console.log("Docs available at http://localhost:3000/api-docs/")
    });
  } catch (error) {
    console.error("Main failed:", error.message);
    process.exit(1);
  }
}
main();
