// import { books } from "./books.js";

const books = [
    {
        _id: "60a0c4a27fe876001755c0b1",
        title: "The Enigmatic Echo",
        netPrice: 29.99,
        totalPages: 320,
        description: "A mysterious journey through time and space that challenges the boundaries of reality."
    },
    {
        _id: "60a0c4a27fe876001755c0b2",
        title: "Whispers of the Abyss",
        netPrice: 24.50,
        totalPages: 280,
        description: "An ancient prophecy unfolds as dark forces threaten to plunge the world into eternal darkness."
    },
    {
        _id: "60a0c4a27fe876001755c0b3",
        title: "Ephemeral Dreams",
        netPrice: 19.99,
        totalPages: 240,
        description: "A collection of short stories that explore the fleeting nature of dreams and desires."
    }
];

/* 
voglio che al caricamento della mia pagina, vengano caricati tutti i libri presenti in libreria
*/
const tableTemplate = `
    <tr class="content-row">
        <td class="book-title content">Book 1</td>
        <td class="book-price content">19.99</td>
        <td class="book-description content">A thrilling adventure</td>
        <td class="book-total content">300</td>
    </tr>
`;
const classList = ['book-title', 'book-price', 'book-description', 'book-total'];
function createElementFromTemplate(template) {

    const tmpElement = document.createElement('td');
    tmpElement.innerHTML = template.trim();

    return tmpElement.firstChild;
}

function loadClassOnTd(node, index) {

    node.classList.add(classList[index], 'content');

    return node;
}

function createTrElement(item) {
    const newTr = document.createElement('tr');
    //dovrebbe chiamare un tot numero di volte la funzione 'createTdElement'
    for (let i = 0; i < classList.length; i++) {
        let newTdElement = createTdElement(i, item);
        newTr.appendChild(newTdElement);
    }
    return newTr;
}

function createTdElement(index, item) {
    let newTd = document.createElement('td');
    newTd = loadClassOnTd(newTd, index);
    switch (index) {
        case 0:
            newTd.innerHTML = item.title;
            break;
        case 1:
            newTd.innerHTML = item.netPrice;
            break;
        case 2:
            newTd.innerHTML = item.description;
            break;
        case 3:
            newTd.innerHTML = item.totalPages;
            break;
    }
    return newTd;
}

window.onload = function () {
    const table = document.getElementById('stored-books');
    // console.log(table);
    // console.log(books);
    // console.log(table);

    for (let item of books) {
        const newTr = createTrElement(item);
        table.appendChild(newTr);
        // table.appendChild(newTableRow.trim());
    }
}