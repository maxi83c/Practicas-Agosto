const divScoreRed = document.getElementById('score-red')
const divScoreBlue = document.getElementById('score-blue')
const redHand = document.getElementById('mano-roja')
const blueHand = document.getElementById('mano-azul')
const buttonStart = document.getElementById('boton-start')
const containerGame = document.getElementById('container-game')
const containerForm = document.getElementById('container-form')
const containerMessage = document.getElementById('container-mensaje')
const rock = document.getElementById('piedra')
const paper = document.getElementById('papel')
const scissors = document.getElementById('tijera')
const message = document.getElementById('mensaje')
const intentos = document.getElementById('intentos')

// variables para controlar puntajes y mano seleccionada
let scoreRed = 0
let scoreBlue = 0
let selectedHand = -1

// devuelve verdadero o falso dependiendo si el juego termina
const endGame = () => {
    let goal = intentos.options[intentos.selectedIndex].value
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
    blueHand.classList.remove('not-chose')
    redHand.setAttribute('src','img/piedra-r.png');
    blueHand.setAttribute('src','img/piedra-a.png');
    buttonStart.classList.remove('invisible')
    rock.classList.add('invisible')
    paper.classList.add('invisible')
    scissors.classList.add('invisible')
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
        blueHand.classList.remove('not-chose')
        redHand.setAttribute('src','img/piedra-r.png');
        blueHand.setAttribute('src','img/piedra-a.png');
        buttonStart.classList.remove('invisible')
    }         
    }, 1000)
}

// modifica las manos según las opciociones seleccionadas
const setHands = (red, blue) =>{
    blueHand.classList.remove('wait-blue')
    redHand.classList.remove('wait-red')
    switch (red){
        case 1:
            redHand.setAttribute('src','img/papel-r.png');
            break
        case 2:
            redHand.setAttribute('src','img/tijera-r.png')
    }
    switch (blue){
        case 1:
            blueHand.setAttribute('src','img/papel-a.png');
            break
        case 2:
            blueHand.setAttribute('src','img/tijera-a.png')
    }
    if (blue == red){
        blueHand.classList.add('lose')
        redHand.classList.add('lose')
    } else if ((red == 0 && blue == 1) || (red == 1 && blue == 2) || (red == 2 && blue == 0)){
        scoreBlue++
        divScoreBlue.innerText = scoreBlue
        blueHand.classList.add('win')
        redHand.classList.add('lose')
    } else {
        scoreRed++
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
    blueHand.classList.add('wait-blue')
    redHand.classList.add('wait-red')
    setTimeout(() => {
        if (selectedHand === -1){
                scoreRed++
                divScoreRed.innerText = scoreRed
                blueHand.classList.remove('wait-blue')
                blueHand.classList.add('not-chose')
                redHand.classList.remove('wait-red')
                redHand.classList.add('win')
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
        case 'boton-piedra': 
                selectedHand = 0
                break    
        case 'boton-papel': 
                selectedHand = 1
                break
        case 'boton-tijera': 
                selectedHand = 2
                break        
        case 'boton-config': 
                setConfig()
                break
        case 'start':
                startGame()
                break
        case 'config-ok':
            containerForm.classList.add('invisible')
            resetGame()
            break
        case 'config-cancel':
            containerForm.classList.add('invisible')
            containerMessage.classList.add('invisible')
            if (e.target.id === "boton-cerrar")
                resetGame()
    }
})



