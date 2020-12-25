function indexFull(container, db){
    let actionSlide = insertElement('div', 'actionSlide', container);
    let allAction = insertElement('div', 'allAction', actionSlide);
    for (let i=0; i<db.Action.length; i++){
        let oneAction = insertElement('div', 'oneAction', allAction);
        insertImg('img', 'actImg', db.Action[i].image,oneAction);
        let acBtn = insertElementDetails('input', 'action', 'button', oneAction)
        acBtn.value = 'Детальніше';
        acBtn.id=db.Action[i].id;
    }
    let whatAction = insertElement('div', 'whatAction', actionSlide);
    whatAction.style.gridTemplateColumns=' 7fr repeat('+db.Action.length+',1fr) 7fr';
    insertElement('div', '', whatAction);
    for (let q=0; q<db.Action.length; q++){
        insertElement('div', 'number', whatAction);
    }
    insertElement('div', '', whatAction);
    let categoryHit=insertElement('h1', 'categoryHit', container);
    categoryHit.innerHTML="Гаряча пропозиція";
    let recomendHit=insertElement('div', 'recomendHit', container);
    for (let q=0; q<db.products.length; q++){
        if (db.products[q].isHit){
            let oneProduct=insertElement('div', 'oneProduct', recomendHit);
            insertImg('img','', db.products[q].img,oneProduct).id=db.products[q].id;
            let textDiv=insertElement('div', '', oneProduct);
            let productName = insertElement('p', 'productName', textDiv)
            productName.innerHTML=db.products[q].productName;
            productName.id=db.products[q].id;
            insertElement('p', 'productComponents', textDiv).innerHTML=db.products[q].components;
            insertElement('p', 'price', textDiv).innerHTML=db.products[q].price+' грн';
            let acBtn = insertElementDetails('input', 'order', 'button', oneProduct)
            acBtn.value = 'До корзини';
        }
    }
    setInterval(() => {
        moveImg(allAction);
    }, 5000);
}

function catalogFull(container, db){
    let catalog = insertElement('div', 'catalog', container);
    for (let i=0; i<db.category.length; i++){
        let ctegoryName = insertElement('h2', 'ctegoryName', catalog);
        ctegoryName.innerHTML=db.category[i].name;
        let productList = insertElement('div', 'productList', catalog);
        for (let q=0; q<db.products.length; q++){
            if (db.products[q].categoryId === db.category[i].id){
                let oneProduct=insertElement('div', 'oneProduct', productList);
                insertImg('img','', db.products[q].img,oneProduct).id=db.products[q].id;
                let textDiv=insertElement('div', '', oneProduct);
                let productName=insertElement('p', 'productName', textDiv)
                productName.innerHTML=db.products[q].productName;
                productName.id=db.products[q].id;
                insertElement('p', 'productComponents', textDiv).innerHTML=db.products[q].components;
                insertElement('p', 'price', textDiv).innerHTML=db.products[q].price+' грн';
                let acBtn = insertElementDetails('input', 'order', 'button', oneProduct)
                acBtn.value = 'До корзини';
            }
        }
        if (productList.childNodes.length === 0){
            ctegoryName.remove();
            productList.remove();
        }
    }
}

function catalogOneFull(container, db, hashId){
    let catalog = insertElement('div', 'catalog', container);
    let ctegoryName = insertElement('h2', 'ctegoryName', catalog);
    ctegoryName.innerHTML=db.category[hashId].name;
    let productList = insertElement('div', 'productList', catalog);
    for (let q=0; q<db.products.length; q++){
        if (db.products[q].categoryId === db.category[hashId].id){
            let oneProduct=insertElement('div', 'oneProduct', productList);
            insertImg('img','', db.products[q].img,oneProduct).id=db.products[q].id;
            let textDiv=insertElement('div', '', oneProduct);
            let productName=insertElement('p', 'productName', textDiv)
            productName.innerHTML=db.products[q].productName;
            productName.id=db.products[q].id;
            insertElement('p', 'productComponents', textDiv).innerHTML=db.products[q].components;
            insertElement('p', 'price', textDiv).innerHTML=db.products[q].price+' грн';
            let acBtn = insertElementDetails('input', 'order', 'button', oneProduct)
            acBtn.value = 'До корзини';
        }
    }
    if (productList.childNodes.length === 0){
        ctegoryName.remove();
        productList.remove();
    }
}

function actionOneFull(container, db, hashId){
    let aboutAct = insertElement('div', 'aboutAct', container);
    insertElement('p', 'oneActionName', aboutAct).innerHTML=db.Action[hashId].name;
    insertElement('p', 'actionTime', aboutAct).innerHTML='Опубліковано: '+db.Action[hashId].datePosted;
    insertImg('img', 'oneACtionImg', db.Action[hashId].image,aboutAct);
    insertElement('p', 'oneActionDescription', aboutAct).innerHTML=db.Action[hashId].about;
}

function oneProductFull(container, db, hashId){
    let aboutProduct = insertElement('div', 'aboutProduct', container);
    let allProdImg = insertElement('div', 'allProdImg', aboutProduct);
    insertImg('img', 'productImg', db.products[hashId].img,allProdImg).id=db.products[hashId].id;
    insertElement('p', 'oneProductName', aboutProduct).innerHTML=db.products[hashId].productName;
    let onePrice = insertElement('p', 'price', aboutProduct);
    onePrice.innerHTML='ціна: '+db.products[hashId].price+' грн';
    onePrice.style.fontSize='2.5vw';
    onePrice.style.color='white';
    onePrice.style.top = '30vh';
    onePrice.style.left = '-2.5vw';
    let acBtn = insertElementDetails('input', 'order', 'button', allProdImg)
    acBtn.value = 'До корзини';
    acBtn.style.top='28vw';
    acBtn.style.left='40vw';
    acBtn.style.backgroundColor='indianred';
    insertElement('p', 'oneProductDescription', aboutProduct).innerHTML=db.products[hashId].components;

    let conectedAll = insertElement('div', 'conectedAll', container);
    insertElement('h2', 'conected', conectedAll).innerHTML="Пов'язані продукти";
    let myProduct=db.products[hashId];
    let productList = insertElement('div', 'productList', conectedAll);
    for (let i=0; i<myProduct.similar.length; i++){
        let prodId=myProduct.similar[i];
        let conectProd = db.products[prodId];
        let oneProduct=insertElement('div', 'oneProduct', productList);
        insertImg('img','', conectProd.img,oneProduct).id=conectProd.id;
        let textDiv=insertElement('div', '', oneProduct);
        let productName=insertElement('p', 'productName', textDiv);
        productName.innerHTML=conectProd.productName;
        productName.id=conectProd.id;
        insertElement('p', 'productComponents', textDiv).innerHTML=conectProd.components;
        insertElement('p', 'price', textDiv).innerHTML=conectProd.price+' грн';
        let acBtn = insertElementDetails('input', 'order', 'button', oneProduct)
        acBtn.value = 'До корзини';
    }
}

let start = null;
function banerstep(currentTime) {
    if (!start) start = currentTime;
    var process = currentTime-start;
    let element = document.getElementById('resultBaner');
    if(process > 500){element.style.opacity = (100 - (process-500)/5)+'%';}
    else{element.style.opacity = ((process)/5)+'%';}
    if (process < 1000) {
        window.requestAnimationFrame(banerstep);
    }
    else{start=null;}
}

function moveImg(parent) {
    let startScroll=parent.scrollLeft;
    let infinitystart=null;
    let infinityend=null;
    let firstmove=true;
    function sliderUp(currentTime) {
        if (!infinitystart) infinitystart = currentTime;
        let process = currentTime-infinitystart;
        let tmpscroll = parent.scrollLeft;
        if(process>1000){process=1000}
        parent.scrollLeft = startScroll + parent.offsetWidth*(process/1000);
        if(parent.scrollLeft === tmpscroll && !firstmove)
        {
            window.requestAnimationFrame(sliderDown);
        }
        else if (process < 1000) {
            firstmove = false;
            window.requestAnimationFrame(sliderUp);
        }
    }
    function sliderDown(currentTime) {
        if (!infinityend) infinityend = currentTime;
        let process = currentTime - infinityend;
        if(process > 1000){process = 1000}
        parent.scrollLeft = startScroll*(1-process/1000);
        if (process < 1000) {
            window.requestAnimationFrame(sliderDown);
        }
    }
    repaintDot(parent);
    window.requestAnimationFrame(sliderUp);
}

function repaintDot(parent) {
    let dots = document.getElementsByClassName('number');
    if(dots.length < 1){return;}
    let number = Math.round(parent.scrollLeft/parent.offsetWidth);
    if(number < dots.length - 1){
        for(let q = 0; q < dots.length;q++)
            dots[q].style.backgroundColor = "white";
        dots[number + 1].style.backgroundColor = "white";
    }
    if(number === dots.length - 1){
        for(let q = 0; q < dots.length; q++)
            dots[q].style.backgroundColor = "darkgray";
        dots[0].style.backgroundColor = "gray";
    }
}

function orderFull(container){
    let option = ["Hомер телефону *", "Email", "ПІБ", "Адреса *", "Час доставки *", "Варіант оплати"];
    let area = insertElement('div', 'area', container);
    for (let i = 0; i < option.length; i++){
        let functionName = insertElement('p', 'functionName', area)
        functionName.innerHTML = option[i];
        functionName.id = i + 'name';
        insertElement('textarea', 'functionInput', area).id = i + 'text';
    }
    let shopBasket = insertElement('div', 'shopBasket', container);
    let PutOrder = insertElementDetails('input', 'PutOrder', 'button', container)
    PutOrder.value = "Оформити замовлення";
}

function basketFull(container, db, order){
    insertElement('div', 'orderBtn', container).innerHTML = 'Замовити';
    let bayAll = insertElement('div', 'bayAll', container);
    insertElement('h2', 'conected', bayAll).innerHTML = 'Кошик';
    let shopBasket = insertElement('div', 'shopBasket', bayAll);
    let productList = insertElement('div', 'productList', bayAll);
    for (let i = 0; i < order.length; i += 2){
        let myProd = db.products[order[i]];
        let oneProduct = insertElement('div', 'oneProduct', productList);
        oneProduct.style.height = '300px';
        insertImg('img','', myProd.img,oneProduct).id=myProd.id;
        insertElement('p', 'counterOrdered', oneProduct).innerHTML=order[i+1];
        let textDiv = insertElement('div', '', oneProduct);
        let productName = insertElement('p', 'productName', textDiv)
        productName.innerHTML = myProd.productName;
        productName.id = myProd.id;
        insertElement('p', 'productComponents', textDiv).innerHTML = myProd.components;
        insertElement('p', 'price', textDiv).innerHTML = myProd.price+' грн';
        let acBtn = insertElementDetails('input', 'order', 'button', oneProduct)
        acBtn.value = 'Додати ще одиницю';
        acBtn.style.fontSize = '2.3vh';
        acBtn.style.top = '57vh';
        acBtn.style.left = '5.4vw';
        let delBtn = insertElementDetails('input', 'unorder', 'button', oneProduct)
        delBtn.value = 'Вилучити одиницю';
        delBtn.style.fontSize = '2.3vh';
        delBtn.style.left = '11.5vh';
        delBtn.style.top = '52vh';
    }
}

function insertElement(type, elClassName, parent)
{
    let newEl = document.createElement(type);
    newEl.className = elClassName;
    parent.appendChild(newEl);
    return newEl;
}
function insertElementDetails(type, elClassName, typeOf, parent)
{
    let newEl = document.createElement(type);
    newEl.className = elClassName;
    newEl.type = typeOf;
    parent.appendChild(newEl);
    return newEl;
}
function insertImg(type, elClassName, src, parent)
{
    let newEl = document.createElement(type);
    newEl.className = elClassName;
    newEl.src = src;
    parent.appendChild(newEl);
    return newEl;
}
function insertElementInPlace(type, elClassName, parent, place)
{
    let newEl = document.createElement(type);
    newEl.className = elClassName;
    parent.insertAdjacentElement(place, newEl);
    return newEl;
}
function onReady(callback) {
    var intervalId = window.setInterval(function() {
        if (document.getElementsByClassName('container')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 800);
}
export{indexFull, catalogFull, catalogOneFull, actionOneFull, oneProductFull, basketFull, insertElementInPlace,
    insertImg, insertElementDetails, insertElement, onReady, banerstep, orderFull, moveImg};