---
layout: about
title: home
permalink: /
subtitle: 
og_image: /assets/img/cool_bunny.jpg
profile:
  align: right
  image: me.jpg
  image_circular: true # crops the image to make it circular
  more_info: >
    <p>Machine Learning Department</p><br>
    <p>Carnegie Mellon University</p><br>
    <p>Pittsburgh, USA</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
remove_dead_pixel: false
---

I am a PhD student at CMU's Machine Learning Department, advised by <a href="https://www.cs.cmu.edu/~sandholm/">Prof. Tuomas Sandholm</a>.
My current research is focused on developing algorithms to solve large-scale imperfect information games.

<p class="silly-goose">I am interested in AI/ML, Topology, and long walks on the beach.</p>

<p class="serious-goose">My general interests lie in the disjoint union of Machine Learning algorithms for strategic scenarios, and Topology/discrete mathematics.</p>

[Research statement here](/research-statement).

<div>
  <p>Inspired by <a href="https://seristof.github.io">my friend's</a> website, 
    I have also included reflections on my <span class="course-to-reflect" style="display:inline-block">coursework</span>:
    <span 
    onclick="
      var elements = document.getElementsByClassName('course-to-reflect');
      var count = 20;
      var k = count;
      var reflectorhardlyknower = setInterval(function(){
          var c = (k*2/count)-1;
          for(var element of elements){
            if(element.classList.contains('reflected')){
              element.style.transform='matrix('+String(-c)+',0,0,1,0,0)';
              if(k==0){
                element.classList.remove('reflected');
              }
            } else {
              element.style.transform='matrix('+String(c)+',0,0,1,0,0)';
              if(k==0){
                element.classList.add('reflected');
              }
            }
          }
          if(k==0){
            clearInterval(reflectorhardlyknower);
          }
          k--;
        }, '{{ site.more_authors_animation_delay }}');
      "
    style="cursor:pointer;color:var(--global-theme-color);"
  ><b><span class="course-to-reflect" style="display:inline-block;color:var(--global-theme-color);">Coursework</span> Reflection</b></span></p>
</div>