
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
};

let numSecrets = 2;

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
  else{
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

let gooseActivation = () => {
  var secrets_found = determineStepsFound();
  for (var secrets=0; secrets <= numSecrets; secrets++){
    // iterate through everything that is revealed after a certian number of secrets
    var silly_geese = document.getElementsByClassName("reveal-at-"+String(secrets));
    for (var i = 0; i < silly_geese.length; i++) {
      if(secrets <= secrets_found){
        // if the number of secrets found is at least the number of secrets needed, we will reveal silly_geese[i]
        silly_geese[i].style.display = "block";
      }
      else{
        // otherwise, we must hide this goose
        silly_geese[i].style.display = "none";
      }
    }

    // iterate through everything that is hidden after a certian number of secrets
    var serious_geese = document.getElementsByClassName("hide-at-"+String(secrets));
    for (var i = 0; i < serious_geese.length; i++) {
      if(secrets <= secrets_found){
        // if the number of secrets found is at least the number of secrets needed, we will hide serious_geese[i]
        serious_geese[i].style.display = "none";
      }
    }
  }

  var silly_geese = document.getElementsByClassName("silly-goose");
  var goose_setting = document.documentElement.getAttribute("goose-setting");

  for (var i = 0; i < silly_geese.length; i++) {
    if (goose_setting == "silly"){
      silly_geese[i].style.display = "block";
    } else {
      silly_geese[i].style.display = "none";
    }
  }
  var serious_geese = document.getElementsByClassName("serious-goose");
  for (var i = 0; i < serious_geese.length; i++) {
    if (goose_setting == "silly"){
      serious_geese[i].style.display = "none";
    } else {
      serious_geese[i].style.display = "block";
    }
  }
};


let initGoose = () => {
  let steps = determineStepsFound();
  setStepsFound(steps);
};
