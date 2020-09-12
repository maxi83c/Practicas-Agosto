const divScoreRed = document.getElementById('score-red')
const divScoreBlue = document.getElementById('score-blue')
const redHand = document.getElementById('hand-red')
const blueHand = document.getElementById('hand-blue')
const buttonStart = document.getElementById('buttom-start')
const countdown = document.getElementById('timer')
const containerGame = document.getElementById('container-game')
const containerForm = document.getElementById('container-config')
const containerMessage = document.getElementById('container-menssage')
const containerRules = document.getElementById('container-rules')
const rock = document.getElementById('rock')
const paper = document.getElementById('paper')
const scissors = document.getElementById('scissors')
const message = document.getElementById('menssage')
const attempts = document.getElementById('attempts')

// variables para controlar puntajes y mano seleccionada
let scoreRed = 0
let scoreBlue = 0
let selectedHand = -1

// devuelve verdadero o falso dependiendo si el juego termina
const endGame = () => {
    let goal = attempts.options[attempts.selectedIndex].value
    if (goal == 0)
        return false
    goal = goal / 2
    if (goal < scoreRed || goal< scoreBlue)
        return true
    return false
} 

// muestra el mensaje de victoria o derrota según corresponda
const popupEnd = () =>{
    if (scoreRed < scoreBlue)
        message.textContent = "FELICIDADES, HAS GANADO!"
    else
        message.textContent = "LO SIENTO, HAS PERDIDO!"
    containerMessage.classList.remove('invisible')
}

// vuelve el juego a la configuración inicial (salvo el modo de juego)
const resetGame = () => {
    blueHand.classList.remove('win')
    redHand.classList.remove('win')
    blueHand.classList.remove('lose')
    redHand.classList.remove('lose')
    blueHand.classList.remove('not__chose')
    redHand.setAttribute('src','img/rock-red.png');
    blueHand.setAttribute('src','img/rock-blue.png');
    buttonStart.classList.remove('invisible')
    rock.classList.add('invisible')
    paper.classList.add('invisible')
    scissors.classList.add('invisible')
    countdown.classList.add('invisible')
    countdown.classList.remove('countdown')
    scoreRed = 0
    scoreBlue = 0
    selectedHand = -1
    divScoreBlue.innerText = 0
    divScoreRed.innerText = 0
}

// vuelve las manos a la posición incial o informa si finalizo el juego
const resetHands = () =>{
    rock.classList.add('invisible')
    paper.classList.add('invisible')
    scissors.classList.add('invisible')
    
    setTimeout(() =>{
        if (endGame())
        popupEnd()
    else{
        blueHand.classList.remove('win')
        redHand.classList.remove('win')
        blueHand.classList.remove('lose')
        redHand.classList.remove('lose')
        blueHand.classList.remove('not__chose')
        redHand.setAttribute('src','img/rock-red.png');
        blueHand.setAttribute('src','img/rock-blue.png');
        buttonStart.classList.remove('invisible')
        countdown.classList.add('invisible')
        countdown.classList.remove('countdown')
    }         
    }, 1000)
}

// modifica las manos según las opciones seleccionadas
const setHands = (red, blue) =>{
    blueHand.classList.remove('wait__blue')
    redHand.classList.remove('wait__red')
    switch (red){
        case 1:
            redHand.setAttribute('src','img/paper-red.png');
            break
        case 2:
            redHand.setAttribute('src','img/scissors-red.png')
    }
    switch (blue){
        case 1:
            blueHand.setAttribute('src','img/paper-blue.png');
            break
        case 2:
            blueHand.setAttribute('src','img/scissors-blue.png')
    }
    if (blue == red){
        blueHand.classList.add('lose')
        redHand.classList.add('lose')
    } else if ((red === 0 && blue === 1) || (red === 1 && blue === 2) || (red === 2 && blue === 0)){
        scoreBlue+=1
        divScoreBlue.innerText = scoreBlue
        blueHand.classList.add('win')
        redHand.classList.add('lose')
    } else {
        scoreRed+=1
        divScoreRed.innerText = scoreRed
        blueHand.classList.add('lose')
        redHand.classList.add('win')
    }
    resetHands()
}

// comienza la ronda 
const startGame = () => {
    selectedHand = -1
    buttonStart.classList.add('invisible')
    rock.classList.remove('invisible')
    paper.classList.remove('invisible')
    scissors.classList.remove('invisible')
    blueHand.classList.add('wait__blue')
    redHand.classList.add('wait__red')
    countdown.classList.remove('invisible')
    countdown.classList.add('countdown')
    setTimeout(() => {
        if (selectedHand === -1){
                scoreRed+=1
                divScoreRed.innerText = scoreRed
                blueHand.classList.remove('wait__blue')
                blueHand.classList.add('not__chose')
                redHand.classList.remove('wait__red')
                redHand.classList.add('win')
                countdown.classList.add('invisible')
                countdown.classList.remove('countdown')
                resetHands()
        } else {
            //selecciona al azar un número entre 0 y 2
            setHands(Math.floor(Math.random() * 3), selectedHand)
        }
    }, 3000)
}

// muestra el popup de configuración
const setConfig = () => {
    containerForm.classList.remove('invisible')
}

// verifica en que botón se hizo clic
containerGame.addEventListener('click', e =>{
    e.preventDefault()
    switch (e.target.className){
        case 'buttom__rock': 
            selectedHand = 0
            break    
        case 'buttom__paper': 
            selectedHand = 1
            break
        case 'buttom__scissors': 
            selectedHand = 2
            break        
        case 'buttom__config': 
            setConfig()
            break
        case 'buttom__help':
            containerRules.classList.remove('invisible')
            break
        case 'start':
                startGame()
                break
        case 'config__ok':
            containerForm.classList.add('invisible')
            resetGame()
            break
        case 'config__cancel':
            containerForm.classList.add('invisible')
            containerMessage.classList.add('invisible')
            break
        case 'rules__close':
            containerRules.classList.add('invisible')
            break
        case 'popup__close':
            containerForm.classList.add('invisible')
            containerMessage.classList.add('invisible')
            resetGame()
    }
})
