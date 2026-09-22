# Contributing

## What a page looks like

One page per part of the radio (display, keys, calls, …), in `docs/`,
covering everything reFW changes there wherever it lives in the menus.
Markdown, wrapped at ~72 columns, no HTML. The [Extras
menu](docs/extras-menu.md) and [Shortcut functions](docs/shortcuts.md)
pages are lookup tables: when you document a new Extras item or key
function, add a row there that links to its section.

To add a page, list it in the `sidebar` in `src/pages.mjs`, then run
`npm run pages` to regenerate the page tables in `README.md` and
`docs/index.md` from each page's `title` and `description`. Don't edit
those tables by hand: the build fails if they are out of date, or if a
page is missing from the sidebar.

Each page starts with a `title` (shown as the page heading) and a
one-line `description`, instead of a `#` heading:

```markdown
---
title: "Packet log"
description: "Recording DMR traffic to flash and pulling the log off the radio"
---
```

Link to other pages by filename, as in `[Band mode](scanning.md#band-mode)`,
so links work both on GitHub and on the site. The build checks every
link, including the `#section` part, and fails on a broken one.

For callouts, use GitHub's alert syntax, which the site renders as
asides: `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]` or
`> [!CAUTION]` on the first line of the blockquote.

Each documented setting carries:

- **Menu**: where to find it, as in `Settings → Extras → Batt view`,
  or the function code for a key function
- **Options**: exactly the words the radio's own menu shows
- **Default**: what a fresh radio does
- **Storage**: byte, bit and value mapping, or "not yet documented"

## Say what is known, and how

The value of these notes is that they are checked. So:

- Mark anything not confirmed as `Unconfirmed` or
  `Not yet documented`. An explicit gap is better than a plausible guess
  that gets copied into third-party tooling.
- When a value was read off a real radio, say so and date it. Several of
  these settings store values in the opposite order to the way the menu
  displays them; that is only knowable by checking.
- When a fact comes from a firmware image, name the build
  (`REFW-YYYYMMDD-HHMMSS`). Addresses move between builds; bit
  assignments so far have not.
- Document the latest reFW build only. When menu wording changes,
  update the page to the new wording rather than noting the old name.

## Safety

Some of what reFW exposes sits outside the codeplug, including the
device-info block behind [Band mode](docs/scanning.md#band-mode), the
license region, and the key-function jump table without bounds checks.
Where a page tells tooling authors to treat something as read-only or
range-limited, keep that warning attached to the relevant section.
