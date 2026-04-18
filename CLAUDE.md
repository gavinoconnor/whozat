# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # dev server
npm test         # interactive test watch mode
npm test -- AnimalTile.test.js  # run a single test file
npm run build    # production build
```

ESLint uses the `react-app` preset (configured in `package.json`); no separate config file exists.

## What This Is

Whozat is a matching card game. Players flip tiles to find sets of three tiles with the same animal icon. Finding all 4 sets (12 tiles total) wins the round and triggers a confetti animation.

## Architecture

**State lives entirely in `App.js`** using two `useState` hooks: `animalTiles` (array of tile objects) and `hasWon` (boolean). There is no Context, Redux, or other state management.

**Tile object shape:**
```js
{ id, animal, category, isHeld, isMatched, colorClass }
```

**Game flow:**
1. On mount/reset, `App.js` picks 4 random animals from `data/data.js`, generates 3 tiles each (12 total), assigns random color classes, and shuffles.
2. `handleClick` toggles `isHeld`; after each click it checks whether 3 held tiles share the same `animal` — if so, marks them `isMatched: true` and checks for a win.
3. Buttons: **RESET** generates a fresh game; **MIX-UP** shuffles current tiles; **CLEAR** deselects held (non-matched) tiles. Mix-up and Clear are disabled on win.

**Key files:**
- `src/App.js` — all game logic and state
- `src/AnimalTile.js` — tile rendering (FontAwesome icon, hold/match/color states, keyboard support)
- `src/data/data.js` — 42-animal dataset, `generateTiles()`, color assignment
- `src/utils.js` — Fisher-Yates `shuffle()`

**Styling:** plain CSS files per component. Four color themes (`blue`, `green`, `pink`, `yellow`) are applied via `colorClass` on each tile. The 768 px breakpoint is the only responsive breakpoint.

**Icons:** FontAwesome Pro SVG icons (v6.4.2). The `animalIcons` mapping in `data/data.js` maps each animal name string to its imported FA icon component.
