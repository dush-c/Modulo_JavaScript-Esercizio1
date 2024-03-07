import mongoose from "mongoose";
import { Cart_Item } from "./api/cart-item/cart-item.entity";
let cart_items: Cart_Item[] = [];
import app from "./app";

mongoose.set("debug", true);
mongoose
  .connect("mongodb://localhost:27017/DBGestionaleVI")
  .then((_) => {
    console.log("connected to db");
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((err) => {
    console.error(err);
  });

// app.listen(3000, () => {
//   console.log("Server started on port 3000");
// });
