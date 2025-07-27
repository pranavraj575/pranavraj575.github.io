---
layout: default
permalink: /personal-info
title: personal info
excerpt: "personal information"
author_profile: false
nav: false
og_image: /assets/img/cool_bunny.jpg
remove_dead_pixel: false
silly: true
---


# personal information

<h3>Public IP Address of user is:</h3>
<p id="ip-address"></p>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        fetch("https://api.ipify.org/?format=json")
            .then(response => response.json())
            .then(data => {
                document.getElementById("ip-address").textContent = data.ip;
            })
            .catch(error => {
                console.error("Error fetching IP address:", error);
            });
    });
</script>
