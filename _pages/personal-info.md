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
       style="color:var(--global-theme-color);background-color:var(--global-code-bg-color);border-radius:3px;padding:3px 3px;font-family:Consolas"
    ></span>
</div>
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
