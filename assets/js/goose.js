
// Change the goose setting and apply the goose.
let setGooseSetting = (gooseSetting) => {
  localStorage.setItem("goose", gooseSetting);

  document.documentElement.setAttribute("goose-setting", gooseSetting);
  gooseActivation();
};

// Set the number of steps found, apply goose
let setStepsFound = (steps) => {
  localStorage.setItem("secrets", String(steps));

  document.documentElement.setAttribute("secrets-found", String(steps));
  let gooseSetting = determineGooseSetting(steps);
  setGooseSetting(gooseSetting);
};

// Set steps found to max(stored steps found,steps), apply goose
let increaseStepsTo = (steps) => {
  if (determineStepsFound() < steps){
    setStepsFound(steps);
  }
  // quack no matter what
  plAudio("/assets/audio/quack.mp3");
};

let numSecrets = 4;

// Determine the goose state
let determineGooseSetting = (steps) => {
  if (steps >= numSecrets) {
    return "silly";
  }
  else{
    return "serious";
  }
};

let determineStepsFound = () => {
  let steps = localStorage.getItem("secrets");
  if (typeof(steps) == "string") {
    return parseInt(steps);
  }
  else {
    return 0;
  }
};

let determineToeRecord = () => {
  let loss_stored = localStorage.getItem("toe_losses");
  let tie_stored = localStorage.getItem("toe_ties");
  let wins_stored = localStorage.getItem("toe_wins");

  var losses = 0;
  var ties = 0;
  var wins = 0;
  if (typeof(loss_stored) == "string") {
    losses = parseInt(loss_stored);
  }
  if (typeof(tie_stored) == "string") {
    ties = parseInt(tie_stored);
  }
  if (typeof(wins_stored) == "string") {
    wins = parseInt(wins_stored);
  }
  return [losses, ties, wins, losses+ties+wins,(wins-losses)/Math.max(1, wins+ties+losses)]
};
let toeGameResult = (lost=false, tied=false, won=false) => {
  var arrg = determineToeRecord();
  var losses = arrg[0];
  var ties = arrg[1];
  var wins = arrg[2];
  if (tied){
    ties++;
  }
  if (lost){
    losses++;
  }
  if (won){
    wins++;
  }
  localStorage.setItem("toe_losses", String(losses));
  localStorage.setItem("toe_ties", String(ties));
  localStorage.setItem("toe_wins", String(wins));
};

let toeRevealForFree = () => {
  var arrg = determineToeRecord();
  for (var k=0;k<5;k++){
    var thingy=["losses","ties","wins","games","score"][k];
    var cnt=arrg[k];
    stuff = document.getElementsByClassName("reveal-after-toe-"+thingy);
    for (var i=0;i<stuff.length;i++){
      thing=stuff[i];
      target=parseFloat(thing.getAttribute("toe-reveal-counter"));
      if(cnt>=target){
        markObjectReveal(thing);
      }
      else{
        markObjectHide(thing);
      }
    }
    unstuff = document.getElementsByClassName("hide-after-toe-"+thingy);
    for (var i=0;i<unstuff.length;i++){
      thing=unstuff[i];
      target=parseFloat(thing.getAttribute("toe-reveal-counter"));
      if(cnt>=target){
        markObjectHide(thing);
      }
      else{
        markObjectReveal(thing);
      }
    }
    hide_and_reveal();
  }
};
let pasteToeRecord = () => {
  document.addEventListener("DOMContentLoaded", function() {
    const losses = document.getElementById("record-losses");
    const ties = document.getElementById("record-ties");
    const wins = document.getElementById("record-wins");
    var arrg = determineToeRecord();
    losses.textContent=arrg[0];
    ties.textContent=arrg[1];
    wins.textContent=arrg[2];
  });
};

// beauty will be revealed
// label something silly-goose if it is only revealed when all secrets found
// label something serious-goose if it is only hidden when all secrets found
// label reveal-after-secrets with attribute reveal-counter="<num>" if it is revealed after finding <num> secrets
// label hide-after-secrets with attribute hide-counter="<num>" if it is hidden after finding <num> secrets
// silly-goose and serious-goose are equivalent to reveal-counter="<numSecrets>" and hide-counter="<numSecrets>"
// if something is revealed at a and hidden at b (note, a<b)
//  it will be hidden with secrets < a, revealed at a<= secrets < b, and hidden with secrets>=b

// reveal is weaker
let markObjectReveal = (elem_tre) => {
  if (!elem_tre.classList.contains("temp-hide")){
    elem_tre.classList.add("temp-reveal");
  }
}
// hide is stronger
let markObjectHide = (elem_tre) => {
  elem_tre.classList.remove("temp-reveal");
  elem_tre.classList.add("temp-hide");
}

// hiding is stronger, is something is marked to be hid, it always will be
let hide_and_reveal = () => {
  var revealing = document.getElementsByClassName("temp-reveal");
  for (var i = revealing.length - 1; i >= 0; i--) {
    if (revealing[i].classList.contains("notlight")){
        revealing[i].classList.add("spotlight");
        revealing[i].classList.remove("notlight");
    }
    var disp = "inherit";
    for (var type_style of ["block", "inline-block", "table-row"]){
        if (revealing[i].classList.contains("display-style-"+type_style)){
           disp = type_style;
        }
    }
    revealing[i].style.display = disp;
    revealing[i].classList.remove("temp-reveal");
  }

  var hiddening = document.getElementsByClassName("temp-hide");
  for (var i = hiddening.length - 1; i >= 0; i--) {
    // toggle whether images are shown as well
    // ORDER MATTERS, once element is removed from classlist, hiddening[i] is null
    if (hiddening[i].classList.contains("spotlight")){
        hiddening[i].classList.add("notlight");
        hiddening[i].classList.remove("spotlight");
    }
    if (hiddening[i].style.display){
        hiddening[i].classList.add("display-style-"+hiddening[i].style.display)
    }
    hiddening[i].style.display = "none";
    hiddening[i].classList.remove("temp-hide");
  }
};
// note that hiding is stronger, if we mark an object as both hide and reveal, it will be hidden
// if we want to hide an object unless a value is in a certian range, this is easy
//  (hide if less than a, reveal if greater; hide if greater than b, reveal if less) -> reveals only if between a and b
//  hiding only in a certian range is harder, will need to make two copies
let gooseActivation = () => {
  var secrets_found = determineStepsFound();
  var silly_geese = document.getElementsByClassName("reveal-after-secrets");
  var serious_geese = document.getElementsByClassName("hide-after-secrets");
  for (var i = 0; i < silly_geese.length; i++) {
    secrets=parseInt(silly_geese[i].getAttribute("reveal-counter"));
    if(secrets <= secrets_found){
      // if the number of secrets found is at least the number of secrets needed, we will reveal silly_geese[i]
      markObjectReveal(silly_geese[i]);
    }
    else{
      // otherwise, we must hide this goose
      markObjectHide(silly_geese[i]);
    }
  }
  for (var i = 0; i < serious_geese.length; i++) {
    secrets=parseInt(serious_geese[i].getAttribute("hide-counter"));
    if(secrets <= secrets_found){
      // if the number of secrets found is at least the number of secrets needed, we will hide serious_geese[i]
      markObjectHide(serious_geese[i]);
    }
    else{
      // otherwise, we will reveal this goose
      markObjectReveal(serious_geese[i]);
    }
  }

  var silly_geese = document.getElementsByClassName("silly-goose");
  var goose_setting = document.documentElement.getAttribute("goose-setting");
  var serious_geese = document.getElementsByClassName("serious-goose");

  for (var i = 0; i < silly_geese.length; i++) {
    if (goose_setting == "silly"){
      markObjectReveal(silly_geese[i]);
    } else {
      markObjectHide(silly_geese[i]);
    }
  }
  for (var i = 0; i < serious_geese.length; i++) {
    if (goose_setting == "silly"){
      markObjectHide(serious_geese[i]);
    } else {
      markObjectReveal(serious_geese[i]);
    }
  }
  hide_and_reveal();
};


let initGoose = () => {
  let steps = determineStepsFound();
  setStepsFound(steps);
};

let themeThemedStuff = (theme) => {
  stuff = document.getElementsByClassName("only-dark-theme");
  for (var i=0;i<stuff.length;i++){
    thing = stuff[i];
    if(theme == 'dark'){
      markObjectReveal(thing);
    }
    else{
      markObjectHide(thing);
    }
  }
  unstuff = document.getElementsByClassName("non-dark-theme");
  for (var i=0;i<unstuff.length;i++){
    thing=unstuff[i];
    if(theme == 'dark'){
      markObjectHide(thing);
    }
    else{
      markObjectReveal(thing);
    }
  }
  hide_and_reveal();
};


let permute_children_help = (element) => {
  indices=[];
  for (i=0;i<element.childElementCount;i++){
    indices.push(i);
  }
  inner_htmls=[];
  for (i=0;i<element.childElementCount;i++){
    random_idx=indices.splice(Math.floor(Math.random()*indices.length),1)[0];
    inner_htmls.push(element.children[random_idx].innerHTML);
  }

  for (i=0;i<element.childElementCount;i++){
    element.children[i].innerHTML=inner_htmls[i];
  }
}

let permute_children = (element, repeat_after=-1) => {
  permute_children_help(element);
  if (repeat_after >= 0){
    setTimeout(function(){permute_children(element,repeat_after=repeat_after)}, repeat_after);
  }
}
