const styles = document.documentElement.style
const difficulty = document.getElementById('dificultad')
const playerInput = document.getElementById('jugador')
const gameContainer = document.getElementById('game-container')
const greenButton = document.getElementById('boton-verde')
const redButton = document.getElementById('boton-rojo')
const yellowButton = document.getElementById('boton-amarillo')
const blueButton = document.getElementById('boton-azul')
const playButton = document.getElementById('boton-power')
const center = document.getElementById('desactivar-centro')
const gameButtons = document.getElementById('desactivar-botones')
const popup = document.getElementById('popup-container')
const config = document.getElementById('formulario-config')
const scores = document.getElementById('puntajes-container')
const actual = document.getElementById('actual')
const selectedDifficulty = document.getElementById('dificultad-seleciconada')
const playerNameLabel = document.getElementById('jugador-actual')
const scorePlayerName = document.getElementById('nombre-jugador-puntaje-actual')
const scorePlayerSecuences = document.getElementById('secuencias-puntaje-actual')
const scoreTableTitle = document.getElementById('titulo-posiciones')
const scoreTableList = document.getElementById('lista-puntajes')
const cancelButton = document.getElementById('boton-cancelar')


let playerSec = []
let gameSec = []
let score = 0
let lose = false
let dificultTyme = 1000
selectedDifficulty.textContent  = `Dificualtad: ${difficulty.options[difficulty.selectedIndex].textContent}`
actual.textContent = `Secuencias: ${score}`

let playerName = ''
let contiueExec = true
let storagesScores = null
let playerScoreIndex = -1

// sonidos
const soundOk = new Audio('sounds/ok.mp3')
const soundfail = new Audio('sounds/fail.mp3')

 // evito que se borre el contenido del formulario al presionar enter
config.addEventListener('submit',e => {
        e.preventDefault()
}) 

// devuelve el índice de la lista correspondiente al Jugador
const getPlayerIndex = () =>{
        for (let i = 0; i < storagesScores.length; i++){
                if (storagesScores[i].name === playerName )
                    return i
        }
        storagesScores.push({'name': playerName, 'score': score})
        return storagesScores.length -1
}

//resetea las varibles a la configuración inicial
const resetGame = () => {
        contiueExec = false
        if (lose){
                config.reset()
        }
        gameButtons.classList.remove('invisible')
        center.classList.add('invisible')
        playButton.classList.remove('sequence-fail')
        playButton.classList.remove('sequence-ok')
        playButton.classList.remove('animate-power-play')
        playerSec = []
        gameSec = []
        score = 0
        playerName = ''
        styles.setProperty('dificultad', difficulty.options[difficulty.selectedIndex].value) // asigna a la variable CSS la velocidad de animación
        dificultTyme = parseInt(parseFloat(difficulty.options[difficulty.selectedIndex].value.replace(/s/g,"")) * 1000) //convierte el string de tiempo de animación a milisegundos (1s => 1000)
        actual.textContent = `Secuencias: ${score}`
        playerName =  playerInput.value.trim().toUpperCase()
        playerNameLabel.textContent = `Nombre: ${playerName}`
        selectedDifficulty.textContent = `Dificualtad: ${difficulty.options[difficulty.selectedIndex].textContent}`
        scorePlayerName.textContent = playerName
        scorePlayerSecuences.textContent = score
        scoreTableTitle.textContent  = `Tabla de posiciones (nivel ${difficulty.options[difficulty.selectedIndex].textContent})`
        // busca la lista de puntajes por nivel de dificultad, si no existe el usuario lo crea        
        storagesScores = JSON.parse(localStorage.getItem(`Puntajes - ${difficulty.options[difficulty.selectedIndex].textContent})`))
        if (!storagesScores){
                storagesScores= [ 
                        {
                                'name': playerName,
                                'score': score
                        }
                ]
                playerScoreIndex = 0
                localStorage.setItem(`Puntajes - ${difficulty.options[difficulty.selectedIndex].textContent})`, JSON.stringify(storagesScores))
        }
        else 
                playerScoreIndex = getPlayerIndex()
        setScoreList()
        hidePopup()
        if (lose){ // si perdio muestra de nuevo la configuración
                lose = false
                playerNameLabel.classList.add('invisible')
                cancelButton.classList.add('invisible')
                showConfig()
        }    
}


// esconde la configuración y los puntajes
const hidePopup = () => {
        if (playerName != ''){
                cancelButton.classList.remove   ('invisible')
                playerNameLabel.classList.remove('invisible')
                popup.classList.add('invisible')
                scores.classList.add('invisible')
                config.classList.add('invisible')
                if (lose)
                        resetGame()
        }
}

// muestra los puntajes
const showScores = () => {
        popup.classList.remove('invisible')
        scores.classList.remove('invisible')
        config.classList.add('invisible')
}

// muestra la configuración
const showConfig = () => {
        popup.classList.remove('invisible')
        scores.classList.add('invisible')
        config.classList.remove('invisible')
}


// actualizar grabar puntajes en local storage

const saveScore = () => {
        if (score > storagesScores[playerScoreIndex].score) {
                storagesScores[playerScoreIndex].score = score
                storagesScores.sort((a , b) => { // ordena por puntaje descendente, si coinciden los puntajes ordena por nombre
                        if (a.score < b.score)
                                return 1
                        if (a.score > b.score)
                                return -1
                        if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase())
                                return -1
                        if (a.name > b.name)
                                return 1
                        return 0                        
                })
                playerScoreIndex = getPlayerIndex()
                localStorage.setItem(`Puntajes - ${difficulty.options[difficulty.selectedIndex].textContent})`, JSON.stringify(storagesScores))
                setScoreList()
        }
}


const setScoreList = () =>{
        let listScoreHTML = ""
        for (let i = 0; i < storagesScores.length; i++){
                if (i != playerScoreIndex)
                        listScoreHTML= `${listScoreHTML}<div>${storagesScores[i].name}</div><div class="text-end">${storagesScores[i].score}</div>`  
                else
                        listScoreHTML= `${listScoreHTML}<div  class="puntaje-actual">${storagesScores[i].name}</div><div class="text-end puntaje-actual">${storagesScores[i].score}</div>`
        }
        scoreTableList.innerHTML = listScoreHTML
}




// funcion para cargar el click del usuario en uno de los botones de color
const clickButton = (color) =>{
    playerSec.push(color)
    for (let i = 0; i < playerSec.length; i++){
        if (playerSec[i] != gameSec[i] ){
                lose = true   
                break
        }
    }
    if(!lose) {
        if (playerSec.length === gameSec.length){ // si termina la secuencia suma el punjate y reporduce la animación
                soundOk.play()
                playButton.classList.add('animate-power-play')
                score++
                saveScore()
                setScoreList()
                actual.textContent = `Secuencias: ${score}`
                scorePlayerSecuences.textContent = score
                setTimeout(() => {
                        if (!contiueExec) //agrego este condicional para evitar que se ejecute el código al vencer el timer si se reinicio el juego
                                return
                playButton.classList.remove('animate-power-play')
                playButton.classList.remove('sequence-ok')
                center.classList.add('invisible')
                gameButtons.classList.remove('invisible')
                }, 1000)
        }
    } else { // si pierde muestra animacion y luego los puntajes
                soundfail.play()
                playButton.classList.remove('sequence-ok')
                center.classList.remove('invisible')
                gameButtons.classList.remove('invisible')
                playButton.classList.add('sequence-fail')
                setTimeout(() => {
                        if (!contiueExec) //agrego este condicional para evitar que se ejecute el código al vencer el timer si se reinicio el juego
                                return
                        showScores()}, 1000)
                
    }
}

// funcion recursiva para ir reproduciendo cada secuencia según la velocidad de la dificultad
const playSequence = (index) => {
    contiueExec = true
    
    if (index < gameSec.length){
        switch (gameSec[index]){ // determina que color animar
                case 0:
                        greenButton.classList.add('animate-green')
                        break
                case 1:
                        redButton.classList.add('animate-red')
                        break
                case 2:
                        yellowButton.classList.add('animate-yellow')
                        break
                case 3:
                        blueButton.classList.add('animate-blue')
        }
        setTimeout(() => {
                if (!contiueExec) //agrego este condicional para evitar que se ejecute el código al vencer el timer si se reinicio el juego
                        return
                greenButton.classList.remove('animate-green')
                redButton.classList.remove('animate-red')
                yellowButton.classList.remove('animate-yellow')
                blueButton.classList.remove('animate-blue')
                setTimeout(() => {
                        if (!contiueExec) //agrego este condicional para evitar que se ejecute el código al vencer el timer si se reinicio el juego
                                return
                        playSequence(++index)
                }, 10)
        }, dificultTyme)
    } else {
        soundOk.play()
        playButton.classList.add('sequence-ok')
        center.classList.remove('invisible')
        gameButtons.classList.add('invisible')
        playerSec = []
    }
}

const startGame = () =>{
        center.classList.add('invisible')
        gameSec.push(Math.floor(Math.random() * 4)) // elige un número al azar entre 0 y 3 (0: verde, 1: rojo, 2: amarillo y 3:azul)
        center.classList.remove('invisible')
        playSequence(0)       
}

// verifica en que botón se hizo clic
gameContainer.addEventListener('click', e =>{
    e.preventDefault()
    switch (e.target.className){
        case 'verde': 
                clickButton(0)
                break    
        case 'rojo': 
                clickButton(1)
                break  
        case 'amarillo': 
                clickButton(2)
                break    
        case 'azul': 
                clickButton(3)
                break  
        case 'boton-power':
                startGame()
                break
        case 'boton-puntajes':
                showScores()
                break
        case 'boton-config':
                showConfig()
                break               
        case 'boton-aceptar':
                resetGame()
                break
        case 'boton-cancelar':
                hidePopup()
                break
        case 'boton-cerrar':
                hidePopup()
    }
})

