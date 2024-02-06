// // /* console.log("hello world!");
// // console.info("info!");
// // console.warn("warning!");
// // console.error("error!");
// //  */

// // // var var1 = "ciao";
// // // console.log(var1);
// // let var2 = "ciao2"; 
// // console.log(var2);

// // const var3 = "ciao3";// la variabile non può essere modificata
// // console.log(var3);

// // var2 = "ciao mondo";
// // console.log(var2);

// // let primaVariabile = 5; //'lower camel case' ogni parola contenuta nel nome della variabile (dopo la prima) deve avere la sua iniziale maiuscola

// // let myVariable = 1;
// // myVariable = "ciao stronzi";
// // myVariable = `ciao`; //questa definizione aggiunge delle funzionalità
// // myVariable = true; 
// // myVariable = null;
// // myVariable = undefined; //valore di default quando creo ma non assegno una variabile
// // /* JS è un linguaggio non tipizzato */

// // let objVar = {
// //     //questo è un oggetto vuoto
// //     property1: 5,
// //     property2: "ciao",
// //     property3: {
// //         sub1: 1,
// //         sub2: "hello"
// //     }
// // };

// // console.log(objVar);
// // console.log(objVar.property1);
// // console.log(objVar['property2']);
// // // console.log(objVar.property3.sub2);

// // let tmp = objVar.property4;
// // console.log(tmp);

// // let myArr = [1,2,'3',4,5,'ciao',7,objVar,null];
// // myArr.push(3);
// // console.log(myArr.length);

// // const myDate = new Date();
// // console.log(myDate.getTime())

// // const a = "ciao";
// // const b = "mondo";
// // const d = `${a} ${b}`; //${} serve per stampare la variabile 
// // console.log(d);

// let greet  = function(name){
//     // console.log(arguments); //contiene l'insieme di tutti gli argomenti che vengono passati alla funzione, anche se non vengono utilizzati
//     console.log(`Hello ${name}`);
// }

// greet("Giovanni");

// const Arr = [1,2,3,4,5];

// // Arr.forEach((item) => {
// //     console.log(item *2 );
// // });
// const arr2 = Arr.map((item) => item *2 );
// console.log(arr2);

// for (let item of Arr){ //stesso funzionamento di un ForEach
//     console.log(item);
// }