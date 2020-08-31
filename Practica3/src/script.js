const styles = document.documentElement.style
const difficulty = document.getElementById('dificultad')
const playerInput = document.getElementById('jugador')
const gameContainer = document.getElementById('game-container')
const greenBottom = document.getElementById('boton-verde')
const redBottom = document.getElementById('boton-rojo')
const yellowBottom = document.getElementById('boton-amarillo')
const blueBottom = document.getElementById('boton-azul')
const playBottom = document.getElementById('boton-power')
const center = document.getElementById('desactivar-centro')
const gameBottoms = document.getElementById('desactivar-botones')
const popup = document.getElementById('popup-container')
const config = document.getElementById('formulario-config')
const scores = document.getElementById('puntajes-container')
const actual = document.getElementById('actual')
const selectedDifficulty = document.getElementById('dificultad-seleciconada')
const playerNameLabel = document.getElementById('jugador-actual')
const scorePlayerName = document.getElementById('nombre-jugador-puntaje-actual')
const scorePlayerSecuences = document.getElementById('secuencias-puntaje-actual')
const scoreTableTitle = document.getElementById('titulo-posiciones')

let playerSec = []
let gameSec = []
let score = 0
let lose = false
let dificultTyme = 1000
selectedDifficulty.textContent  = `Dificualtad: ${difficulty.options[difficulty.selectedIndex].textContent}`
actual.textContent = `Secuencias: ${score}`

let playerName = ''
let contiueExec = true


//resetea las varibles a la configuración inicial
const resetGame = () => {
        contiueExec = false
        if (lose){
                config.reset()
                playerNameLabel.classList.add('invisible')
        }
        gameBottoms.classList.remove('invisible')
        center.classList.add('invisible')
        playBottom.classList.remove('sequence-fail')
        playBottom.classList.remove('sequence-ok')
        playBottom.classList.remove('animate-power-play')
        playerSec = []
        gameSec = []
        score = 0
        lose = false
        playerName = ''
        styles.setProperty('dificultad', difficulty.options[difficulty.selectedIndex].value) // asigna a la variable CSS la velocidad de animación
        dificultTyme = parseInt(parseFloat(difficulty.options[difficulty.selectedIndex].value.replace(/s/g,"")) * 1000) //convierte el string de tiempo de animación a milisegundos (1s => 1000)
        actual.textContent = `Secuencias: ${score}`
        playerName =  playerInput.value.trim()
        playerNameLabel.textContent = playerName
        selectedDifficulty.textContent = `Dificualtad: ${difficulty.options[difficulty.selectedIndex].textContent}`
        scorePlayerName.textContent = playerName
        scorePlayerSecuences.textContent = score
        scoreTableTitle.textContent  = `Tabla de posiciones (nivel ${difficulty.options[difficulty.selectedIndex].textContent})`

        hidePopup()
}

const hidePopup = () => {
        if (playerName != ''){
                playerNameLabel.classList.remove('invisible')
                popup.classList.add('invisible')
                scores.classList.add('invisible')
                config.classList.add('invisible')
                if (lose)
                        resetGame()
        }
}

const showScores = () => {
        popup.classList.remove('invisible')
        scores.classList.remove('invisible')
        config.classList.add('invisible')
}

const showConfig = () => {
        popup.classList.remove('invisible')
        scores.classList.add('invisible')
        config.classList.remove('invisible')
}

const clickBottom = (color) =>{
    playerSec.push(color)
    for (let i = 0; i < playerSec.length; i++){
        if (playerSec[i] != gameSec[i] ){
                lose = true   
                break
        }
    }
    if(!lose) {
        if (playerSec.length === gameSec.length){
                playBottom.classList.add('animate-power-play')
                score++
                //grabar score
                actual.textContent = `Secuencias: ${score}`
                scorePlayerSecuences.textContent = score
                setTimeout(() => {
                        if (!contiueExec)
                                return
                playBottom.classList.remove('animate-power-play')
                playBottom.classList.remove('sequence-ok')
                center.classList.add('invisible')
                gameBottoms.classList.remove('invisible')
                }, 1000)
                
        }
    } else {
                playBottom.classList.remove('sequence-ok')
                center.classList.remove('invisible')
                gameBottoms.classList.remove('invisible')
                playBottom.classList.add('sequence-fail')
                setTimeout(() => {showScores()}, 1000)
                
    }
}

const playSequence = (index) => {
    contiueExec = true
    if (index < gameSec.length){
        switch (gameSec[index]){
                case 0:
                        greenBottom.classList.add('animate-green')
                        break
                case 1:
                        redBottom.classList.add('animate-red')
                        break
                case 2:
                        yellowBottom.classList.add('animate-yellow')
                        break
                case 3:
                        blueBottom.classList.add('animate-blue')
        }
        setTimeout(() => {
                if (!contiueExec)
                        return
                greenBottom.classList.remove('animate-green')
                redBottom.classList.remove('animate-red')
                yellowBottom.classList.remove('animate-yellow')
                blueBottom.classList.remove('animate-blue')
                setTimeout(() => {
                        if (!contiueExec)
                                return
                        playSequence(++index)
                }, 10)
        }, dificultTyme)
    } else {
        playBottom.classList.add('sequence-ok')
        center.classList.remove('invisible')
        gameBottoms.classList.add('invisible')
        playerSec = []
    }
}

const startGame = () =>{
        center.classList.add('invisible')
        gameSec.push(Math.floor(Math.random() * 4))
        center.classList.remove('invisible')
        playSequence(0)       
}

// verifica en que botón se hizo clic
gameContainer.addEventListener('click', e =>{
    e.preventDefault()
    console.log(e.target.className)
    switch (e.target.className){
        case 'verde': 
                clickBottom(0)
                break    
        case 'rojo': 
                clickBottom(1)
                break  
        case 'amarillo': 
                clickBottom(2)
                break    
        case 'azul': 
                clickBottom(3)
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

