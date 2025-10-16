---
layout: default
permalink: /empty-page
title: empty page
excerpt: "totally normal, nothing here"
author_profile: false
nav: false
og_image: /assets/img/cool_bunny.jpg
remove_dead_pixel: false
silly: true
---

<div class="reveal-at-1">
    {% assign head = "NOTHING TO SEE HERE" | split: "" %}
    <h1>
      {% for h in head %}<span class="hidden_until_touch">{{ h }}</span>{% endfor %}
    </h1>
    {% assign head = "⠎⠑⠁⠗⠉⠓⠀⠁⠃⠕⠍⠊⠝⠁⠞⠊⠕⠝⠀⠞⠓⠑⠍⠑" | split: "" %}
    <div>
      {% for h in head %}<span class="hidden_until_touch">{{ h }}</span>{% endfor %}
    </div>
    {% assign head = "⠙⠕⠝⠄⠞⠀⠇⠕⠕⠅⠀⠊⠝⠞⠕⠀⠞⠓⠑⠀⠇⠊⠛⠓⠞" | split: "" %}
    <div>
      {% for h in head %}<span class="hidden_until_touch">{{ h }}</span>{% endfor %}
    </div>
    <div class="reveal-at-2"><a href="/">⠛⠕ ⠓⠕⠍⠑</a></div>
    <!--  can just put this text in normally 
    {% assign head = "⠛⠕ ⠓⠕⠍⠑" | split: "" %}
    <div class="reveal-at-2">
      {% for h in head %}<span class="hidden_until_touch">{{ h }}</span>{% endfor %}
    </div>
    -->
</div>

