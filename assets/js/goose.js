
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
  gooseActivation();
};

// Set steps found to max(stored steps found,steps), apply goose
let increaseStepsTo = (steps) => {
  if (determineStepsFound() < steps){
    setStepsFound(steps);
  }
};

// Determine the goose state
let determineGooseSetting = (steps) => {
  if (steps > 0) {
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
let gooseActivation = () => {
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
