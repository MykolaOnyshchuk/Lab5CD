function indexFull(container, db){
    let actionSlide = incertElement('div', 'actionSlide', container);
    let allAction = incertElement('div', 'allAction', actionSlide);
    for (let i=0; i<db.Action.length; i++){
        let oneAction = incertElement('div', 'oneAction', allAction);
        incertImg('img', 'actImg', db.Action[i].image,oneAction);
        let acBtn = incertElementDetails('input', 'action', 'button', oneAction)
        acBtn.value = 'Детальніше';
        acBtn.id=db.Action[i].id;
    }
    let whatAction = incertElement('div', 'whatAction', actionSlide);
    whatAction.style.gridTemplateColumns=' 7fr repeat('+db.Action.length+',1fr) 7fr';
    incertElement('div', '', whatAction);
    for (let q=0; q<db.Action.length; q++){
        incertElement('div', 'number', whatAction);
    }
    incertElement('div', '', whatAction);
    let categoryHit=incertElement('h1', 'categoryHit', container);
    categoryHit.innerHTML="Хіти продажу";
    let recomendHit=incertElement('div', 'recomendHit', container);
    for (let q=0; q<db.products.length; q++){
        if (db.products[q].isHit){
            let oneProduct=incertElement('div', 'oneProduct', recomendHit);
            incertImg('img','', db.products[q].images[0],oneProduct).id=db.products[q].id;
            let textDiv=incertElement('div', '', oneProduct);
            let productName = incertElement('p', 'productName', textDiv)
            productName.innerHTML=db.products[q].productName;
            productName.id=db.products[q].id;
            incertElement('p', 'productComponents', textDiv).innerHTML=db.products[q].productComponents;
            incertElement('p', 'price', textDiv).innerHTML=db.products[q].price+' грн';
            let acBtn = incertElementDetails('input', 'order', 'button', oneProduct)
            acBtn.value = 'До корзини';
        }
    }
    setInterval(() => {
        moveImg(allAction);
    }, 5000);
}

function catalogFull(container, db){
    let catalog = incertElement('div', 'catalog', container);
    for (let i=0; i<db.category.length; i++){
        let ctegoryName = incertElement('h2', 'ctegoryName', catalog);
        ctegoryName.innerHTML=db.category[i].name;
        let productList = incertElement('div', 'productList', catalog);
        for (let q=0; q<db.products.length; q++){
            if (db.products[q].categoryId === db.category[i].id){
                let oneProduct=incertElement('div', 'oneProduct', productList);
                incertImg('img','', db.products[q].images[0],oneProduct).id=db.products[q].id;
                let textDiv=incertElement('div', '', oneProduct);
                let productName=incertElement('p', 'productName', textDiv)
                productName.innerHTML=db.products[q].productName;
                productName.id=db.products[q].id;
                incertElement('p', 'productComponents', textDiv).innerHTML=db.products[q].productComponents;
                incertElement('p', 'price', textDiv).innerHTML=db.products[q].price+' грн';
                let acBtn = incertElementDetails('input', 'order', 'button', oneProduct)
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
    let catalog = incertElement('div', 'catalog', container);
    let ctegoryName = incertElement('h2', 'ctegoryName', catalog);
    ctegoryName.innerHTML=db.category[hashId].name;
    let productList = incertElement('div', 'productList', catalog);
    for (let q=0; q<db.products.length; q++){
        if (db.products[q].categoryId === db.category[hashId].id){
            let oneProduct=incertElement('div', 'oneProduct', productList);
            incertImg('img','', db.products[q].images[0],oneProduct).id=db.products[q].id;
            let textDiv=incertElement('div', '', oneProduct);
            let productName=incertElement('p', 'productName', textDiv)
            productName.innerHTML=db.products[q].productName;
            productName.id=db.products[q].id;
            incertElement('p', 'productComponents', textDiv).innerHTML=db.products[q].productComponents;
            incertElement('p', 'price', textDiv).innerHTML=db.products[q].price+' грн';
            let acBtn = incertElementDetails('input', 'order', 'button', oneProduct)
            acBtn.value = 'До корзини';
        }
    }
    if (productList.childNodes.length === 0){
        ctegoryName.remove();
        productList.remove();
    }
}

function actionOneFull(container, db, hashId){
    let aboutAct = incertElement('div', 'aboutAct', container);
    incertElement('p', 'oneActionName', aboutAct).innerHTML=db.Action[hashId].name;
    incertElement('p', 'actionTime', aboutAct).innerHTML='Діє до: '+db.Action[hashId].actionTime;
    incertImg('img', 'oneACtionImg', db.Action[hashId].image,aboutAct);
    incertElement('p', 'oneActionDescription', aboutAct).innerHTML=db.Action[hashId].about;
}

function oneProductFull(container, db, hashId){
    let aboutProduct = incertElement('div', 'aboutProduct', container);
    let allProdImg = incertElement('div', 'allProdImg', aboutProduct);
    for (let i=0;i<db.products[hashId].images.length; i++){
        incertImg('img', 'productImg', db.products[hashId].images[i],allProdImg).id=db.products[hashId].id;
    }
    //incertElementDetails('input', 'productImgHelp', 'textarea', allProdImg)
    incertElement('p', 'oneProductName', aboutProduct).innerHTML=db.products[hashId].productName;
    let onePrice = incertElement('p', 'price', aboutProduct);
    onePrice.innerHTML='ціна: '+db.products[hashId].price+' грн';
    onePrice.style.fontSize='2.5vmax';
    onePrice.style.color='#72bf9e'
    let acBtn = incertElementDetails('input', 'order', 'button', allProdImg)
    acBtn.value = 'До корзини';
    acBtn.style.top='12vmax';
    acBtn.style.left='33vmax';
    acBtn.style.backgroundColor='#dee3e9';
    incertElement('p', 'oneProductDescription', aboutProduct).innerHTML=db.products[hashId].productComponents;
    incertElement('p', 'oneProductPromo', aboutProduct).innerHTML=db.products[hashId].productDesk;

    let conectedAll = incertElement('div', 'conectedAll', container);
    incertElement('h2', 'conected', conectedAll).innerHTML="Зв'язані продукти";
    let myProduct=db.products[hashId];
    let productList = incertElement('div', 'productList', conectedAll);
    for (let i=0; i<myProduct.conectedProductIds.length; i++){
        let prodId=myProduct.conectedProductIds[i];
        let conectProd = db.products[prodId];
        let oneProduct=incertElement('div', 'oneProduct', productList);
        incertImg('img','', conectProd.images[0],oneProduct).id=conectProd.id;
        let textDiv=incertElement('div', '', oneProduct);
        let productName=incertElement('p', 'productName', textDiv);
        productName.innerHTML=conectProd.productName;
        productName.id=conectProd.id;
        incertElement('p', 'productComponents', textDiv).innerHTML=conectProd.productComponents;
        incertElement('p', 'price', textDiv).innerHTML=conectProd.price+' грн';
        let acBtn = incertElementDetails('input', 'order', 'button', oneProduct)
        acBtn.value = 'До корзини';
    }
}

let start = null;
function banerstep(currentTime) {
    if (!start) start =currentTime;
    var process=currentTime-start;
    let element=document.getElementById('resultBaner');
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
        let process=currentTime-infinitystart;
        let tmpscroll=parent.scrollLeft;
        if(process>1000){process=1000}
        parent.scrollLeft=startScroll+parent.offsetWidth*(process/1000);
        if(parent.scrollLeft === tmpscroll && !firstmove)
        {
            window.requestAnimationFrame(sliderDown);
        }
        else if (process < 1000) {
            firstmove=false;
            window.requestAnimationFrame(sliderUp);
        }
    }
    function sliderDown(currentTime) {
        if (!infinityend) infinityend = currentTime;
        let process=currentTime-infinityend;
        if(process>1000){process=1000}
        parent.scrollLeft=startScroll*(1-process/1000);
        if (process < 1000) {
            window.requestAnimationFrame(sliderDown);
        }
    }
    repaintDot(parent);
    window.requestAnimationFrame(sliderUp);
}

function repaintDot(parent) {
    let dots=document.getElementsByClassName('number');
    if(dots.length<1){return;}
    let number =Math.round( parent.scrollLeft/parent.offsetWidth);
    if(number<dots.length-1){
        for(let q=0; q<dots.length;q++)
            dots[q].style.backgroundColor="#72bf9e"
        dots[number+1].style.backgroundColor="#e29467"
    }
    if(number === dots.length-1){
        for(let q=0; q<dots.length;q++)
            dots[q].style.backgroundColor="#72bf9e"
        dots[0].style.backgroundColor="#e29467"
    }
}

function orderFull(container){
    let option=["Hомер Телефону *", "Емейл", "ПІБ", "Адреса *", "Дата доставки *", "Варіант оплати"];
    let area=incertElement('div', 'area', container);
    for (let i=0; i<option.length; i++){
        let functionName=incertElement('p', 'functionName', area)
        functionName.innerHTML=option[i];
        functionName.id=i+'name';
        incertElement('textarea', 'functionInput', area).id=i+'text';
    }
    let shopBasket=incertElement('div', 'shopBasket', container);
    let priceAll=incertElement('p', 'priceAll', shopBasket);
    let price=document.getElementById("priceAll").innerHTML;
    priceAll.innerHTML='Загальна вартість: '+price+'грн';
    let PutOrder = incertElementDetails('input', 'PutOrder', 'button', container)
    PutOrder.value = "Оформити замовлення";
}

function basketFull(container, db, order){
    incertElement('div', 'orderBtn', container).innerHTML='Замовити';
    let bayAll=incertElement('div', 'bayAll', container);
    incertElement('h2', 'conected', bayAll).innerHTML='Обрані вами продукти';
    let shopBasket=incertElement('div', 'shopBasket', bayAll);
    let priceAll=incertElement('p', '', shopBasket);
    priceAll.id='priceAll';
    priceAll.innerHTML='Загальна вартість: '+0+'грн';
    let productList = incertElement('div', 'productList', bayAll);
    for (let i=0; i<order.length; i+=2){
        let myProd = db.products[order[i]];
        let oneProduct=incertElement('div', 'oneProduct', productList);
        incertImg('img','', myProd.images[0],oneProduct).id=myProd.id;
        incertElement('p', 'counterOrdered', oneProduct).innerHTML=order[i+1];
        let textDiv=incertElement('div', '', oneProduct);
        let productName = incertElement('p', 'productName', textDiv)
        productName.innerHTML=myProd.productName;
        productName.id=myProd.id;
        incertElement('p', 'productComponents', textDiv).innerHTML=myProd.productComponents;
        incertElement('p', 'price', textDiv).innerHTML=myProd.price+' грн';
        let acBtn = incertElementDetails('input', 'order', 'button', oneProduct)
        acBtn.value = 'Додати ще одиницю';
        let delBtn = incertElementDetails('input', 'unorder', 'button', oneProduct)
        delBtn.value = 'Вилучити одиницю';
    }
}

function incertElement(type, elClassName, parent)
{
    let newEl = document.createElement(type);
    newEl.className = elClassName;
    parent.appendChild(newEl);
    return newEl;
}
function incertElementDetails(type, elClassName, typeOf, parent)
{
    let newEl = document.createElement(type);
    newEl.className = elClassName;
    newEl.type = typeOf;
    parent.appendChild(newEl);
    return newEl;
}
function incertImg(type, elClassName, src, parent)
{
    let newEl = document.createElement(type);
    newEl.className = elClassName;
    newEl.src = src;
    parent.appendChild(newEl);
    return newEl;
}
function incertElementInPlace(type, elClassName, parent, place)
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
export{indexFull, catalogFull,catalogOneFull,actionOneFull,
    oneProductFull,basketFull, incertElementInPlace,incertImg,
    incertElementDetails,incertElement,onReady,banerstep,orderFull
    ,moveImg};