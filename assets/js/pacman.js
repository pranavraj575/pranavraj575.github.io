let pacminIntervalSec = 69
let pacmaxIntervalSec = 200

function getRandomIntervalTime() {
    let randTimeMillisec = Math.floor(((pacmaxIntervalSec-pacminIntervalSec)*Math.random()+pacminIntervalSec)*1000)
    return randTimeMillisec
}

function getRandomDirection() {
    let dirs = ['east','north','west','south'];
    return dirs[Math.floor(Math.random() * dirs.length)]
}

//common code in ghost and pacman
function getAgentDiv(dir='east', respawn=false){
    let agentDiv = document.createElement('div')
    agentDiv.classList.add('pacman')
    if (respawn){
      agentDiv.classList.add('respawn');
    }

    // Add random position
    // also add animation

    let prop = Math.floor(Math.random() * 100)
    if (dir=='east'){
        agentDiv.style.top = `${prop}vh`
    }
    else if (dir=='north'){
        agentDiv.style.left = `${prop}vw`
    }
    else if (dir=='west'){
        agentDiv.style.top = `${prop}vh`
    }
    else {
        agentDiv.style.left = `${prop}vw`
    }
    agentDiv.style.animation = "pacman-peaking-"+dir+" 20s linear"
    agentDiv.setAttribute("onclick", "window.location.href = 'https://pacmanonline.org/game';")
    return agentDiv
}

function addPacman(respawn=false) {
    let dir = getRandomDirection()
    let pacmanDiv = getAgentDiv(dir,respawn=respawn)
    if (dir == 'north') {
        pacmanDiv.style.transform='matrix(0,-1,1,0,0,0)'
    }
    else if (dir == 'south') {
        pacmanDiv.style.transform='matrix(0,1,1,0,0,0)'
    }
    else if (dir == 'east') {
        pacmanDiv.style.transform='matrix(1,0,0,1,0,0)'
    }
    else if (dir == 'west') {
        pacmanDiv.style.transform='matrix(-1,0,0,1,0,0)'
    }

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

    addAgenttoDoc(pacmanDiv);

    pacmanDiv.addEventListener('animationend', removePacguy)
}

function addGhost(respawn=false) {
    // Ghost colors
    let ghostColorClasses = [
        'ghost-red',
        'ghost-blue',
        'ghost-orange',
        'ghost-cyan',
        'ghost-yellow-orange',
        'ghost-purple',
        'ghost-spooked',
        ]

    let ghostColor = ghostColorClasses[Math.floor(Math.random() * ghostColorClasses.length)]
    let dir = getRandomDirection()
    let ghostDiv = getAgentDiv(dir,respawn=respawn)
    let spooked = (ghostColor == 'ghost-spooked')
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
    let eyeOffsetX = 0.27
    let eyeOffsetY = 0.15
    let eyeRadiusX = 0.2
    let eyeRadiusY = 0.28
    let pupilRadius = 0.12
    let eyeShift = 0.24

    let eyeColor = 'white'
    let pupilColor = 'black'

    // mouth
    let mouthHeight=legHeight/2
    let mouthBottom=(eyeOffsetY+legBottom)/2 - mouthHeight/2
    let mouthTop=mouthBottom-mouthHeight
    let mouthScale=0.8
    if (spooked){
        pupilColor="#fab9b0";
        eyeRadiusX=0;
        eyeRadiusY=0;
        eyeShift = 0;
        let mouth = document.createElementNS('http://www.w3.org/2000/svg', 'path')

        let coords = `M ${ghostLeft*mouthScale} ${mouthBottom}`;
        coords += ` L ${(ghostLeft+legGap/2)*mouthScale} ${mouthTop}`;
        coords += ` L ${(ghostLeft+legGap)*mouthScale} ${mouthBottom}`;
        coords += ` L 0 ${mouthTop}`;
        coords += ` L ${(ghostLeft+2*legGap)*mouthScale} ${mouthBottom}`;
        coords += ` L ${(ghostRight-legGap/2)*mouthScale} ${mouthTop} `;
        coords += ` L ${(ghostRight)*mouthScale} ${mouthBottom}`;

        mouth.setAttribute('stroke', pupilColor)
        mouth.setAttribute('stroke-width', '.069')
        mouth.setAttribute('d', coords);

        mouth.setAttribute('fill', "none");
        svg.appendChild(mouth)
    }

    let dx = 0
    let dy = 0

    if (dir == 'north') {
        dy = -eyeShift
    }
    else if (dir == 'south') {
        dy = eyeShift
    }
    else if (dir == 'east') {
        dx = eyeShift
    }
    else if (dir == 'west') {
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

    svg.appendChild(leftEye)
    svg.appendChild(rightEye)
    svg.appendChild(leftPupil)
    svg.appendChild(rightPupil)

    ghostDiv.appendChild(svg)

    addAgenttoDoc(ghostDiv);

    ghostDiv.addEventListener('animationend', removePacguy)
}

function addAgenttoDoc(agentDiv){

    // // Add agent behind all other elements in body
    // document.body.insertBefore(agentDiv, document.body.firstChild)
    // Add agent on top of all other elements in body
    document.body.appendChild(agentDiv)
}

function removePacguy(){
  if (this.classList.contains('respawn')){
    addPacguy(respawn=true, delay=true);
  }
  this.remove();
}

function addPacguy(respawn=false,delay=false){
  if (delay){
    setTimeout(function(){addPacguy(respawn=respawn,delay=false)}, getRandomIntervalTime())
  }
  else{
    if (Math.random()<0.042069){
      addPacman(respawn);
    }
    else{
      addGhost(respawn);
    }
  }
}


function addAsteroid(respawn=false,delay=false){
  if (delay){
    setTimeout(function(){addAsteroid(respawn=respawn,delay=false)}, getRandomIntervalTime());
  }
  else{
    Aster();
    addAsteroid(respawn=respawn,delay=true);
  }
}


function Aster() {
  let asteroid=document.createElement('div');
  let aaa = document.createElement('a');
  aaa.href="/assteroids";
  time=3000+Math.random()*3000;
  aster=Math.floor(Math.random()*5);
  // chooses uniformly at random between asteroid0.png, asteroid1.png, asteroid2.png,asteroid3.png, asteroid4.png
  // also adds asteroid0_dark.png, asteroid1_dark.png, asteroid2_dark.png,asteroid3_dark.png, asteroid4_dark.png

  asteroid.style.position="fixed";
  x_pos=[-10,110];
  y_pos=[-10,110];
  dm=Math.floor(Math.random()*2);
  arr= [x_pos,y_pos][dm];
  arr[0]=Math.random()*100;
  arr[1]=Math.random()*100;
  if (Math.random()<.5){
    arr=[x_pos,y_pos][1-dm];
    arr[0]=110;
    arr[1]=-10;
  }

  asteroid.style.top="-100%";
  asteroid.style.left="-100%";
  asteroid.style.transform="translate(-50%, -50%)";

  anim=asteroid.animate(
    [
      {
        top:y_pos[0]+"%",
        left:x_pos[0]+"%",
      },
      {
        top:y_pos[1]+"%",
        left:x_pos[1]+"%",
      },
    ],
    time,
  );
  anim.addEventListener('finish', function(){asteroid.remove();})
  wdth=69+Math.random()*131
  asteroid_img = document.createElement('img');
  asteroid_img.src="/assets/img/stuff/asteroid"+aster+".png";
  asteroid_img.classList.add("only-dark-theme");
  asteroid_img.style.width=wdth+"px";
  aaa.appendChild(asteroid_img);

  asteroid_img = document.createElement('img');
  asteroid_img.src="/assets/img/stuff/asteroid"+aster+"_dark.png";
  asteroid_img.classList.add("non-dark-theme");
  asteroid_img.style.width=wdth+"px";
  aaa.appendChild(asteroid_img);

  asteroid.appendChild(aaa);

  document.body.appendChild(asteroid);
  applyTheme();
}
