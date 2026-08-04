---
layout: default
permalink: /comment-section
title: comment section
date: 2025-04-20 04:20:00-0400
description: comment section
tags: 
categories: 
silly: true
giscus_comments: true
---

# comment section
<div>
    {% if site.giscus and page.giscus_comments %}
        {% include giscus.liquid %}
    {% endif %}
</div>

<script>
  var clear_giscus = setInterval(function(){
    var elements=document.getElementsByClassName("gsc-left-header");
    if (elements.length>0){
      for(var i=0; i<elements.length;i++){
        elements[i].remove();
      }
      clearInterval(clear_giscus);
    }
  }, 10);
</script>