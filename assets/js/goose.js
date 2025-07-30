// Has to be in the head tag, otherwise a flicker effect will occur.


// Change the goose setting and apply the goose.
let setGooseSetting = (gooseSetting) => {
  localStorage.setItem("goose", gooseSetting);

  document.documentElement.setAttribute("goose-setting", gooseSetting);
  gooseActivation();
};

// Determine the goose state
let determineGooseSetting = () => {
  let gooseSetting = localStorage.getItem("goose");
  if (gooseSetting != "silly") {
    gooseSetting = "serious";
  }
  return gooseSetting;
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
  let gooseSetting = determineGooseSetting();
  setGooseSetting(gooseSetting);
};
