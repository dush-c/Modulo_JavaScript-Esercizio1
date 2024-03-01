import { CartItem } from "./cart-item.identity";

const Cart: CartItem[] = []; 

export class CartItemService {
 async add(item: CartItem) {

    const existing = Cart.find(element => element.product ===item.product); 

    if(existing){
        existing.quantity= item.quantity; 
        return existing; 
    }

    const toAdd = {
        id: `${Cart.length}`,
        ...item 
    }
    Cart.push(toAdd); 
    console.log(toAdd); 
    return toAdd; 
 }

}
export default new CartItemService(); 