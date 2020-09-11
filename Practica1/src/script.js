const styles = document.documentElement.style
const needleHour = document.getElementById('needle-hour')
const needleMinute = document.getElementById('needle-minute')
const needleSecond = document.getElementById('needle-second')
const power = document.getElementById('power')

// cambiar de tema al precionar el boton de power
let powerOn = false
power.addEventListener('click', () =>{
    if(powerOn)
    {
        styles.setProperty('--bgc-border-clock','silver');
        styles.setProperty('--bgc-clock','white');
        styles.setProperty('--bdc-line','gray');
        styles.setProperty('--fluorescent-green','#d7fad7');
        styles.setProperty('--fluorescent-red','red');
        styles.setProperty('--wall','lightskyblue');
    } else {
        styles.setProperty('--bgc-border-clock','#222222');
        styles.setProperty('--bgc-clock','#222222');
        styles.setProperty('--bdc-line','#222222');
        styles.setProperty('--fluorescent-green','lime');
        styles.setProperty('--fluorescent-red','#ff8000');
        styles.setProperty('--wall','#222222');
    }
    powerOn = !powerOn
})

window.addEventListener('load', () =>{
    const date = new Date() 
    let hours = date.getHours()
    hours = hours % 12
    hours = hours ? hours : 12; // la hora '0' debe ser '12'
    const minutes = date.getMinutes()
    const secconds = date.getSeconds()
    const hoursDegs = -60 + (hours - 1) * 30 + Math.round(minutes / 2) // el angulo de la aguja hora varía 30º por cada hora y 1º cada 2 minutos
    const minutesDegs = -90 + minutes * 6 + Math.round(secconds / 10) // el angulo del segundero varía 6º por segungo y 1º cada 10 segundos
    const seccondsDegs = -90 + secconds * 6 // el angulo del segundero varía 6º por segungo

    // rotar las agujas a su ángulo correspondiente
    styles.setProperty('--hours-deg', `${hoursDegs}deg`);
    styles.setProperty('--minutes-deg',`${minutesDegs}deg`);
    styles.setProperty('--seconds-deg',`${seccondsDegs}deg`);
    // comenzar animaciones
    needleHour.classList.add('animate__hours')
    needleMinute.classList.add('animate__minutes')
    needleSecond.classList.add('animate__seconds')
})

