---
layout: page
permalink: /contact-info
title: "contact&nbsp;info"
excerpt: "info for contact"
author_profile: false
nav: true
nav_order: 4
---


# Contact info

<a href="mailto:{{ site.data.socials.email | encode_email }}"><i class="fas fa-fw fa-envelope" aria-hidden="true" style="color:#d44638"></i> {{ site.data.socials.silly_email | default: site.data.socials.email }} </a>

<div class="social">
  {% include social_list.liquid %}
</div>