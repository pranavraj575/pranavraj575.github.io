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

{% assign cool_codey_style = "color:var(--success);background-color:var(--global-code-bg-color);border-radius:3px;padding:3px 3px;padding-bottom:0px;font-family:Courier,Courier New,Monospace" %}

<div>
    <span>ipv4 address:</span>
    <span id="ipv4-address"
       style="{{ cool_codey_style }}"
    >thinking...</span>
</div>

<div>
    <span>ipv6 address:</span>
    <span id="ipv6-address"
       style="{{ cool_codey_style }}"
    >thinking...</span>
</div>


<div>
    <span>location (guess 1):</span>
    <span id="locator-hardly-know-her-v4"
       style="{{ cool_codey_style }}"
    >thinking...</span>
</div>

<div>
    <span>location (guess 2):</span>
    <span id="locator-hardly-know-her-v6"
       style="{{ cool_codey_style }}"
    >thinking...</span>
</div>

<div>
    <span>location (guess 3):</span>
    <span id="locator-hardly-know-her"
       style="{{ cool_codey_style }}"
    >thinking...</span>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        fetch("https://api.ipify.org/?format=json")
            .then(response => response.json())
            .then(data => {
                document.getElementById("ipv4-address").textContent = data.ip;
                jQuery(document).ready(function(){
                    jQuery.get("http://ipinfo.io/"+data.ip, function (response)
                               {
                                    var lats = response.loc.split(',')[0]; 
                                    var lngs = response.loc.split(',')[1];
                                    const x = document.getElementById("locator-hardly-know-her-v4");
                                    x.innerHTML= lats + ", " + lngs;            
                               }, "jsonp");
                }); 
            })
            .catch(error => {
                    document.getElementById("ipv4-address").textContent = "well hidden";
                    const x = document.getElementById("locator-hardly-know-her-v4").innerHTML="well hidden";
            });
    });
</script>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        fetch("https://api6.ipify.org/?format=json")
            .then(response => response.json())
            .then(data => {
                document.getElementById("ipv6-address").textContent = data.ip;
                jQuery(document).ready(function(){
                    jQuery.get("http://ipinfo.io/"+data.ip, function (response)
                               {
                                    var lats = response.loc.split(',')[0]; 
                                    var lngs = response.loc.split(',')[1];
                                    const x = document.getElementById("locator-hardly-know-her-v6");
                                    x.innerHTML= lats + ", " + lngs;            
                               }, "jsonp");
                }); 
            })
            .catch(error => {
                    document.getElementById("ipv6-address").textContent = "well hidden/nonexistent";
                    const x = document.getElementById("locator-hardly-know-her-v6").innerHTML="well hidden/nonexistent";
            });
    });
</script>




<script>
    document.addEventListener("DOMContentLoaded", function() {
        const x = document.getElementById("locator-hardly-know-her");
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(success, error);
        } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
        function success(position) {
            x.innerHTML= position.coords.latitude + ", " + position.coords.longitude;
        }
        function error(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                  x.innerHTML = "why did you deny that"
                  break;
                case error.POSITION_UNAVAILABLE:
                  x.innerHTML = "location unavailable."
                  break;
                case error.TIMEOUT:
                  x.innerHTML = "respond to the request coward"
                  break;
                case error.UNKNOWN_ERROR:
                  x.innerHTML = "An unknown error occurred."
                  break;
                }
            }
    });
</script>
