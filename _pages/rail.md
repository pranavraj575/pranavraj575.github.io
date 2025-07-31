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

{% assign hidden_style = "color:var(--global-bg-color)-webkit-user-select:none;-ms-user-select:none;user-select:none;" %}

{% assign head = "Nothing to see here" | split: "" %}
<h1>{% for h in head %}<span class="unseen" style="{{ hidden_style }}">{{ h }}</span>{% endfor %}</h1>
{% assign head = "thing to see here" | split: "" %}
<div>
  {% for h in head %}<span class="unseen" style="{{ hidden_style }}">{{ h }}</span>{% endfor %}
</div>


<script>
  var all_unseen = document.getElementsByClassName("unseen");
  for (var i = 0; i < all_unseen.length; i++) {
    all_unseen[i].addEventListener("mouseover", function() {
      this.style.color="var(--global-text-color)";
    });
  }
</script>
