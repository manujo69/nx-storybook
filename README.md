# NxWorkspace

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Angular 22 monorepo with Nx ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created.

## Projects

- `angular-app` (`apps/angular-app`): the application, built with `@angular/build:application`.
- `angular-app-e2e` (`apps/angular-app-e2e`): Playwright E2E tests.
- `ui-components` (`libs/ui-components`): shared component library, imported as `@nx-workspace/ui-components`.

## Stack

- **Framework**: Angular 22 (standalone components, signal inputs)
- **Styling**: Tailwind CSS v4 with shared design tokens in `styles/theme.css`
- **Testing**: Playwright (E2E) + Vitest (unit tests via Analog)
- **Linting**: ESLint configured by Nx

## Commands

```sh
npx nx serve angular-app              # dev server, http://localhost:4200
npx nx build angular-app              # production build -> dist/apps/angular-app
npx nx test angular-app               # unit tests (Angular CLI unit-test builder)
npx nx test ui-components             # unit tests (Vitest via Analog)
npx nx lint angular-app               # ESLint
npx nx e2e angular-app-e2e            # Playwright (chromium, firefox, webkit)
npx nx storybook ui-components         # Storybook on http://localhost:4400
npx nx run-many -t lint test build    # everything
npx nx affected -t lint test build    # only what changed
```

## Styling

- PostCSS is configured at the root (`.postcssrc.json`, `@tailwindcss/postcss`).
- `styles/theme.css` holds design tokens in a Tailwind `@theme` block. It sets `--color-*: initial`, which **removes Tailwind's entire default color palette**: only the custom `ml-*` colors exist (`ml-base`, `ml-contrast`, `ml-foreground`).
- Each entry stylesheet imports Tailwind and the shared theme on its own.

## Adding New Components

Use the Nx generators which default to the right configurations:

```sh
npx nx g @nx/angular:component <name> --project=ui-components
npx nx g @nx/angular:lib <name>
```

Every new public component must be re-exported from `libs/ui-components/src/index.ts`.

## Useful links

Learn more:

- [Nx monorepo tutorial](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
