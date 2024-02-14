import { fakerIT as faker } from "@faker-js/faker";
import fs from "fs";

function generateRaondomProduct() {
  return {
    id: faker.database.mongodbObjectId(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    netPrice: parseFloat(faker.commerce.price({ min: 1, max: 10000 })),
    weight: faker.number.int({ min: 50, max: 20000 }),
    discount: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
  };
}

function generateProducts(num: number) {
  const data = Array.from({ length: num }, () => generateRaondomProduct());
  fs.writeFileSync("./products.json", JSON.stringify(data), {
    encoding: "utf-8",
  });
}
// const tmp = generateRaondomProduct();
// console.log(tmp);
generateProducts(10);
