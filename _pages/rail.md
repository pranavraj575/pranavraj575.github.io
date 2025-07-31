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


<h1><span class="unseen" style="color:var(--global-bg-color)">Nothing to see here</span></h1>
<div>
  <span class="unseen" style="color:var(--global-bg-color)">thing to see here</span><br>
  <span class="unseen" style="color:var(--global-bg-color)">thing to see here2</span>
</div>


<script>
  var all_unseen = document.getElementsByClassName("unseen");
  for (var i = 0; i < all_unseen.length; i++) {
    all_unseen[i].addEventListener("mouseover", function() {
      this.style.color="var(--global-text-color)";
    });
  }
</script>
