import { highlightSearchTerm } from "./highlight-search-term.js";

document.addEventListener("DOMContentLoaded", function () {
  // actual bibsearch logic
  const filterItems = (searchTerm) => {
    document.querySelectorAll(".bibliography, .unloaded").forEach((element) => element.classList.remove("unloaded"));

    // highlight-search-term
    if (CSS.highlights) {
      const nonMatchingElements = highlightSearchTerm({ search: searchTerm, selector: ".bibliography > li" });
      //if (nonMatchingElements == null) {
        //return;
      //}
      if (nonMatchingElements != null) {
        nonMatchingElements.forEach((element) => {
          element.classList.add("unloaded");
        });
      }
    } else {
      // Simply add unloaded class to all non-matching items if Browser does not support CSS highlights
      document.querySelectorAll(".bibliography > li").forEach((element, index) => {
        const text = element.innerText.toLowerCase();
        if (text.indexOf(searchTerm) == -1) {
          element.classList.add("unloaded");
        }
      });
    }
    // filter with the check boxes as well
    if(search_term){
      var filter_str="&#x2227;";
    } else{
      var filter_str="";
    }

    for (var filt_type of ["filterer-type", "filterer-venue", "filt-unioner"]){
      var filter_this_way=false;
      var stuff=document.getElementsByClassName(filt_type);
      for (var i=0;i<stuff.length;i++){
        if (stuff[i].checked){
          filter_this_way=true;
        }
      }
      if (filt_type=="filt-unioner"){
        filter_this_way=true;
      }
      if (filter_this_way){
        var additional_filter="";
        for (var i=0;i<stuff.length;i++){
          if (stuff[i].checked){
            additional_filter+=stuff[i].name + "&#x2228;";
          }
        }
        additional_filter=additional_filter.substring(0,additional_filter.length-8)
        filter_str+="("+additional_filter+")&#x2227;";

        document.querySelectorAll(".bibliography > li").forEach((element) => {element.classList.add("mark-unloaded")});
        document.getElementsByClassName(filt_type).forEach((element, index) => {
          if (element.checked){
            document.querySelectorAll(".bibliography > li").forEach((el, ix) => {
              if (filt_type=="filt-unioner"){
                if(el.querySelector("div").classList.contains("category-"+element.name.replace(" ","-"))){
                  el.classList.remove("mark-unloaded");
                }
              } else if(filt_type=="filterer-venue"){
                const abr=el.querySelector("abbr");
                if(abr!=null && abr.innerText==element.name){
                  el.classList.remove("mark-unloaded");
                }
              } else if(filt_type=="filterer-type") {
                for (var lnk of el.querySelectorAll(".links > a")){
                  if (lnk.innerText.toLowerCase()==element.name.toLowerCase()){
                    el.classList.remove("mark-unloaded");
                  }
                }
              }
            });
          }
        });

        document.getElementsByClassName("mark-unloaded").forEach((element) => {element.classList.add("unloaded");});
        document.querySelectorAll(".bibliography > li").forEach((element) => {element.classList.remove("mark-unloaded")});

        if (filt_type!="filt-unioner"){
          var a = document.getElementById(filt_type+"-title");
          a.innerText=a.innerText.replace("filter ", "filtering ")
        }
      } else{
        if (filt_type!="filt-unioner"){
          var a = document.getElementById(filt_type+"-title");
          a.innerText=a.innerText.replace("filtering ", "filter ")
        }
      }
    }
    filter_str=filter_str.substring(0,filter_str.length-8)
    document.getElementById("filter-string").innerText=filter_str;
    document.querySelectorAll("h2.bibliography").forEach(function (element) {
      let iterator = element.nextElementSibling; // get next sibling element after h2, which can be h3 or ol
      let hideFirstGroupingElement = true;
      // iterate until next group element (h2), which is already selected by the querySelectorAll(-).forEach(-)
      while (iterator && iterator.tagName !== "H2") {
        if (iterator.tagName === "OL") {
          const ol = iterator;
          const unloadedSiblings = ol.querySelectorAll(":scope > li.unloaded");
          const totalSiblings = ol.querySelectorAll(":scope > li");

          if (unloadedSiblings.length === totalSiblings.length) {
            ol.previousElementSibling.classList.add("unloaded"); // Add the '.unloaded' class to the previous grouping element (e.g. year)
            ol.classList.add("unloaded"); // Add the '.unloaded' class to the OL itself
          } else {
            hideFirstGroupingElement = false; // there is at least some visible entry, don't hide the first grouping element
          }
        }
        iterator = iterator.nextElementSibling;
      }
      // Add unloaded class to first grouping element (e.g. year) if no item left in this group
      if (hideFirstGroupingElement) {
        element.classList.add("unloaded");
      }
    });
  };

  const updateInputField = () => {
    const hashValue = decodeURIComponent(window.location.hash.substring(1)); // Remove the '#' character
    // document.getElementById("bibsearch").value = hashValue; // why do this?
    filterItems(document.getElementById("bibsearch").value);
  };

  // Sensitive search. Only start searching if there's been no input for 300 ms
  let timeoutId;
  document.getElementById("bibsearch").addEventListener("input", function () {
    clearTimeout(timeoutId); // Clear the previous timeout
    const searchTerm = this.value.toLowerCase();
    timeoutId = setTimeout(filterItems(searchTerm), 300);
  });

  document.getElementsByClassName("filter-span").forEach(function (element) {
    element.addEventListener("click", updateInputField);
  });

  window.addEventListener("hashchange", updateInputField); // Update the filter when the hash changes

  document.querySelectorAll(".filterer-venue").forEach((element) => {
    var bibs=document.querySelectorAll(".bibliography .unloaded > li, .bibliography > li");
    var keep=false;
    for (var bb of bibs){
      var abr=bb.querySelector("abbr");
      if(abr!=null && (abr.innerText==element.name || abr.innerText == " "+element.name+" ")){
        keep=true;
        break;
      }
    }
    if (!keep){
      element.parentElement.parentElement.style.display="none";
    }
  });

  updateInputField(); // Update filter when page loads
});
