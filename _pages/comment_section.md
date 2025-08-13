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

# comment section, be nice

{% if site.giscus and page.giscus_comments %}
    {% include giscus.liquid %}
{% endif %}