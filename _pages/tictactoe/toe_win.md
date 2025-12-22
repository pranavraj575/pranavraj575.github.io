---
layout: default
permalink: /toe/win
title: tictactoe
excerpt: "you cheated???"
author_profile: false
nav: false
og_image: /assets/img/cool_bunny.jpg
remove_dead_pixel: false
silly: true
redirect_from: 
  - /toe/won
---

you won :)

how did you get here

<a href="/">go home</a>

<span style="color:var(--success)">W</span>-T-<span style="color:var(--danger)">L</span>: 
<span id="record-wins" style="color:var(--success)"></span>-<span id="record-ties"></span>-<span id="record-losses" style="color:var(--danger)"></span>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        increaseStepsTo(4);
    });
    document.addEventListener("click", function() {
        increaseStepsTo(4);
    });
</script>

<script>
  document.addEventListener("DOMContentLoaded", function() {toeRevealForFree();});
</script>


<script>
  document.addEventListener("DOMContentLoaded", function() {
    const losses = document.getElementById("record-losses");
    const ties = document.getElementById("record-ties");
    const wins = document.getElementById("record-wins");
    var arrg = determineToeRecord();
    losses.textContent=arrg[0];
    ties.textContent=arrg[1];
    wins.textContent=arrg[2];
  });
</script>