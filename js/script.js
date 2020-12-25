import {fetchMyData,postOrder} from './fetch.js'
import {indexFull, catalogFull,catalogOneFull,actionOneFull,oneProductFull,basketFull, insertElementInPlace,
    insertElement,onReady,banerstep,orderFull, moveImg} from './style.js'
const body = document.getElementById('body');
const upMenu = document.getElementsByClassName('upperMenu')[0];
let db1;
let order = [];
let localStr = window.localStorage;
let orderCase=['','','','','','']

onReady(function() {
    document.getElementById('loading').style.display = 'none'
    document.getElementsByClassName('container')[0].style.display = 'block'
    document.getElementsByClassName('footer')[0].style.display = 'flex'
});
class screenCreate{
    constructor(container, db, siteUrl){
        this.container = container;
        this.db = db;
        this.siteUrl = siteUrl;
        this.hashId = -1;
        if (siteUrl.length > 1) {this.hashId = parseInt(siteUrl[1])}
    }
    renderScreen() {
        switch(this.siteUrl[0]){
            case '#catalog':{if(this.hashId !== -1){
                if (this.hashId >= 0 && this.hashId < this.db.category.length)
                    catalogOneFull(this.container, this.db, this.hashId);
                else  window.location.hash = ''
            }
            else catalogFull(this.container, this.db);
                break;
            }
            case '#oneAction':{if (this.hashId >= 0 && this.hashId < this.db.Action.length)
                actionOneFull(this.container, this.db, this.hashId);
            else  window.location.hash = ''
                break;
            }
            case '#oneProductPage':{if (this.hashId >= 0 && this.hashId < this.db.products.length)
                oneProductFull(this.container, this.db, this.hashId);
            else  window.location.hash = ''
                break;
            }
            case '#basketPage':{ basketFull(this.container, this.db, order);refreshCounter();break;}
            case '#createOrder':{ if ((JSON.parse(localStr.getItem("orders"))).length>0)
            {orderFull(this.container); refreshCounter();}
            else {window.location.hash = ''}
                break;}
            default: {window.location.hash = '';indexFull(this.container, this.db);break;}
        }
    }
}
class Order{
    constructor(textArea, orderList){
        this.phoneNumber = textArea[0].value;
        this.mail = textArea[1].value;
        this.name = textArea[2].value;
        this.address = textArea[3].value;
        this.date = textArea[4].value;
        if (textArea[5].value === "готівка" || textArea[5].value === "Готівка") this.variant=1;
        else this.variant=0;
        this.orderList=orderList;
    }
}

let scRender = new screenCreate(null, null,"");

window.addEventListener('click', (event)=>{
    let curentClassName = event.target.className
    if (curentClassName === '' && event.target.tagName === 'IMG')curentClassName='IMG';
    let loc=window.location.hash;
    switch (curentClassName){
        case 'oneOpt':{ window.location.hash = '#catalog/'+event.target.id; break;}
        case 'shopCounter':{ if (loc !== '#basketPage' && event.target.id !== '') window.location.hash = '#basketPage';  break;}
        case 'shopBasket':{ if (loc !== '#basketPage' && event.target.id !== '') window.location.hash = '#basketPage';  break;}
        case 'productName':{ window.location.hash = '#oneProductPage/' + event.target.id; break;}
        case 'action':{ window.location.hash ='#oneAction/' + event.target.id; break;}
        case 'IMG':{  window.location.hash ='#oneProductPage/' + event.target.id; break;}
        case 'order':{addToOrder(event.target);break;}
        case 'unorder':{deleteFromOrder(event.target);break;}
        case 'orderBtn':{if(order.length>0)window.location.hash ='#createOrder';break;}
        case 'productImg':{moveImg(event.target.parentElement);break;}
        case 'PutOrder':{pushOrder();break;}
        default: {break;}
    }
})

function retouchText(target, text, textArea) {
    let i=parseInt(target.id);
    if(textArea[i].value === "" || textArea[i].value === undefined){
        textArea[i].value=text;}
}

function validation(textArea){
    let isValid=true;
    let phoneNumber=/^\+380\d{9}$/;
    let mail=/^[^@.]{1,}@[^@.]{1,}.[^@.]{1,}$/;
    let address=/^Київ, вул.\W{1,}/
    let name=/^\W{1,}$/;
    let date=/^\d{2}.\d{2}.\d{4}$/;
    let variant=["готівка","Готівка","Карта","карта"];
    if (!phoneNumber.test(textArea[0].value))
    {
        alert("Некоректно введений номер телефону");
        isValid = false;textArea[0].style.color = "red";
    }
    if (!mail.test(textArea[1].value) && textArea[1].value !== '')
    {
        alert("Некоректно введений email");
        isValid = false;
        textArea[1].style.color = "red";
    }
    if (!name.test(textArea[2].value) && textArea[2].value !== '')
    {
        alert("Некоректно введене ім'я");
        isValid = false;
        textArea[2].style.color = "red";
    }
    if (!address.test(textArea[3].value)){
        alert("Некоректно введена адреса");
        isValid = false;
        textArea[3].style.color = "red";
    }
    if (!variant.includes(textArea[5].value))
    {
        alert("Оплата неможлива");
        isValid = false;
        textArea[5].style.color = "red"
    }
    for(let q=0;q<textArea.length;q++) {
        textArea[q].oninput = function () {
            textArea[q].style.color = "#000000";
        }
        if(textArea[q].value === '')
        {
            textArea[q].style.color = "#000000";
        }
    }
    return isValid;
}

async function pushOrder() {
    let textArea = document.getElementsByClassName("functionInput");
    let isValid = validation(textArea);
    let baner = document.getElementById("resultBaner");
    if (isValid){
        let oneOrder = new Order(textArea, order)
        let yourOrder = await postOrder(oneOrder)
        console.log(yourOrder)
        baner.innerHTML = "Прийнято!";
        localStr.setItem("orders", JSON.stringify([]))
        order=[];
        refreshCounter();
    }
    else{baner.innerHTML = "Помилка замовлення"}
    baner.style.display = 'block'
    baner.style.top = 'calc(50vh - 10vh + '+ window.scrollY +'px)'
    window.requestAnimationFrame(banerstep);
    setTimeout(function del3(){ baner.style.display='none'; baner.innerHTML="Товар додано в корзину"}, 1000);
}

window.onmouseover = function (event) {
    let curentClassName = event.target.className;
    let textArea = document.getElementsByClassName('functionInput');
    if (window.location.hash !== '#createOrder' || curentClassName !== 'functionName'){return;}
    let value = event.target.innerHTML;
    switch (value){
        case 'Hомер Телефону *':{retouchText(event.target, orderCase[0], textArea);break;}
        case 'Емейл':{retouchText(event.target, orderCase[1], textArea);break;}
        case 'ПІБ':{retouchText(event.target, orderCase[2], textArea);break;}
        case 'Адреса *':{retouchText(event.target, orderCase[3], textArea);break;}
        case 'Дата доставки *':{retouchText(event.target, orderCase[4], textArea);break;}
        case 'Варіант оплати':{retouchText(event.target, orderCase[5], textArea);break;}
        case 'Варіант оплати':{retouchText(event.target, orderCase[5], textArea);break;}
        default: {break;}
    }
}

window.addEventListener('mouseout', (event)=>{
    let curentClassName = event.target.className;
    let textArea = document.getElementsByClassName('functionInput');
    if (window.location.hash !== '#createOrder' || curentClassName !== 'functionName'){return;}
    let i=parseInt(event.target.id);
    if ((textArea[i].value === orderCase[i])){
        textArea[i].value='';
    }
})

function addToOrder(target){
    let id = target.parentElement.firstChild.id;
    let baner = document.getElementById("resultBaner");
    for (let i=0; i<order.length; i+=2){
        if (order[i] === id){
            order[i+1]++;
            if (target.parentElement.childNodes[1].className === 'counterOrdered')
                target.parentElement.childNodes[1].innerHTML=order[i+1];
            localStr.setItem("orders", JSON.stringify(order));
            baner.style.display = 'block'
            baner.style.top = 'calc(50vh - 10vh + ' + window.scrollY + 'px)'
            window.requestAnimationFrame(banerstep);
            setTimeout(function del2(){baner.style.display = 'none'}, 1000);
            refreshCounter();
            return;
        }
    }
    order.push(id);
    order.push(1);
    baner.style.display = 'block'
    baner.style.top = 'calc(50vh - 10vh + ' + window.scrollY + 'px)'
    window.requestAnimationFrame(banerstep);
    setTimeout(function del2(){baner.style.display='none'}, 1000);
    localStr.setItem("orders", JSON.stringify( order));
    if (window.location.hash === '#basketPage')
        basketFull(scRender.container, scRender.db, order);
    refreshCounter();
}

function deleteFromOrder(target){
    let id = target.parentElement.firstChild.id;
    for (let i = 0; i < order.length; i += 2){
        if (order[i] === id){
            order[i + 1]--;
            if (order[i + 1] < 1){
                order.splice(i + 1, 1)
                order.splice(i, 1);
                let parent=target.parentElement;
                parent.animate([
                    {opacity: '100%'},
                    {opacity: '0%'}
                ],{duration: 1000,iterations: 1})
                localStr.setItem("orders", JSON.stringify( order));
                refreshCounter();
                setTimeout(function del(){parent.remove();}, 980, parent);
                return;
            }
            else {
                target.parentElement.childNodes[1].innerHTML = order[i+1];
                localStr.setItem("orders", JSON.stringify( order));
                refreshCounter();
            }
        }
    }
}

function refreshCounter(){
    let counterProduct = document.getElementById("shopCounter");
    let shopBasket = document.getElementsByClassName("shopBasket");
    if (shopBasket.length > 1){shopBasket = shopBasket[1].firstChild}
    let counter = 0, price = 0;
    for (let q = 0; q < order.length; q += 2){
        counter += order[q+1];
        price+=findPrice(order[q])*order[q+1];
    }
    counterProduct.innerHTML=counter;
};

function findPrice(id){
    for(let q = 0; q < scRender.db.products.length; q++){
        if (id === scRender.db.products[q].id){
            return scRender.db.products[q].price;
        }
    }
    return 0;
}

window.onload = async function (){
    try{
        db1 = await fetchMyData()}
    catch (error) {
        alert('помилка сервера: '+ error + ". Спробуйте пізніше");
    }
    if (localStr.length === 0)
    {
        localStr.setItem("orders",  JSON.stringify(order))
    }
    else {
        let orderTmp=localStr.getItem("orders");
        order=JSON.parse(orderTmp);
    }

    let screen = document.getElementsByClassName('container');
    if (screen.length > 0) screen[0].remove();
    let container = insertElementInPlace('div', 'container', upMenu, 'afterend');
    document.getElementsByClassName('container')[0].style.display='none';
    scRender = new screenCreate(container, db1, window.location.hash.split("/"));
    let catOpt = document.getElementsByClassName("catOpt")[0];
    for(let w = 0;w < scRender.db.category.length; w++){
        let textDiv = insertElement('div', 'oneOpt', catOpt);
        textDiv.innerHTML = scRender.db.category[w].name;
        textDiv.id = scRender.db.category[w].id;
    }
    refreshCounter();
    scRender.renderScreen();
}

window.onhashchange = function (){location.reload()}