---
layout: default
permalink: /personal-info
title: personal info
excerpt: "your personal information"
author_profile: false
nav: false
og_image: /assets/img/cool_bunny.jpg
remove_dead_pixel: false
silly: true
---


# (your) personal information

<div>
    <span>ip address:</span>
    <span id="ip-address"
       style="color:var(--success);background-color:var(--global-code-bg-color);border-radius:3px;padding:3px 3px;font-family:Consolas"
    ></span>
</div>



<button onclick="getLocation()">Try It</button>

<p id="demo"></p>


<script>
    document.addEventListener("DOMContentLoaded", function() {
        fetch("https://api.ipify.org/?format=json")
            .then(response => response.json())
            .then(data => {
                document.getElementById("ip-address").textContent = data.ip;
            })
            .catch(error => {
                    document.getElementById("ip-address").textContent = "well hidden";
            });
    });
</script>



<script>
const x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(success, error);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
    
function success(position) {
    x.innerHTML="Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
}

function error(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}
</script>