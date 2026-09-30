---
layout: page
title: About Me
eyebrow: Author · Correspondence
permalink: /about/
subtitle: Who is climbing this tree, and why.
---
<style>
  .name-zh { display: none; }
  html.translated-ltr .name-en { display: none; }
  html.translated-ltr .name-zh { display: inline; }
  p + p { margin-top: 1.2em !important; }
</style>
<!-- ✎ Replace everything below with your own words. -->

My name is <span translate="no"><span class="name-en">Chuhao Guo</span><span class="name-zh">郭楚昊</span></span>, but you can call me <span translate="no">Tree</span>. I come from Shenzhen, China. I'm a freshman at Vanderbilt University studying Philosophy and Artificial Intelligence, and I've been reading and thinking about philosophy for five years.

I enjoy taking the familiar apart and rebuilding it, and searching for the art within order and structure. The deep tremor of *thaumazein*, or wonder, comes with it.

Outside of philosophy, I am also a baseball, soccer, and pool player, a calligrapher, and a competitive speedcuber, ranked top 5 in China for solving the Megaminx.


## What I work on

I'm drawn to the questions that AI makes urgent, and this blog is where I work through them. My writing centers on four areas:
- **Aesthetics.** Whether algorithms can make something beautiful, and how will AI change humans' understanding of beauty.
- **Ethics.** Whether AI can be a moral agent or deserve moral concern, and how it will reshape human responsibility.
- **Semantics.** Whether language models truly mean what they say, and what that reveals about human language and understanding.
- **Consciousness.** Whether machines could ever have mind, and how we could tell if they did.


## Why "Porphyrian Tree"?

In the third century, Porphyry of Tyre wrote a short introduction to Aristotle's *Categories*.
Medieval readers turned it into a diagram: a trunk descending from *substance* to *human*,
each step fixed by a difference — corporeal, animate, sensitive, rational.
That tree is still, quietly, how many of us think about minds.
This site is a place to test where it bends and where it breaks.

## Contact

{% if site.author.email != "" %} <a href="mailto:{{ site.author.email }}">{{ site.author.email }}</a>.{% else %}Add your email in `_config.yml` and it will appear here.{% endif %}

{% assign real_links = site.author.links | where_exp: "l", "l.url != ''" %}
{% if real_links.size > 0 %}
<ul class="link-list">
{% for l in real_links %}<li><a href="{{ l.url }}">{{ l.label }}</a></li>{% endfor %}
</ul>
{% endif %}
