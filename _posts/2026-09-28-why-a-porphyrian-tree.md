---
title: "Why a Porphyrian Tree?"
subtitle: "On an old diagram of kinds, and the new things that will not sit still on it."
tags: [Categories, Philosophy of Mind, Machine Learning]
description: "The Porphyrian tree sorted beings by genus and difference. Modern AI sorts them by distance in a vector space. What changes when classification stops being a tree?"
math: true
---

Every classification is a small metaphysics. When Porphyry of Tyre wrote his *Isagoge* around 270 CE, he meant only to introduce Aristotle's *Categories* to beginners. Yet the scheme his readers extracted from it — a single trunk descending from *substance* to *human*, each step fixed by a **difference** — became one of the most durable pictures of how the world is carved.

## The tree

The structure is simple. Take a genus, add a difference, and you get a species; that species becomes the genus for the next division:

- *Substance* + corporeal → **Body**
- *Body* + animate → **Living body**
- *Living body* + sensitive → **Animal**
- *Animal* + rational → **Human**

The negative branches — incorporeal, inanimate, insensitive, irrational — are left hanging, unexplored. The tree is a path, not a map.[^1]

> The definition of *human* as *rational animal* is not a discovery at the bottom of the tree; it is the reason the tree was drawn that way.

## Where it strains

A large language model is not corporeal in the way a body is, nor animate, nor sensitive in any obvious sense. And yet many would hesitate to put it on the *irrational* branch. It seems to fall *off* the tree entirely — to satisfy the last differentia without any of the earlier ones.

That is interesting because Porphyrian division is supposed to be **nested**: every difference presupposes the ones above it. Rationality was assumed to be something only an *animal* could have. If that presupposition fails, the tree does not merely need a new leaf; it needs a different shape.

## Trees and spaces

Machine learning systems classify differently. They don't descend a hierarchy. They place items in a high-dimensional space, and kinds show up as regions where items cluster. Similarity is geometric — the cosine of an angle:

$$
\operatorname{sim}(\mathbf{a}, \mathbf{b}) = \frac{\mathbf{a}\cdot\mathbf{b}}{\lVert\mathbf{a}\rVert\,\lVert\mathbf{b}\rVert}
$$

```python
import numpy as np

def similarity(a, b):
    """Cosine similarity: kinds as nearness, not as division."""
    return a @ b / (np.linalg.norm(a) * np.linalg.norm(b))
```

In such a space nothing is simply *in* or *out* of a kind. Things are nearer or farther. It sounds more like Wittgenstein's family resemblance than Porphyry's genus and difference.[^2] Whether that is a philosophical advance or only an engineering convenience is one of the questions this site exists to pursue.

---

This journal is my attempt to climb the old tree carefully — noting where each branch holds, and where something new has grown that it was never meant to bear.

[^1]: The iconic diagram is medieval, not Porphyry's own; it is often associated with Boethius's Latin translation and later logic textbooks.
[^2]: Wittgenstein, *Philosophical Investigations* §§65–67.
