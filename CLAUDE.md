# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Nx 23 monorepo running Angular 22 with standalone components and signal inputs, styled with Tailwind CSS v4. Node 22 (`.nvmrc`, Volta pin in `package.json`). There are no npm scripts; run everything through `npx nx`.

Projects:
- `angular-app` (`apps/angular-app`): the application, built with `@angular/build:application`.
- `angular-app-e2e` (`apps/angular-app-e2e`): Playwright tests. The `e2e` target is inferred by `@nx/playwright/plugin`, and it starts `angular-app:serve` on port 4200 automatically.
- `ui-components` (`libs/ui-components`): shared component library, imported as `@nx-workspace/ui-components` (path alias in `tsconfig.base.json`). Every public component has to be re-exported from `libs/ui-components/src/index.ts`.

## Commands

```sh
npx nx serve angular-app                # dev server, http://localhost:4200
npx nx build angular-app                # production build -> dist/apps/angular-app
npx nx test angular-app                 # unit tests (Angular CLI unit-test builder)
npx nx test ui-components               # unit tests (Vitest via Analog)
npx nx lint <project>                   # lint target is inferred by @nx/eslint/plugin
npx nx e2e angular-app-e2e              # Playwright (chromium, firefox, webkit)
npx nx storybook ui-components          # Storybook on http://localhost:4400
npx nx build-storybook ui-components    # static build -> dist/storybook/ui-components
npx nx run-many -t lint test build      # everything
npx nx affected -t lint test build      # only what changed
npx nx show project <project>           # list all targets, including inferred ones
```

Run a single test file:
```sh
npx nx test ui-components -- src/lib/card/card.spec.ts    # Vitest file filter
npx nx test ui-components -- -t "should create"           # Vitest test-name filter
npx nx test angular-app --include apps/angular-app/src/app/app.spec.ts   # Angular builder; path is workspace-relative
```

Generators already default to the right runners (see `nx.json`): `npx nx g @nx/angular:component <name> --project=ui-components`, `npx nx g @nx/angular:lib <name>`.

## Testing setup (two different runners)

- `angular-app` uses `@angular/build:unit-test` (the Angular CLI's built-in Vitest integration). It has no `vite.config` of its own.
- `ui-components` uses `@nx/vitest:test` (deprecated, scheduled for removal in Nx 24, along with the `nxViteTsPaths`/`nxCopyAssetsPlugin` Vite plugins) with `libs/ui-components/vite.config.mts`, `@analogjs/vite-plugin-angular`, jsdom, Vitest globals, and `src/test-setup.ts` (which calls `setupTestBed()`).
- The root `vitest.config.mts` aggregates every project-level `vite.config`/`vitest.config` as Vitest projects, so the Vitest IDE extension and a bare `npx vitest` from the root work too.

## Styling (Tailwind v4, shared theme)

- PostCSS is configured once at the root (`.postcssrc.json`, `@tailwindcss/postcss`). There is no `tailwind.config.js`; configuration lives in CSS.
- `styles/theme.css` holds the design tokens in a Tailwind `@theme` block. It sets `--color-*: initial`, which **removes Tailwind's entire default color palette**: only the custom `ml-*` colors exist (`ml-base`, `ml-contrast`, `ml-foreground`). Classes such as `bg-blue-500` will silently produce nothing. Add new colors to `styles/theme.css`.
- Each entry stylesheet imports Tailwind and the shared theme on its own:
  - `apps/angular-app/src/styles.css` scans `./app` and adds `@source "../../../libs/ui-components/src"` so classes used inside library templates get generated. Any new library whose templates use Tailwind classes needs its own `@source` line here.
  - `libs/ui-components/.storybook/storybook.css` is what Storybook loads (through the `styles` option of the storybook targets in `project.json`).
- Components put Tailwind utility classes straight into their templates. The generated per-component `.css` files are empty and are not referenced from `@Component`.

## Module boundaries

`@nx/enforce-module-boundaries` is on in `eslint.config.mjs`, but every project has empty `tags` and the only constraint is `* -> *`. Import across projects through the `@nx-workspace/*` aliases only, never through relative paths into another project.
