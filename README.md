# Astro Template: Basic Site

A custom Hybrid SSG and Server Side Astro Solution for a Strapi CMS backend and Netlify deployment. With SCSS for styling and

## 🔌 Plugins & Packages

Outside of Astro's usual plugin and package configuration, the following plugins and packages are used for the frontend:

### Astro Plugins

-   [Netlify SSR Adapter](https://docs.astro.build/en/guides/integrations-guide/netlify/#_top/) for **hybrid** SSG and Server Side Deployment.
-   [Astro Icons](https://github.com/natemoo-re/astro-icon) for straight forward SVG icons.
-   [Astro Prettier Plugin](https://github.com/withastro/prettier-plugin-astro) for project specific code formatting.

### Project Packages

-   [qs](https://github.com/ljharb/qs) for handling query parameters in Strapi CMS REST API.
-   [sharp](https://github.com/lovell/sharp) for strict package manager environments using the default image service for `astro:assets`. NPM environments for instance, can remove this dependency.
-   [sass](https://github.com/sass/scss) for compiling SCSS to CSS.
-   [Prettier](https://github.com/prettier/prettier) for project specific code formatting.

## 🚀 Project Structure

This Astro project follows a similar structure to a standard , adding a few more folders and files:

```text
/
├── public/
|   ├── fonts/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── icons/
│   │   └── images/
│   │   └── scripts/
│   │   └── styles/
│   ├── components/
│   ├── layouts/
│   └── pages/
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| NPM                       | PNPM                | Action                                           |
| :------------------------ | :------------------ | :----------------------------------------------- |
| `npm install`             | `pnpm install`      | Installs dependencies                            |
| `npm run dev`             | `pnpm dev`          | Starts local dev server at `localhost:4321`      |
| `npm run build`           | `pnpm build`        | Build your production site to `./dist/`          |
| `npm run preview`         | `pnpm preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`       | `pnpm astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | `pnpm astro --help` | Get help using the Astro CLI                     |

## ENV Variable Configuration

Please include the following `.env` variables in your development and deployment environments for the project to work out of the box.

### PREVIEW MODE

-   **IS_PREVIEW_MODE:** Can be set to `true` to enable preview mode for staging and preview deployments, as well as local development environments.

### Strapi CMS

-   **CMS_URL:** deployed url of your Strapi CMS project.
-   **CMS_API_TOKEN:** A Strapi CMS API token enabling this project to **all reading permissions**. For more information, please visit [this guide](https://docs.strapi.io/dev-docs/configurations/api-tokens) for Strapi CMS Api Tokens.

### Newsletter

This version is using MailChimp for Newsletter email collection using the **Batch Subscribe**, `/lists/${listId}` endpoint. Visit [API Reference Documentation](https://mailchimp.com/developer/marketing/api/lists/batch-subscribe-or-unsubscribe/) for more information.

-   **NEWSLETTER_API_KEY:** An API key connecting to Mailchimp API Service.
-   **NEWSLETTER_DATA_CENTER:** The Mailchimp data center associated with the API key. For example, `us20`.
-   **NEWSLETTER_LIST_ID:** The Mailchimp list ID for the newsletter sign up form. For example, `a1234567890`.

### Instagram API

**Basic Display API** is set to deprecate by December 2024, and will be removed in 2025. An Alternative Needs to be found inthe meantime.

-   **INSTAGRAM_APP_ID:** The client ID of your Instagram app.
-   **INSTAGRAM_URI:** The URL that the user will be redirected to after authorization.
-   **INSTAGRAM_APP_SECRET:** The client secret of your Instagram app.
-   **INSTAGRAM_USER_ID:** The ID of the Instagram user that will be used to fetch the feed.
-   **INSTAGRAM_APP_ACCESS_TOKEN:** The long-lived access token that will be used to fetch the feed. This token must be refreshed every 60 days via Scheduled Netlify Functions.
