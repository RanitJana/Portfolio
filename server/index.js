import "dotenv/config";

import connectDB from "./db/index.js";
import app from "./app.js";
import { _envValue as env } from "./constants.js";

const port = env.PORT || 8000;

connectDB()
  .then(() => {
    console.log(`Database connection successful!`);

    app.listen(port, () => {
      console.log(
        `Server started at port : ${port}\nVisit: http://localhost:${port}`
      );
    });
  })
  .catch((error) => {
    console.log(`MongoDB conenction failed.\n${error}`);
  });
