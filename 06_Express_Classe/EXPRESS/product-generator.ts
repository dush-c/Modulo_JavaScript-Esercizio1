/*{
    id: string; --> database.mongodbObjectId
    name: string; -->  commerce.productName 
    description: number; --> commerce.productDescription
    netPrice: number; --> commerce.price
    weight: number; --> number.int
    discount : number; --> number.float
}*/

import { fakerIT as faker } from "@faker-js/faker";
import { writeFileSync } from "fs";
import fs from "fs";

function generateRandomProduct() {
  return {
    //  id : faker.database.mongodbObjectId(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    netPrice: parseFloat(faker.commerce.price({ min: 1, max: 10000 })),
    weight: faker.number.int({ min: 50, max: 2000 }),
    discount: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
  };
}

function generateProduct(num: number) {
  // const product: any[] = [];
  // for(let i=0; i < num; i++){
  //     product.push(generateRandomProduct());
  // }
  const product = Array.from({ length: num }).map(() =>
    generateRandomProduct()
  );
  // return product;
  writeFileSync("./product.json", JSON.stringify(product));
}

generateProduct(10);

// const temp= generateRandomProduct();
// console.log(temp);
