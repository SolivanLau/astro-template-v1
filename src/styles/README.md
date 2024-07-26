# Styles

This folder contains the stylesheets for the project, taking advantage of Astro's scoped styles along with traditional sass workflow.

## Naming Conventions

This project uses BEM (Block Element Modifier) naming conventions to keep styles modular and reusable. Here are key points to remember:

### Key Concepts

1. **Block** - A block is a standalone entity that is meaningful on its own. This is a standalone class that use `kebab-case`.

Examples: **logo**, **list**, **accordion**.

2. **Element** - An element is a part of a block that has no standalone meaning. Element is semantically tied to its block as a **child**. State the block and use a double underscore, `__` to notate the element.

Examples: **logo\_\_caption**, **list\_\_item**, **accordion\_\_question**.

3. **Modifier** - A modifier is a flag on a block or element. It changes the appearance or behavior of the regular block or element. State the block or element and use a double hyphen, `--` to notate the modifier.

Examples: **logo--dark-mode**, **list--bulleted**, **accordion\_\_question--highlighted**.

### Best Practices

-   **Use meaningful names**: Names should be understandable without needing to look at the HTML.
-   **Avoid deep nesting**: Ideally, limit the depth of nesting to three levels to keep CSS manageable.

### Resources

Please reference the [BEM introduction](https://getbem.com/introduction/) and [BEM naming conventions](https://getbem.com/naming/) to make the scss code maintainable to read and develop.

## Style Structure

`@styles` consists of all global styles or non-`.astro` component styles:

-   `styles.scss` - the main stylesheet with all global styles
-   `/partials` - individual partial files forwarding all files to `styles.scss`
-   `/modules` - non-`.astro` component styles.

## Usage

By default, this project will use scss as the main styling language. Styles will be developed in 3 core areas:

1. `@styles` - forwards individual partials to `styles.scss`. This contains global styles meant to be used with import syntax on a layout component for **all** pages.

2. `@pages`/ `@components` - uses Astro's `<style>` tags in page/component `.astro` files for their specific styles.

3. `@modules` - contains individual stylesheets for components without a `.astro` file extension such as `.jsx` components.

To centralize styles during build time, **all** styles are configured to be compiled into external stylesheets for consistency.

## Global `styles.scss`

The global `styles.scss` file compiles from `@styles/partials` which is loosely based on of Kitty Giraudel's [7-1 Pattern SCSS architecture](https://sass-guidelin.es/#architecture):

-   `/abstracts`
-   `/base`

### `/abstracts`

-   `_normalize` uses [CSS Normalize](https://necolas.github.io/normalize.css/) from Nicolas Gallagher
-   `_variables` use vanilla css variables for globally scoped styles.
-   `_utilities` are common classes used throughout the project.
-   `_mixins` are Scss mixins, mainly for responsive styling.

### `/base`

-   `_normalize` uses [CSS Normalize](https://necolas.github.io/normalize.css/) from Nicolas Gallagher
-   `_typography` fonts and type scaling.

## .astro `<style>`

Each `.astro` component will have their own `<style lang="scss">` tag. Using Astro's scoped styles, naming conventions are less frequent and rely on Astro's props and component structure to:

-   traditionally pass down styles to children with the `:global()` selector
-   pass a unique `class` attribute (renamed) from parent to child
-   using `...rest` to pass down the `data-astro-cid` attribute from parent to child

Please reference Astro's documentation for:

-   [scss integration](https://docs.astro.build/en/guides/styling/#sass-and-scss)
-   [scoped styles](https://docs.astro.build/en/guides/styling/#scoped-styles)
-   [global styles](https://docs.astro.build/en/guides/styling/#global-styles)
-   [passing a class to a child component](https://docs.astro.build/en/guides/styling/#passing-a-class-to-a-child-component)
-   [scopedStyleStrategy Configuration](https://docs.astro.build/en/reference/configuration-reference/#scopedstylestrategy)

**currently scopedStyleStrategy is not set to class, but maybe in the future**

## Non-`file-name.astro` Styles

In the event that JavaScript library/framework components are used, styles cannot follow either methods previously mentioned.

To keep styles consistent with `.astro` modular conventions, individual files will be made per non `.astro`component in `@styles/modules`. They will be imported These are explicitly supposed to be used for non `.astro` files such as React, Vue, or Svelte components.
