---
layout: default
permalink: /CLICK-THE-BUTTON
title: click the button
excerpt: "click it"
author_profile: false
nav: false
og_image: /assets/img/cool_bunny.jpg
remove_dead_pixel: false
silly: true
---

<div>
    <button class="button button5" 
    style="background-color:RED;border: none;color:black;padding: 20px;text-align:center;text-decoration: none; display: inline-block; font-size: 16px;margin: 4px 2px;border-radius:100%"
    onclick="REDBUTTON()"
    >CLICK THIS</button>
</div>
<div id="HORSE_CODE">
</div>


<script>
    let REDBUTTON = () => {
        plAudio("/assets/audio/I-.-.I.-..I..I-.-.I-.-II-I....I.II-..I.I.-I-..II.--.I..I-..-I.I.-..II.mp3")
        code="-.-.I.-..I..I-.-.I-.-II-I....I.II-..I.I.-I-..II.--.I..I-..-I.I.-..";
        const stuff = document.getElementById("HORSE_CODE");
        for (var c of code){
            if(c=='.'){}
            else if(c=='-'){}
            else{c=' ';}
            stuff.textContent = stuff.textContent+c;
        }
    };
</script>