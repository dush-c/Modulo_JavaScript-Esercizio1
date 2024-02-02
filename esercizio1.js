let item = {
    name: "nome dell'oggetto",
    netPrice: 10, // prezzo netto
    weight: 250, // peso dell'oggetto in grammi
    discount: 10, // sconto applicato all'oggetto, può essere 0
    quantity: 2 // numero di oggetti di questo tipo
};
const cart = [
	{
		name: 'ssd',
		netPrice: 95,
		weight: 100,
		discount: 5,
		quantity: 2
	},
	{
        name: 'motherboard',
        netPrice: 270,
        weight: 900,
        discount: 0,
        quantity: 1
	},
	{
        name: 'ram',
        netPrice: 120,
        weight: 60,
        discount: 10,
        quantity: 2
	},
	{
        name: 'processor',
        netPrice: 400,
        weight: 130,
        discount: 0,
        quantity: 1
	},
	{
        name: 'power supply',
        netPrice: 130,
        weight: 1400,
        discount: 15,
        quantity: 1
	},
	{
        name: 'cpu cooler',
        netPrice: 170,
        weight: 1000,
        discount: 23,
        quantity:1
	},
	{
        name: 'gpu',
        netPrice: 1600,
        weight: 2500,
        discount: 0,
        quantity: 1
	},
	{
        name: 'case',
        netPrice: 130,
        weight: 3500,
        discount: 30,
        quantity: 1
	}
];

const COUNTRY_CODE = 'IT';
/* 
let sumPrice = 0;
let sumWeight = 0;
let x = 0
for(let item of cart){
    if(DESTINATION === 'IT'){
        x = item.netPrice + (item.netPrice*22/100);//calcola l'iva
        console.log(item.name);
        console.log((x- (x*item.discount/100))* item.quantity);
        sumPrice += ((x- (x*item.discount/100))* item.quantity);
    }else{
        console.log((item.netPrice - (item.netPrice*item.discount/100))* item.quantity);
        sumPrice += ((item.netPrice- (item.netPrice*item.discount/100))* item.quantity);
    }
    sumWeight += item.weight * item.quantity;
}


//se il peso totale dell'ordine supera i 2kg c'è un costo di spedizione di 7€, sopra i 5 di 15€ e sopra i 10 sempre 20€ 
sumWeight = sumWeight/1000;
if(sumWeight >= 2 && sumWeight<5){
    sumPrice += 7;
}else if (sumWeight >= 5 && sumWeight<10){
    sumPrice += 15;
}else if(sumWeight < 2){
    sumPrice += 0;
}else{
    sumPrice += 20;
}


console.log( `total price: ${sumPrice} €`);
console.log(`total weight: ${sumWeight} kg`); //peso in kg

 */
function getVat(countryCode){
    return countryCode === 'IT' ? 0.22 : 0;
}

function getDiscountedPrice(price, discount){
    return price * (100 - discount) / 100;
}

function getVatPrice(price, vat){
    return price * (1 + vat);
}

function getTransportFee(totalWeight){     
    let transportFee = 0;
    if(totalWeight > 2000){
        transportFee = 7;
    }

    if(totalWeight > 5000){
        transportFee = 15;
    }

    if(totalWeight > 10000){
        transportFee = 20;
    }

    return transportFee;
}

function calculateCartItem(item, vat){
    const basePrice = item.netPrice * item.quantity;
    const discountedPrice = getDiscountedPrice(basePrice, item.discount);

    const vatPrice = getVatPrice(discountedPrice, vat);
    return {
        name: item.name,
        quantity: item.quantity,
        totalWeight: item.weight * item.quantity,
        totalPrice: vatPrice
    }
}

function printCartItem(item){
    let toPrint = `${item.name}: ${item.totalPrice}`;
    if(item.quantity>1){
        toPrint = `${item.name}(x${item.quantity}): ${item.totalPrice}`;
    }
    console.log(toPrint);
}

const vat = getVat(COUNTRY_CODE);

const calculatedItems = cart.map((item) => {
    return calculateCartItem(item, vat);
});

calculatedItems.forEach(item => printCartItem(item));
//queste due istruzioni sono equivalenti: 
// calculatedItems.forEach(printCartItem);

let totalPrice = calculatedItems.reduce((prev, current) => {
    return prev + current.totalPrice;
}, 0);

let totalWeight = 0;


let transportFee = getTransportFee(totalWeight);

console.log(`Transport fee: ${transportFee}`);
console.log(`Total total: ${transportFee+ totalPrice}`); 

/* 
for(const item of cart){
    
    const basePrice = item.netPrice * item.quantity;
    const discountedPrice = getDiscountedPrice(basePrice, item.discount);

    const vatPrice = getVatPrice(discountedPrice, vat);


    totalPrice += vatPrice;
    totalWeight += item.weight * item.quantity;
    
    console.log(`${item.name}: ${vatPrice}`);
}
console.log(`Total: ${totalPrice}`);
*/
