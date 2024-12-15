const imgSrc = document.querySelector('img');
const nameF = document.querySelector('h4')
const profesion = document.querySelector('.blue-text-dev')
const desText = document.querySelector('.text-description')
const minor = document.getElementById('minor')
const plus = document.getElementById('plus')
const randomBtn = document.querySelector('button')
let counterData = 0;

const dataObj = [
    {
        id : 1,
        img : 'pic2.jpg',
        nameN : 'George Nos',
        pro : 'WEB DESIGNER',
        description : 'Lorem ipsum dolor sit amet consectetug elit. Perspiciatis, voluptatibus nemo! Distinctio nemo voluptate harum, dolor necessitatibus cupiditate veniam eaque, labore '
    },
    {
        id : 2,
        img : 'pic3.jpg',
        nameN : 'Delia Cabrera',
        pro : 'TEACHER',
        description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, ve harum, dolor necessitatibus cupiditate veniam eaque, labore '
    },
    {
        id : 3,
        img : 'pic4.jpg',
        nameN : 'Artemio Cabrera',
        pro : 'FORMER DIRECTOR',
        description : 'Lorem iur adipisicing elit. Perspiciatatibus nemo! Distinctio nemo voluptate harum, dolor necessitatibus cupiditate veniam eaque, labore '
    },
    {
        id : 4,
        img : 'pic5.jpg',
        nameN : 'Omar Maldonado',
        pro : 'BACKEND DEVELOPER',
        description : 'Ltur adipisicing elit. Perspiciatis, voluptatibus nemo! Distinctio nemo voluptate harum, dolor necessitatibus cupiditate veniam eaque, labore '
    },
    {
        id : 5,
        img : 'pic7.jpg',
        nameN : 'Francisca Maldonado',
        pro : 'FORMER TEACHER',
        description : 'Lorem ipsum dolor sit amet consecte'
    }
]

window.addEventListener("DOMContentLoaded", (e)=>{
    
    const renderData = ()=>{
        const {img, nameN, pro, description} = dataObj[counterData];
        imgSrc.src = img;
        nameF.textContent = nameN;       
        profesion.textContent = pro;
        desText.textContent = description; 
    }
    renderData()
    plus.addEventListener('click', ()=>{
        counterData++
        if(counterData>=dataObj.length){
            counterData = 0;
        }
        renderData()
    })
    minor.addEventListener('click', ()=>{
        counterData--;
        if(counterData<0){
            counterData = dataObj.length-1;
        }
        renderData()
    })
    randomBtn.addEventListener('click', e =>{
        e.preventDefault()
        let randomItem = Math.floor(Math.random() * dataObj.length)
        counterData = randomItem;
        renderData()
    })
})