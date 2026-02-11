let minIntervalSec = 100
let maxIntervalSec = 400
// let minIntervalSec = 1
// let maxIntervalSec = 3


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', initialize)
}
else {
    initialize()
}

function initialize() {
    initializeCallbacks()
}

function initializeCallbacks() {
    setTimeout(addPacman, getRandomIntervalTime())
}

function getRandomIntervalTime() {
    let randTimeMillisec = Math.floor(((maxIntervalSec-minIntervalSec)*Math.random()+minIntervalSec)*1000)
    console.log(`Random Pacman interval: ${randTimeMillisec/1000} s`)
    return randTimeMillisec
}

function addPacman() {
    console.log('Adding Pacman')
    /* Programatically adding the following HTML:

        <div class="pacman">
            <svg viewBox="-1.05 -1.05 2.1 2.1" xmlns="http://www.w3.org/2000/svg">
                <!-- Animate path going from +\-40 degrees down to zero and back-->
                <path d="" fill="yellow" stroke="black" stroke-width="0.05">
                    <animate attributeName="d" dur="0.5s" repeatCount="indefinite"
                        values="M0 0 L0.766 0.643 A1 1 0 1 1 0.766 -0.643 Z;
                                M0 0 L0.940 0.342 A1 1 0 1 1 0.940 -0.342 Z;
                                M0 0 L1.000 0.000 A1 1 0 1 1 1.000  0.000 Z;
                                M0 0 L0.940 0.342 A1 1 0 1 1 0.940 -0.342 Z;
                                M0 0 L0.766 0.643 A1 1 0 1 1 0.766 -0.643 Z" />
                </path>
            </svg>
        </div>
    */
    let pacmanDiv = document.createElement('div')
    pacmanDiv.classList.add('pacman')

    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '-1.05 -1.05 2.1 2.1')

    let pacmanPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    pacmanPath.setAttribute('fill', 'yellow')
    pacmanPath.setAttribute('stroke', 'black')
    pacmanPath.setAttribute('stroke-width', '0.05')
    pacmanPath.setAttribute('d', '')

    let chompAnimation = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
    chompAnimation.setAttribute('attributeName', 'd')
    chompAnimation.setAttribute('dur', '0.5s')
    chompAnimation.setAttribute('repeatCount', 'indefinite')

    let mouthAngle = 40
    let numAngles = 2
    let deltaAngle = mouthAngle / numAngles

    // Start with middle of animation (closed mouth)
    let keyPointsStr = 'M0 0 L1.000 0.000 A1 1 0 1 1 1.000  0.000 Z;'
    for (let i = 1; i <= numAngles; i++) {
        let angleDeg = i*deltaAngle
        let x = Math.cos(angleDeg * Math.PI / 180)
        let y = Math.sin(angleDeg * Math.PI / 180)

        // Add angle both before and after current values
        keyPoint = `M0 0 L${x.toFixed(3)} ${y.toFixed(3)} A1 1 0 1 1 ${x.toFixed(3)} -${y.toFixed(3)} Z;`
        keyPointsStr = keyPoint + keyPointsStr
        keyPointsStr = keyPointsStr + keyPoint
    }
    chompAnimation.setAttribute('values', keyPointsStr)

    pacmanPath.appendChild(chompAnimation)
    svg.appendChild(pacmanPath)
    pacmanDiv.appendChild(svg)

    // Add random vertical position to pacman
    let top = Math.floor(Math.random() * 100)
    pacmanDiv.style.top = `${top}vh`

    // // Add pacman behind all other elements in body
    // document.body.insertBefore(pacmanDiv, document.body.firstChild)
    // Add pacman on top of all other elements in body
    document.body.appendChild(pacmanDiv)

    pacmanDiv.addEventListener('animationend', removePacman)
}

function addGhost() {
    console.log('Adding Ghost')

    // Ghost colors
    let ghostColorClasses = ['ghost-red',
        'ghost-blue',
        'ghost-orange',
        'ghost-cyan',
        'ghost-yellow-orange',
        'ghost-purple']

    let ghostColor = ghostColorClasses[Math.floor(Math.random() * ghostColorClasses.length)]

    // Ghost shape

    let numLegs = 3
    let bodyWidth = 1.5
    let ghostMargin = 0.25
    let ghostLeft = -1+ghostMargin
    let ghostRight = 1-ghostMargin
    let ghostTop = -1+ghostMargin

    let shoulderRadius = 0.75

    // Legs
    let footSize = 0.1
    let legGap = bodyWidth/numLegs
    let legHeight = legGap/2
    let legBottom = 1-ghostMargin
    let legTop = legBottom-legHeight

    // Body
    let ghostBodyPathStr = `M${ghostRight} ${legTop} L${ghostRight} ${ghostTop+shoulderRadius} `
    ghostBodyPathStr += `A ${shoulderRadius} ${shoulderRadius} 0 0 0 ${ghostRight-shoulderRadius} ${ghostTop} `
    ghostBodyPathStr += `L${ghostLeft+shoulderRadius} ${ghostTop} `
    ghostBodyPathStr += `A ${shoulderRadius} ${shoulderRadius} 0 0 0 ${ghostLeft} ${ghostTop+shoulderRadius} `
    ghostBodyPathStr += `L${ghostLeft} ${legTop} `

    // Legs

    ghostLegs1 = `L${ghostLeft} ${legBottom} L${ghostLeft+footSize/2} ${legBottom} L${ghostLeft+legGap/2} ${legTop} L${ghostLeft+legGap-footSize/2} ${legBottom} L${ghostLeft+legGap+footSize/2} ${legBottom} L0 ${legTop} L${ghostLeft+2*legGap-footSize/2} ${legBottom} L${ghostLeft+2*legGap+footSize/2} ${legBottom} L${ghostRight-legGap/2} ${legTop} L${ghostRight-footSize/2} ${legBottom} L${ghostRight} ${legBottom} `

    ghostLegs2 = `L${ghostLeft+legGap/2-footSize/2} ${legBottom} L${ghostLeft+legGap/2+footSize/2} ${legBottom} L${ghostLeft+legGap} ${legTop} L${0-footSize/2} ${legBottom} L${0+footSize/2} ${legBottom} L${ghostRight-legGap} ${legTop} L${ghostRight-legGap/2-footSize/2} ${legBottom} L${ghostRight-legGap/2+footSize/2} ${legBottom} `

    let ghostWalk1 = ghostBodyPathStr + ghostLegs1 + 'Z'
    let ghostWalk2 = ghostBodyPathStr + ghostLegs2 + 'Z'

    let ghostDiv = document.createElement('div')
    ghostDiv.classList.add('pacman')

    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '-1.05 -1.05 2.1 2.1')

    let ghostBody = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    ghostBody.setAttribute('stroke', 'black')
    ghostBody.setAttribute('stroke-width', '0.05')
    ghostBody.setAttribute('stroke-linejoin', 'round')
    ghostBody.classList.add(ghostColor)

    // // Not animated
    // ghostPath.setAttribute('d', ghostWalk1)

    let walkAnimation = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
    walkAnimation.setAttribute('attributeName', 'd')
    walkAnimation.setAttribute('dur', '0.3s')
    walkAnimation.setAttribute('repeatCount', 'indefinite')

    let keyPointsStr = ghostWalk1 + ';' + ghostWalk2
    walkAnimation.setAttribute('values', keyPointsStr)

    ghostBody.appendChild(walkAnimation)
    svg.appendChild(ghostBody)


    // Eyes

    let dir = 'East'

    let eyeOffsetX = 0.27
    let eyeOffsetY = 0.15
    let eyeRadiusX = 0.2
    let eyeRadiusY = 0.28
    let pupilRadius = 0.12
    let eyeShift = 0.24

    let eyeColor = 'white'
    let pupilColor = 'black'

    let dx = 0
    let dy = 0

    if (dir == 'North') {
        dy = -eyeShift
    }
    else if (dir == 'South') {
        dy = eyeShift
    }
    else if (dir == 'East') {
        dx = eyeShift
    }
    else if (dir == 'West') {
        dx = -eyeShift
    }

    let leftEye = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')
    leftEye.setAttribute('cx', `${-eyeOffsetX+dx/1.5}`)
    leftEye.setAttribute('cy', `${-eyeOffsetY+dy/1.5}`)
    leftEye.setAttribute('rx', eyeRadiusX)
    leftEye.setAttribute('ry', eyeRadiusY)
    leftEye.setAttribute('fill', eyeColor)

    let rightEye = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')
    rightEye.setAttribute('cx', `${eyeOffsetX+dx/1.5}`)
    rightEye.setAttribute('cy', `${-eyeOffsetY+dy/1.5}`)
    rightEye.setAttribute('rx', eyeRadiusX)
    rightEye.setAttribute('ry', eyeRadiusY)
    rightEye.setAttribute('fill', eyeColor)
    // rightEye.setAttribute('stroke', eyeColor)

    let leftPupil = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    leftPupil.setAttribute('cx', `${-eyeOffsetX+dx}`)
    leftPupil.setAttribute('cy', `${-eyeOffsetY+dy}`)
    leftPupil.setAttribute('r', pupilRadius)
    leftPupil.setAttribute('fill', pupilColor)
    // leftPupil.setAttribute('stroke', pupilColor)

    let rightPupil = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    rightPupil.setAttribute('cx', `${eyeOffsetX+dx}`)
    rightPupil.setAttribute('cy', `${-eyeOffsetY+dy}`)
    rightPupil.setAttribute('r', pupilRadius)
    rightPupil.setAttribute('fill', pupilColor)
    // rightPupil.setAttribute('stroke', pupilColor)

    svg.appendChild(leftEye)
    svg.appendChild(rightEye)
    svg.appendChild(leftPupil)
    svg.appendChild(rightPupil)

    ghostDiv.appendChild(svg)

    // Add random vertical position to ghost
    let top = Math.floor(Math.random() * 100)
    ghostDiv.style.top = `${top}vh`

    // // Add ghost behind all other elements in body
    // document.body.insertBefore(ghostDiv, document.body.firstChild)
    // Add ghost on top of all other elements in body
    document.body.appendChild(ghostDiv)

    ghostDiv.addEventListener('animationend', removeGhost)
}

function removePacman() {
    console.log('Removing Pacman')
    let pacmanDiv = document.querySelector('.pacman')
    if (pacmanDiv) {
        pacmanDiv.remove()
    }

    setTimeout(addGhost, getRandomIntervalTime())
}

function removeGhost() {
    console.log('Removing Ghost')
    let ghostDiv = document.querySelector('.pacman')
    if (ghostDiv) {
        ghostDiv.remove()
    }

    setTimeout(addPacman, getRandomIntervalTime())
}
