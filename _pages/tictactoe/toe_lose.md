---
layout: default
permalink: /toe/lose
title: tictactoe
excerpt: "you failed"
author_profile: false
nav: false
og_image: /assets/img/cool_bunny.jpg
remove_dead_pixel: false
silly: true
---

you lost :(

<span style="color:var(--success)">W</span>-T-<span style="color:var(--danger)">L</span>: 
<span id="record-wins" style="color:var(--success)"></span>-<span id="record-ties"></span>-<span id="record-losses" style="color:var(--danger)"></span>

<a href="/toe">try again<a>

<span class="hide-after-toe-score" toe-reveal-counter="-.5">youre not very good at this</span>

<span class="reveal-after-toe-games" toe-reveal-counter="6" style="display:inline-block;">your goal should be to get to the win screen</span><span class="reveal-after-toe-games" toe-reveal-counter="9" style="display:inline-block;">, not to win</span>

<span class="reveal-after-toe-losses" toe-reveal-counter="69">just give up</span>

<script>
  document.addEventListener("DOMContentLoaded", function() {toeRevealForFree();});
</script>

<script>pasteToeRecord();</script>