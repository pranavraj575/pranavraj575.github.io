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
    style="background-color:RED;border:black;color:black;padding:20px;
        text-align:center;text-decoration: none; 
        display: inline-block; font-size: 16px;
        margin: 4px 2px;border-radius:100%;
        font-size:69px"
    onclick="REDBUTTON()"
    >
    <b>CLICK<br>THIS</b></button>
</div>
<div id="HORSE_CODE" style="font-size:31px;">
</div>


<script>
    base_delay = 300;
    let REVEAL = (thing, stuff) => { 
        if (thing.length==0){BUTTLOCK=false;return 0;}
        c = thing[0];
        delay = 0;
        if(c=='.'){delay = base_delay;}
        else if(c=='-'){delay=3*base_delay;}
        else{
            c='&nbsp;';
            delay=3*base_delay;
            if(thing.length>1 && !(thing[1]=='.' || thing[1]=='-')){delay+=base_delay;}
        }
        stuff.innerHTML = stuff.innerHTML+c;
        setTimeout(() => {
            REVEAL(thing.substring(1),stuff);
        }, delay);
    };
    BUTTLOCK=false;
    let REDBUTTON = () => {
        if(BUTTLOCK){return 0;}
        BUTTLOCK=true;
        plAudio("/assets/audio/I-.-.I.-..I..I-.-.I-.-II-I....I.II-..I.I.-I-..II.--.I..I-..-I.I.-..II.mp3")
        code="-.-.I.-..I..I-.-.I-.-II-I....I.II-..I.I.-I-..II.--.I..I-..-I.I.-..";
        const stuff = document.getElementById("HORSE_CODE");
        stuff.textContent = "";
        REVEAL(code, stuff);
    };
</script>