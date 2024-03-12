import { getTransportFee, parseItem } from './cart-utils.js';
import { cart } from './cart.js';
import { Summary } from './summary.js';
import { createElementFromTemplate } from "./utils.js";

const vat = 0.22;
const template = `<li class="list-group-item item">
<div class="d-flex flex-row d-flex justify-content-between align-items-center">
    <div class="item-name">

    </div>

    <div class="d-flex flex-row align-items-center justify-content-end flex-wrap">
        <span class="ms-2 d-flex flex-row align-items-center">
            <label class="me-1" for="quantity">qty:</label>
            <input class="form-control item-quantity" value="0" type="number" style="width: 70px">
        </span>
        <span class="ms-2">
            <span class="item-price"></span>
            <span class="item-discount"></span>
        </span>
    </div>
</div>
</li>`;
function createCartItem(item, vat) {

    const calculatedItem = parseItem(item, vat);
    const summaryContainer = document.querySelector('.order-summary');


    const summary = new Summary();
    summary.setItems(cart);
    summary.setVat(vat);
    summaryContainer.appendChild(summary.element);

    const element = createElementFromTemplate(template);

    element.querySelector('.item-quantity').addEventListener('change', event => {
        const value = event.target.value;
        item.quantity = value;
        // updateSummary(cart, vat);
    });


    return element;

}


window.onload = function () {
    const listContainer = document.getElementById('items-list');

    for (let item of cart) {

        const element = createCartItem(item, vat);
        // console.log(element);
        listContainer.appendChild(element);
        // updateSummary(cart, vat);
    }

}
//evento che viene caricato nel momento in cui la pagina viene caricata

