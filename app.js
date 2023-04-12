var header = document.querySelector('header')
var start = document.querySelector('#start')
var section = document.querySelector('section')
var choiceJoueur = document.querySelectorAll('#choixJoueur button')
var choiceDifficulte = document.querySelectorAll('#choixDifficulté button')


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

var NBCARDS = 10
var timer = 1500
var images = []

function Start(){
    images = ["light.jpg", "hawks.jpg", "shoto.jpg", "ken2.jpg", "arima.jpg", "kiyotaka.png", "783546.png", "destiny.jpg", "violet.png", "detective.jpg"]

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
    }else{
        console.log('non')
    }
    images = [...images, ...images]
    build()


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
        if (i ==4){
            var score = document.createElement('div')
            score.id = 'scoreJ2'
            section.appendChild(score)
            var p = document.createElement('p')
            p.innerHTML = 'score J2'
            score.appendChild(p)
            var p2 = document.createElement('p')
            p2.innerHTML = '0'
            score.appendChild(p2)
        }
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
        }
    }

}

function test(){
    GO = false
    if (listReturn[0].children[0].children[0].src == listReturn[1].children[0].children[0].src){
        setTimeout(()=>{
            listReturn[0].children[0].style.opacity = 0
            listReturn[1].children[0].style.opacity = 0
            listReturn.pop()
            listReturn.pop()
            GO = true
        }, timer)

        listReturn[0].style.visibility = 'hidden'
        listReturn[1].style.visibility = 'hidden'

    }else{
        setTimeout(()=>{
            window.navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100])
            listReturn[0].classList.remove('cardhover')
            listReturn[1].classList.remove('cardhover')
            listReturn.pop()
            listReturn.pop()
            GO = true
        }, timer)
    }
}