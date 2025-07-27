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

<span>ip address:</span>
<!-- <p id="ip-address" style="color:var(--success)"></p> -->

<code id="ip-address" style="color:var(--success)"></code>
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
