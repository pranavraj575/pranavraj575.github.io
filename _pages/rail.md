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

{% assign hidden_style = "color:var(--global-bg-color);-webkit-user-select:none;-ms-user-select:none;user-select:none;" %}

{% assign head = "NOTHING TO SEE HERE" | split: "" %}
<h1>{% for h in head %}<span class="hidden_until_touch" style="{{ hidden_style }}">{{ h }}</span>{% endfor %}</h1>

{% assign head = "⠉⠇⠊⠉⠅⠀⠞⠓⠑⠀⠙⠑⠁⠙⠀⠏⠊⠭⠑⠇" | split: "" %}
<div>
  {% for h in head %}<span class="hidden_until_touch" style="{{ hidden_style }}">{{ h }}</span>{% endfor %}
</div>

{% assign head = "⠙⠕⠝⠄⠞⠀⠇⠕⠕⠅⠀⠊⠝⠞⠕⠀⠞⠓⠑⠀⠇⠊⠛⠓⠞" | split: "" %}
<div>
  {% for h in head %}<span class="hidden_until_touch" style="{{ hidden_style }}">{{ h }}</span>{% endfor %}
</div>

