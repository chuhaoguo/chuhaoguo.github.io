---
layout: page
title: About Me
eyebrow: Author · Correspondence
permalink: /about/
subtitle: Who is climbing this tree, and why.
---

<!-- ✎ Replace everything below with your own words. -->

I am **{{ site.author.name }}** — {{ site.author.role }}.
My work sits where the philosophy of mind, philosophy of language, and ethics meet
contemporary machine learning.

## What I work on

- **Machine understanding.** Whether large models understand, and what "understanding" has to mean for that question to be answerable.
- **Categories and kinds.** How old classificatory schemes — genus, species, differentia — cope with artefacts that learn.
- **Responsibility.** Who answers for what artificial agents do.

## Why "Porphyrian Tree"?

In the third century, Porphyry of Tyre wrote a short introduction to Aristotle's *Categories*.
Medieval readers turned it into a diagram: a trunk descending from *substance* to *human*,
each step fixed by a difference — corporeal, animate, sensitive, rational.
That tree is still, quietly, how many of us think about minds.
This site is a place to test where it bends and where it breaks.

## Contact

{% if site.author.email != "" %}Write to me at <a href="mailto:{{ site.author.email }}">{{ site.author.email }}</a>.{% else %}Add your email in `_config.yml` and it will appear here.{% endif %}

{% assign real_links = site.author.links | where_exp: "l", "l.url != ''" %}
{% if real_links.size > 0 %}
<ul class="link-list">
{% for l in real_links %}<li><a href="{{ l.url }}">{{ l.label }}</a></li>{% endfor %}
</ul>
{% endif %}
