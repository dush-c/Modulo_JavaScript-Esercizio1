import PRODUCT from '../../../product.json'
import { Product } from './product.entity';

export class ProductService{
async find (search?: string){
        let result = PRODUCT; 
        if(search){
            //logica per filtrare
            result = PRODUCT.filter((item) => {
                //return item.name.includes(search as string);//per dirgli di usarla come striga 
                return item.name.toLowerCase().includes(search.toLowerCase());
            }); 
        }
        return result;
}

async getById(id: string): Promise<Product | undefined> {
    return PRODUCT.find((item) => {
		return item.id ===id; 
	} );
}
}


export default new ProductService(); 