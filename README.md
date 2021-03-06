# salmonfit [![Netlify Status](https://api.netlify.com/api/v1/badges/599eecad-58fd-453f-9b21-130e4b9713f5/deploy-status)](https://app.netlify.com/sites/salmonfit/deploys)

A simple AMP web for [salmonfit.com](https://salmonfit.com) powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
yarn dev
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
yarn build
```
> You can preview the built app with `yarn preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Editing the menu
1. Edit the CSV file located in [src/data/menu.csv](https://github.com/asendia/salmonfit/blob/main/src/data/menu.csv)
2. Edit the images in [src/assets/menu/](https://github.com/asendia/salmonfit/blob/main/src/assets/menu), ensure the file name matches item in `menu.csv` (e.g. "Salmon Fried Rice" will have "salmon-fried-rice.webp")
3. Run `yarn prebuild`, it will generate `src/data/menu.json` & `src/lib/foodImageMap.ts`
