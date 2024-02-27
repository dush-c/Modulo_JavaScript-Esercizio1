import { Cart_Item } from "./api/cart-item/cart-item.entity";
let cart_items: Cart_Item[] = [];
import app from "./app";

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
