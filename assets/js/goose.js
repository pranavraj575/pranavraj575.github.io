
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

// beauty will be revealed
// label something silly-goose if it is only revealed when all secrets found
// label something serious-goose if it is only hidden when all secrets found
// label something reveal-at-<num> if it is revealed after finding <num> secrets
// label something hide-at-<num> if it is hidden after finding <num> secrets
// silly-goose and serious-goose are equivalent to reveal-at-<numSecrets> and hide-at-<numSecrets>
// if something is labeled reveal-at-<a> and hide-at-<b>, (note, a<b)
//  it will be hidden with secrets < a, revealed at a<= secrets < b, and hidden with secrets>=b

let markObjectReveal = (elem_tre) => {
  elem_tre.classList.remove("temp-hide");
  elem_tre.classList.add("temp-reveal");
}
let markObjectHide = (elem_tre) => {
  elem_tre.classList.remove("temp-reveal");
  elem_tre.classList.add("temp-hide");
}

let gooseActivation = () => {
  var secrets_found = determineStepsFound();
  for (var secrets=0; secrets <= numSecrets; secrets++){
    // iterate through everything that is revealed after a certian number of secrets
    var silly_geese = document.getElementsByClassName("reveal-at-"+String(secrets));
    // iterate through everything that is hidden after a certian number of secrets
    var serious_geese = document.getElementsByClassName("hide-at-"+String(secrets));

    for (var i = 0; i < silly_geese.length; i++) {
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
      if(secrets <= secrets_found){
        // if the number of secrets found is at least the number of secrets needed, we will hide serious_geese[i]
        markObjectHide(serious_geese[i]);
      }
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
  var hiddening = document.getElementsByClassName("temp-hide");
  for (var i = hiddening.length - 1; i >= 0; i--) {
    hiddening[i].style.display = "none";
    hiddening[i].classList.remove("temp-hide");
  }
  var revealing = document.getElementsByClassName("temp-reveal");
  for (var i = revealing.length - 1; i >= 0; i--) {
    revealing[i].style.display = "block";
    revealing[i].classList.remove("temp-reveal");
  }
};


let initGoose = () => {
  let steps = determineStepsFound();
  setStepsFound(steps);
};
