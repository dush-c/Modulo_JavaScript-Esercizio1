import { parseItem, getTransportFee } from "./cart-utils.js";
import { createElementFromTemplate } from "./utils.js";

export class Summary {
    element;
    items;
    vat;

    constructor() {
        this.element = this.create();
    }

    setItems(item) {
        this.items = item;
        this.update();
    }

    setVat(vat) {
        this.vat = vat;
        this.update();
    }

    create() {
        let template = `
        <div>
            <div class="d-flex justify-content-between">
                <span>Net Total:</span>
                <span class="net-total"></span>
            </div>

            <div class="d-flex justify-content-between">
                <span>VAT:</span>
                <span class="vat-total"></span>
            </div>
            <div class="d-flex justify-content-between">
                <span>Transport:</span>
                <span class="transport-fee"></span>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
                <span>Total:</span>
                <span class="total"></span>
            </div>
        </div>
    `;
        return createElementFromTemplate(template);
    }

    update() {
        const summaryContainer = document.querySelector('.order-summary');

        const calculatedItem = this.items.map(item => parseItem(item, this.vat));

        const netTotal = calculatedItem.reduce((total, item) => {
            return total + item.discountedPrice
        }, 0);

        const vatTotal = calculatedItem.reduce((total, item) => {
            return total + item.vatAmount;
        }, 0);

        const total = calculatedItem.reduce((total, item) => {
            return total + item.price;
        }, 0);

        const weight = calculatedItem.reduce((total, item) => {
            return total + item.weight;
        }, 0);

        const transportFee = getTransportFee(weight);

        this.element.querySelector('.net-total').innerHTML = `${netTotal}€`;
        this.element.querySelector('.vat-total').innerHTML = `${vatTotal}€`;
        this.element.querySelector('.transport-fee').innerHTML = `${transportFee}€`;
        this.element.querySelector('.total').innerHTML = `${total}€`;
    }
}