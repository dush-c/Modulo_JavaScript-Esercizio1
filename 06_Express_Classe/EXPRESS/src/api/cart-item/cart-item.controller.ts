import { NextFunction, Request, Response } from "express";
import productService from "../product/product.service";
import cartItemService from "./cart-item.service";
import { CartItem } from "./cart-item.identity";

export const list =async (req: Request, res: Response, next: NextFunction) =>{

}

export const add = async(req: Request, res: Response, next: NextFunction)=>{
    
    const { productID, quantity } = req.body; 
    console.log(productID, quantity); 
    
    const product = await productService.getById(productID); 

    if(product) { 
        res.send(400); 
        return; 
    }
    
    const newItem: CartItem = { 
        product: productID, 
        quantity
    }

    const saved = await cartItemService.add(newItem); 

    res.send(saved); 
}


export const updateQuantity =async (req: Request, res: Response, next: NextFunction)=>{
    
}

export const remove  = async (req: Request, res: Response, next: NextFunction)=>{
    
}