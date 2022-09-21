# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Editing the menu

1. Edit the CSV file located in [src/data/menu.csv](https://github.com/asendia/salmonfit/blob/main/src/data/menu.csv)
2. Edit the images in [src/assets/menu/](https://github.com/asendia/salmonfit/blob/main/src/assets/menu), ensure the file name matches item in `menu.csv` (e.g. "Salmon Fried Rice" will have "salmon-fried-rice.webp")
3. Run `yarn prebuild`, it will generate `src/data/menu.json` & `src/lib/foodImageMap.ts`
