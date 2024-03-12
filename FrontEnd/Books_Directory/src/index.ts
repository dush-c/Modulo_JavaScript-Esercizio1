import app from "./app";
import mongoose from "mongoose";

mongoose.set("debug", true);
mongoose
  .connect("mongodb://localhost:27017/library")
  .then((_) => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
