'use strict';

let attemptsEl = document.getElementById("attempts");
let divContainer = document.getElementById("container");

let leftImgEl = document.getElementById('leftside');
let midImgEl = document.getElementById('midside');
let rightImgEl = document.getElementById('rightside');

let ulEl = document.getElementById('results');
// let ulEl;

attemptsEl.textContent = `You Have 25 Round To Pick Your Favourite Products`;
let attempts = 1;
let maxAttempts = 25;

let myForm = document.getElementById('myForm');
myForm.addEventListener('submit', viewResults);

let productList = [];

let productImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

function Products(productsName) {
    this.pName = productsName.split('.')[0];
    this.img = 'img/' + productsName;
    this.votes = 0;
    this.views = 0;
    this.maxViews = 0;
    productList.push(this);
}



//let newProd=new Products(productImg[6]);
for (let i = 0; i < productImg.length; i++) {
    new Products(productImg[i]);
}
// console.log(newProd)
console.log(productList)


function randomIndex() {
    return Math.floor(Math.random() * productList.length);
}

let leftIndex;
let midIndex;
let rightIndex;
function renderRandomImg() {

    leftIndex = randomIndex();
    midIndex = randomIndex();
    rightIndex = randomIndex();
    while (leftIndex === midIndex || leftIndex === rightIndex || midIndex === rightIndex) {
        leftIndex = randomIndex();
        midIndex = randomIndex();
        rightIndex = randomIndex();
    }

    leftImgEl.setAttribute('src', productList[leftIndex].img);
    midImgEl.setAttribute('src', productList[midIndex].img);
    rightImgEl.setAttribute('src', productList[rightIndex].img);

    leftImgEl.setAttribute('title', productList[leftIndex].pName);
    midImgEl.setAttribute('title', productList[midIndex].pName);
    rightImgEl.setAttribute('title', productList[rightIndex].pName);

    productList[leftIndex].views++;
    productList[midIndex].views++;
    productList[rightIndex].views++;

}
// console.log(goats);
renderRandomImg();

leftImgEl.addEventListener('click', handelClicks);
midImgEl.addEventListener('click', handelClicks);
rightImgEl.addEventListener('click', handelClicks);

function handelClicks(event) {
    if (attempts <= maxAttempts) {
        let clickedImg = event.target.id;
        if (clickedImg === 'leftside') {
            productList[leftIndex].votes++;
        }
        else if (clickedImg === 'midside') {
            productList[midIndex].votes++;
        }
        else if (clickedImg === 'rightside') {
            productList[rightIndex].votes++;
        }
        renderRandomImg();
        // console.log(clickedImg);
        console.log(productList);
    } else {
        //let ulEl = document.getElementById('results');
        // for (let i = 0; i < productList.length; i++) {
        //     let liEl = document.createElement('li');
        //     liEl.textContent = `${productList[i].pName} has ${productList[i].votes} votes and ${productList[i].views} views .`
        //     ulEl.appendChild(liEl);
        // }
        leftImgEl.removeEventListener('click', handelClicks);
        midImgEl.removeEventListener('click', handelClicks);
        rightImgEl.removeEventListener('click', handelClicks);
    }
    if (attempts <= maxAttempts) {
        attemptsEl.textContent = `You Have ${maxAttempts - attempts} Round To Pick Your Favourite Products`;

    }

    attempts++;

}

function viewResults(event) {
    event.preventDefault();
    ulEl.innerHTML = "";
    // ulEl.remove();
    // let ulEl = document.getElementById('results');
    // let ulEl = document.getElementById('results');    
    for (let i = 0; i < productList.length; i++) {
        let liEl = document.createElement('li');
        liEl.textContent = `${productList[i].pName} has ${productList[i].votes} votes and ${productList[i].views} views `
        ulEl.appendChild(liEl);
    }
    // for (let i = 0; i < productList.length; i++) {
    //     let liEl = document.createElement('li');
    //     if (productList[i].votes > productList[++i].votes) {
    //         productList[i].maxViews = productList[i].votes;
    //     }
    //     liEl.textContent = `${productList[i].maxViews} HELOOOOOOOOOOOO`
    //     ulEl.appendChild(liEl);

    // }




}