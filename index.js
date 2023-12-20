import app from "./app.js";
import { connectDB } from "./db/index.js";
const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`E_commerce_app backend is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(`Error :${error}`);
    process.exit(1);
  });
