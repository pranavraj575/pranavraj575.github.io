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
    <button id="EVIL_BUTTON" class="button button5" 
    style="background-color:RED;border:black;color:black;padding:30px;
        text-align:center;text-decoration: none; 
        display: inline-block; font-size: 16px;
        margin: 4px 2px;border-radius:100%;
        position:relative;left:50%;-ms-transform:translate(-50%, 0%);transform:translate(-50%, 0%);
        font-size:69px"
    onclick="REDBUTTON()"
    >
    <b>CLICK<br>THIS</b></button>
</div>
<div id="HORSE_CODE" style="font-size:31px;text-align:center">
</div>

<div reveal-counter="3" class="reveal-after-secrets">
    <a href="/">
        <button class="button button5" 
        style="background-color:GREEN;border:black;color:black;padding:30px;
        text-align:center;text-decoration: none; 
        display: inline-block; font-size: 16px;
        margin: 4px 2px;border-radius:100%;
        position:relative;left:50%;-ms-transform:translate(-50%, 0%);transform:translate(-50%, 0%);
        font-size:69px"
        >
        <b>GO<br>HOME</b></button>
    </a>
</div>

<script>
    base_delay = 80;
    let format_horse_code = (thing) => {
      return thing;
    }
    let REVEAL = (thing, stuff, i=0) => { 
        if (thing.length==i){
            // lock according to delay instead of at end of string
            // BUTTLOCK=false; 
            return 0;
        }
        c = thing[i];
        delay = 0;
        if(c=='.'){delay = 2*base_delay;}
        else if(c=='-'){delay=4*base_delay;}
        else{
            c='&nbsp;';
            delay=16*base_delay;
            if(thing.length>1 && !(thing[1]=='.' || thing[1]=='-')){delay+=16*base_delay;}
        }
        stuff.innerHTML = format_horse_code(thing.slice(0, i+1));
        setTimeout(() => {
            REVEAL(thing,stuff,i+1);
        }, delay);
    };
    BUTT_CLICKED=false;
    BUTTLOCK=false;
    let REDBUTTON = () => {
        if(BUTT_CLICKED){
             window.location.href = "/infinite-loop";
        }
        
        const butt = document.getElementById("EVIL_BUTTON");
        butt.innerHTML="<b>DON'T<br>CLICK</b>";
        
        // lock clicking the button for a bit, as opposed to locking at end of message
        if(BUTTLOCK){return 0;}
        BUTTLOCK=true;
        setTimeout(() => {BUTTLOCK=false;BUTT_CLICKED=true;}, 420);

        plAudio("/assets/audio/I-.-.I.-..I..I-.-.I-.-II-I....I.II-..I.I.-I-..II.--.I..I-..-I.I.-..II.mp3")
        code="-.-.I.-..I..I-.-.I-.-II-I....I.II-..I.I.-I-..II.--.I..I-..-I.I.-..";
        code = code.replaceAll("I"," ");
        const stuff = document.getElementById("HORSE_CODE");
        stuff.innerHTML = "";
        REVEAL(code, stuff);
    };
</script>
