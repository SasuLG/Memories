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
var images = ["light.jpg", "hawks.jpg", "shoto.jpg", "ken2.jpg", "arima.jpg", "kiyotaka.png", "783546.png", "destiny.jpg", "violet.png", "detective.jpg"]


function Start(){
    section.style.display = 'flex'
     header.style.display = 'none'
     if (choiceDifficulte[0].className == 'difficulte aqua'){
        NBCARDS = 8
    }else if (choiceDifficulte[1].className == 'difficulte aqua'){
        NBCARDS = 10
    }else{
        NBCARDS = 10
        //time ou autre
    }
    if (choiceJoueur[0].className == 'joueur aqua'){
        console.log('oui')
    }else{
        console.log('non')
    }
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
        img.src = "images/"+images[Math.floor(i/2)] 
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
function choiceCard(){
    /*
    var nb = 0
    var bool = false
    cards.forEach(e=>{
        if (e.className == 'card cardhover'){
            nb++
        }
        if (nb >= 2){
            bool = true
        }
    })
    if(bool){
        cards.forEach(e=>{
            e.classList.remove('cardhover')
        })
    }else{
        this.classList.add('cardhover')
    }
    */
   this.classList.add('cardhover')
   listReturn.push(this)
   if (listReturn.length == 2){
    test()
   }
}

function test(){
    if (listReturn[0].children[0].children[0].src == listReturn[1].children[0].children[0].src){
        setTimeout(()=>{
            listReturn[0].children[0].style.opacity = 0
            listReturn[1].children[0].style.opacity = 0
            listReturn.pop()
            listReturn.pop()
        }, 1500)

        listReturn[0].style.visibility = 'hidden'
        listReturn[1].style.visibility = 'hidden'

    }else{
        setTimeout(()=>{
            window.navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100])
            listReturn[0].classList.remove('cardhover')
            listReturn[1].classList.remove('cardhover')
            listReturn.pop()
            listReturn.pop()
        }, 1500)
    }
}