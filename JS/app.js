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

//Array to story all Products's Object
let productList = [];


let productImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

//Array to story all Products's Object.name
let product = [];
let votes = [];
let views = [];

let myChart;

//To save my votes,views in data
function saveToLocalStorage() {
    let data = JSON.stringify(productList);
    localStorage.setItem("product", data);
}

//To read my votes,views from data
function readFromLocalStorage() {
    let stringObj = localStorage.getItem("product");
    let normalObj = JSON.parse(stringObj);
    console.log("------------------------------"+ normalObj)

    if (normalObj != null) {
        productList = normalObj;
        // viewResults();
        // renderCharts();
    }
}
readFromLocalStorage();



function Products(productsName) {
    this.pName = productsName.split('.')[0];
    this.img = 'img/' + productsName;
    this.votes = 0;
    this.views = 0;
    this.maxViews = 0;
    productList.push(this);
    product.push(this.pName);
}



//let newProd=new Products(productImg[6]);
for (let i = 0; i < productImg.length; i++) {
    new Products(productImg[i]);

}
// console.log(newProd)
console.log(product)


function randomIndex() {
    return Math.floor(Math.random() * productList.length);
}

let leftIndex;
let midIndex;
let rightIndex;
let pLeftIndex;
let pMidIndex;
let pRightIndex;
let saveIndex = [];
function unique() {
    // pLeftIndex=leftIndex;
    // pMidIndex = midIndex;
    // pRightIndex = rightIndex;
    while (pLeftIndex === leftIndex || pLeftIndex === midIndex || pLeftIndex === rightIndex || pMidIndex === leftIndex || pMidIndex === midIndex || pMidIndex === rightIndex || pRightIndex === leftIndex || pRightIndex === midIndex || pRightIndex === rightIndex) {
        leftIndex = randomIndex();
        midIndex = randomIndex();
        rightIndex = randomIndex();
    }
}

let list = [];
function renderRandomImg() {
    // saveIndex = []
    leftIndex = randomIndex();
    midIndex = randomIndex();
    rightIndex = randomIndex();
    // saveIndex.push([leftIndex, midIndex, rightIndex]);
    // console.log(saveIndex);
    //unique();
    while (leftIndex === midIndex || leftIndex === rightIndex || midIndex === rightIndex || list.includes(leftIndex) || list.includes(midIndex) || list.includes(rightIndex)) {
        // if (pLeftIndex != leftIndex || pMidIndex != midIndex || pRightIndex != rightIndex) {
        leftIndex = randomIndex();
        midIndex = randomIndex();
        rightIndex = randomIndex();
        // unique();


        // }

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
    list = [leftIndex, midIndex, rightIndex];
    // pMidIndex = midIndex;
    // pRightIndex = rightIndex;
    console.log(leftIndex);
    console.log(list[0]);
    console.log(midIndex);
    console.log(list[1]);
    console.log(rightIndex);
    console.log(list[2]);
    // console.log(list);
    console.log("------------------------------------------");

    // saveIndex = [];

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
        saveToLocalStorage();
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

    // ctx = document.getElementById('myChart').getContext('2d');
    // let ulEl = document.getElementById('results');

    // ulEl.innerHTML = "";
    // // ulEl.remove();
    // // let ulEl = document.getElementById('results');
    // // let ulEl = document.getElementById('results');    
    // for (let i = 0; i < productList.length; i++) {
    //     let liEl = document.createElement('li');
    //     liEl.textContent = `${productList[i].pName} has ${productList[i].votes} votes and ${productList[i].views} views `
    //     ulEl.appendChild(liEl);
    //     votes.push(productList[i].votes);
    //     views.push(productList[i].views);
    // }
    for (let i = 0; i < productList.length; i++) {
        votes.push(productList[i].votes);
        views.push(productList[i].views);
    }


    renderCharts();
    // saveToLocalStorage();
    //myChart.destroy();
}
function renderCharts() {
    let ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: product,
            datasets: [{
                label: '# of Votes',
                data: votes,
                backgroundColor: [
                    'green',
                ],
                borderColor: [
                    'green',
                ],
                borderWidth: 1
            },
            {
                label: '# of Views',
                data: views,
                backgroundColor: [
                    'red',
                ],
                borderColor: [
                    'red',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    // saveToLocalStorage();

}
