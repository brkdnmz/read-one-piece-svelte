# Read One Piece (Svelte)

Svelte version of [the same app built with React](https://github.com/brkdnmz/read-one-piece).

I built it once more with Svelte to see if it would be significantly more performant.

It's not :D Maybe skill issue, who knows... 🤔

In dev mode, it actually is smoother, but in production, I couldn't see anything better. In fact, Svelte's dev mode is just as fast as the production build based on my experience.

However, Svelte is fun. [This is Rich Harris' talk](https://www.youtube.com/watch?v=AdNJ3fydeao) that I encountered while searching "Svelte vs React", [in this Reddit comment](https://www.reddit.com/r/sveltejs/comments/1fb6g6g/comment/llyty19/). That talk made me curious about Svelte and eventually build this first Svelte app of mine. Replacing React's runtime DOM updates with a compiler that determines "what should be updated when" beforehand makes much sense.
