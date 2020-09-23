//Div del Html
var burgersM = document.getElementById("bugerMenu");
var tacosM = document.getElementById("tacoMenu");
var saladsM = document.getElementById("saladMenu");
var dessertsM = document.getElementById("dessertMenu");
var drinksM = document.getElementById("drinkMenu");
var orderD = document.getElementById("orderDetail");

//Var contienen los datos
var burgerItems;
var tacoItems;
var saladItems;
var dessertItems;
var drinkItems;
//cart headers
var arrHead = new Array();
arrHead = ["Item", "Qty.", "Description", "Unit Price", "Amount"];
var empTable = document.createElement("table");
empTable.setAttribute("id", "empTable");
//otras var
var totDinero = 0;

fetch(
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
)
  .then((response) => response.json())
  .then((data) => {
    burgerItems = data[0].products;
    tacoItems = data[1].products;
    saladItems = data[2].products;
    dessertItems = data[3].products;
    drinkItems = data[4].products;

    createTable();
    poblarMenu(burgerItems, "burger");
    poblarMenu(tacoItems, "taco");
    poblarMenu(saladItems, "salad");
    poblarMenu(dessertItems, "dessert");
    poblarMenu(drinkItems, "drink");

    mostrarBugers();
  });

function poblarMenu(pItems, pTipo) {
  for (var i = 0; i < pItems.length; i++) {
    //card parts
    var eleDiv = document.createElement("div");
    var tempCard = document.createElement("div");
    var imgCard = document.createElement("img");
    var divBody = document.createElement("div");
    var h4Title = document.createElement("h4");
    var pContent = document.createElement("p");
    var pPrice = document.createElement("p");
    var btnAdd = document.createElement("button");
    //setting atributes

    eleDiv.setAttribute("class", " cardHolder col-12 col-md-6 col-lg-3");

    tempCard.setAttribute("class", "card");

    imgCard.setAttribute("class", "card-img-top");
    imgCard.setAttribute("src", pItems[i].image);
    imgCard.setAttribute("alt", "card image");

    divBody.setAttribute("class", "card-body");

    h4Title.setAttribute("class", "card-title");
    h4Title.innerHTML = pItems[i].name;

    pContent.setAttribute("class", "card-text");
    pContent.innerHTML = pItems[i].description;

    pPrice.setAttribute("class", "card-text card-Price");
    pPrice.innerHTML = "$" + pItems[i].price;

    btnAdd.setAttribute("class", "card-btn");

    var varTem = pItems[i].name;
    var varTem2 = pItems[i].price;
    var txt = "agregarCarrito(" + '"' + varTem + '",' + varTem2 + ")";

    btnAdd.setAttribute("onclick", txt);
    btnAdd.innerHTML = "Add to car";

    //Append items
    divBody.appendChild(h4Title);
    divBody.appendChild(pContent);
    divBody.appendChild(pPrice);
    divBody.appendChild(btnAdd);

    tempCard.appendChild(imgCard);
    tempCard.appendChild(divBody);

    eleDiv.appendChild(tempCard);

    if (pTipo == "burger") {
      var div = document.getElementById("burgerMenuItems");
    } else if (pTipo == "taco") {
      var div = document.getElementById("tacoMenuItems");
    } else if (pTipo == "salad") {
      var div = document.getElementById("saladMenuItems");
    } else if (pTipo == "dessert") {
      var div = document.getElementById("dessertMenuItems");
    } else if (pTipo == "drink") {
      var div = document.getElementById("drinkMenuItems");
    }
    div.appendChild(eleDiv);
  }
}

function createTable() {
  var tr = empTable.insertRow(-1);

  for (var h = 0; h < arrHead.length; h++) {
    var th = document.createElement("th"); // the header object.
    th.innerHTML = arrHead[h];
    tr.appendChild(th);
  }

  var div = document.getElementById("orderTable");
  div.appendChild(empTable); // add table to a container.
}

function agregarCarrito(pName, pPrice) {
  //carrito
  var countCarrito = document.getElementById("cartCounter").innerHTML;
  document.getElementById("cartCounter").innerHTML = Number(countCarrito) + 1;
  //console.log(countCarrito);

  totDinero = totDinero + pPrice;
  // console.log(totDinero);

  var rowCnt = empTable.rows.length;
  var agregada = false;

  //test
  tr = empTable.getElementsByTagName("tr");
  for (i = 0; i < tr.length && !agregada; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      var txtValue = td.textContent || td.innerText;
      if (pName == txtValue) {
        var qtyTemp = tr[i].getElementsByTagName("td")[1].innerHTML;
        var untPrcTemp = tr[i].getElementsByTagName("td")[3].innerHTML;
        tr[i].getElementsByTagName("td")[1].innerHTML = Number(qtyTemp) + 1;
        var multi = Number(qtyTemp) * Number(untPrcTemp);
        tr[i].getElementsByTagName("td")[4].innerHTML = multi;

        var multi = Number(qtyTemp) * Number(untPrcTemp);
        agregada = true;
      }
    }
  }

  //endstest

  if (!agregada) {
    var tr1 = empTable.insertRow(rowCnt); // table row.
    //tr1 = empTable.insertRow(rowCnt);

    for (var j = 0; j < arrHead.length; j++) {
      var td = document.createElement("td"); // TABLE DEFINITION.
      td = tr1.insertCell(j);

      if (j == 0) {
        var ele = document.createTextNode(rowCnt);
        td.appendChild(ele);
      } else if (j == 1) {
        var ele = document.createTextNode("1");

        td.appendChild(ele);
      } else if (j == 2) {
        var ele = document.createTextNode(pName);

        td.appendChild(ele);
      } else if (j == 3) {
        var ele = document.createTextNode(pPrice);

        td.appendChild(ele);
      } else if (j == 4) {
        var ele = document.createTextNode(pPrice);

        td.appendChild(ele);
      }
    }
  }

  //for (var i = 0; i < rowCnt; i++) {}
}

function confirmOrder() {
  var listaFinal = Array();
  tr = empTable.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    td0 = tr[i].getElementsByTagName("td")[0].innerHTML;
    td1 = tr[i].getElementsByTagName("td")[1].innerHTML;
    td2 = tr[i].getElementsByTagName("td")[2].innerHTML;
    td3 = tr[i].getElementsByTagName("td")[3].innerHTML;
    td4 = tr[i].getElementsByTagName("td")[4].innerHTML;
    var ele = {
      Item: td0,
      Qty: td1,
      Description: td2,
      "Unite Price": td3,
      Amount: td4,
    };
    listaFinal.push(ele);
  }
  console.log(listaFinal);
}
function cancelarOrden() {
  var Parent = document.getElementById("empTable");
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  totDinero = 0;
  countCarrito = 0;
  createTable();
}

function mostrarBugers() {
  burgersM.style.display = "block";
  tacosM.style.display = "none";
  saladsM.style.display = "none";
  dessertsM.style.display = "none";
  drinksM.style.display = "none";
  orderD.style.display = "none";
}
function mostrarTacos() {
  burgersM.style.display = "none";
  tacosM.style.display = "block";
  saladsM.style.display = "none";
  dessertsM.style.display = "none";
  drinksM.style.display = "none";
  orderD.style.display = "none";
}
function mostrarSalads() {
  burgersM.style.display = "none";
  tacosM.style.display = "none";
  saladsM.style.display = "block";
  dessertsM.style.display = "none";
  drinksM.style.display = "none";
  orderD.style.display = "none";
}
function mostrarDesserts() {
  burgersM.style.display = "none";
  tacosM.style.display = "none";
  saladsM.style.display = "none";
  dessertsM.style.display = "block";
  drinksM.style.display = "none";
  orderD.style.display = "none";
}
function mostrarDrinks() {
  burgersM.style.display = "none";
  tacosM.style.display = "none";
  saladsM.style.display = "none";
  dessertsM.style.display = "none";
  drinksM.style.display = "block";
  orderD.style.display = "none";
}
function mostrarOrderD() {
  burgersM.style.display = "none";
  tacosM.style.display = "none";
  saladsM.style.display = "none";
  dessertsM.style.display = "none";
  drinksM.style.display = "none";
  orderD.style.display = "block";
  document.getElementById("totalCount").innerHTML = "Total: $" + totDinero;
}
