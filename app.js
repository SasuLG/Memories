var header = document.querySelector('header')
var start = document.querySelector('#start')
var article = document.querySelector('article')
var section = document.querySelector('section')
var choiceJoueur = document.querySelectorAll('#choixJoueur button')
var choiceDifficulte = document.querySelectorAll('#choixDifficulté button')

var temps = 0
var time = document.querySelector('#timeValue')
var nbCoups = 0
var coups = document.querySelector('#coupsValue')
choiceJoueur[0].classList.add('aqua')
choiceDifficulte[0].classList.add('aqua')

var isbuild = false

choiceJoueur.forEach(e=>{
    e.addEventListener('click', choice)
})
choiceDifficulte.forEach(e=>{
    e.addEventListener('click', choice)
})

function choice(){
    if (this.className == 'joueur'){
        choiceJoueur.forEach(e=>{
            e.classList.remove('aqua')
        })
    }else{
        choiceDifficulte.forEach(e=>{
            e.classList.remove('aqua')
        })
    }

    this.classList.add('aqua')
}

start.addEventListener('click', Start)
document.addEventListener('keydown', e=>{
    if (e.key== 'Enter' && !isbuild){
        Start()
    }else if(e.key == 'ArrowUp' && isbuild){
        Start()
    }
})

var NBJ = 1
var NBCARDS = 10
var timer = 1500
var images = []
var joueur1Joue = true

var scoreJ1 = document.querySelector('#scoreJ1Value')
var scoreJ1Value = 0
var scoreJ2 = document.querySelector('#scoreJ2Value')
var scoreJ2Value = 0


function Start(){
    images = ["light.jpg", "hawks.jpg", "shoto.jpg", "ken2.jpg", "arima.jpg", "kiyotaka.png", "783546.png", "destiny.jpg", "violet.png", "detective.jpg"]

    article.style.display = 'flex'
    section.style.display = 'flex'
     header.style.display = 'none'
     if (choiceDifficulte[0].className == 'difficulte aqua'){
        NBCARDS = 8
        images.pop()
        images.pop()
    }else if (choiceDifficulte[1].className == 'difficulte aqua'){
        NBCARDS = 10
    }else{
        NBCARDS = 10
        timer = 500
    }
    if (choiceJoueur[0].className == 'joueur aqua'){
        console.log('oui')
        NBJ = 1
    }else{
        NBJ = 2
    }
    images = [...images, ...images]
    build()
    changeTime()


}
var cards = []
function build(){
    isbuild = true
    for (var i = 0; i < NBCARDS*2; i++){
        var card = document.createElement('div')
        card.classList.add('card')
        section.appendChild(card)
        var front = document.createElement('div')
        var back = document.createElement('div')
        front.classList.add('front')
        back.classList.add('back')
        card.appendChild(front)
        card.appendChild(back)
        var img = document.createElement('img')

        var random = Math.floor(Math.random() * images.length)
        img.src = "images/"+images[random] 
        images.splice(random, 1)

        front.appendChild(img)
        cards.push(card)
        coups.innerHTML = nbCoups
        time.innerHTML = temps
    }
    addcard()
}

function addcard(){
    cards.forEach(e=>{
        e.addEventListener('click', choiceCard)
    
    })
}



var listReturn = []
var GO = true

function choiceCard(){
    if (GO && this.className != 'card cardhover'){
        this.classList.add('cardhover')
        listReturn.push(this)
        if (listReturn.length == 2){
         test()
         joueur1Joue = !joueur1Joue
        }
    }

}

function test(){
    GO = false
    nbCoups++
    if (nbCoups >= 20){
        coups.style.color = 'red'
    }
    coups.innerHTML = nbCoups
    if (listReturn[0].children[0].children[0].src == listReturn[1].children[0].children[0].src){
        setTimeout(()=>{
            listReturn[0].children[0].style.opacity = 0
            listReturn[1].children[0].style.opacity = 0
            listReturn.pop()
            listReturn.pop()
            NBCARDS--
            if (joueur1Joue){
                scoreJ1Value ++
                scoreJ1.innerHTML = scoreJ1Value
            }else{
                scoreJ2Value ++
                scoreJ2.innerHTML = scoreJ2Value
            }
            if (NBCARDS == 0){
                afficheFin()
            }else{
                GO = true
            }
        }, timer)

        listReturn[0].style.visibility = 'hidden'
        listReturn[1].style.visibility = 'hidden'

    }else{
        setTimeout(()=>{
            //window.navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100])
            window.navigator.vibrate(400)
            listReturn[0].classList.remove('cardhover')
            listReturn[1].classList.remove('cardhover')
            listReturn.pop()
            listReturn.pop()
            GO = true
        }, timer)
    }
}


function changeTime(){
    var intervalTime = setInterval(()=>{
        temps++
        time.innerHTML = temps
        if (temps >= 100){
            time.style.color = 'red'
        }
    }, 1000)

}

function afficheFin(){
    clearInterval(intervalTime)
    alert('oui')
}