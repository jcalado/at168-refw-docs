---
title: "Display and indicators"
description: "Idle screen options, backlight and dimming shortcuts, and new icons"
---

## VFO marker

Adds an indicator next to the active VFO in dual-VFO mode, showing
which frequency will transmit.

- **Menu:** Settings → Extras → VFO marker
- **Options:** `Off`, `On`
- **Default:** `Off`
- **Storage:** reFW settings block `0x02E80000` + `0x11`, bit 0

## Show cont

Cycles the home screen display between the active zone name and the
currently selected talkgroup or contact. The screen swaps labels every 5
seconds by default, or every 2 seconds if you have [Faster](#faster)
enabled.

This is not a new reFW setting. It is the stock **Show current
contact** option, which factory firmware only lets you set from CPS
(hence the changelog's "CPS-only option: Show Contact"). reFW adds it
to the radio's menu as Extras item 12.

- **Menu:** Settings → Extras → Show cont
- **Options:** `Off`, `On`
- **Default:** `Unconfirmed` for a factory-fresh radio. The template in
  `at168-cps` (work in progress, not yet released) sets it `On`.
- **Storage:** `general_settings` byte `0xB9`, bit 0 (`0` = Off,
  `1` = On; existing stock CPS field `show_current_contact`). Checked
  on a radio running `REFW-20260919-155710` on 2026-09-21: switching
  Show cont from On to Off in the menu changed only this bit, `1` → `0`.
  Stock firmware reads the same bit, so a stock CPS already edits it.

## Faster

Speeds up alternating text on the idle screen. When [Show
cont](#show-cont) is enabled, the screen alternates between the zone
name and contact name. By default that happens every 5 seconds; setting
**Faster** to `On` cuts the cycle to 2 seconds.

- **Menu:** Settings → Extras → Faster
- **Options:** `Off`, `On`
- **Default:** `Off`
- **Storage:** reFW settings block `0x02E80000` + `0x10`, bit 3

## Night mode

Dims the screen for dark environments without changing the UI color
palette.

- **Menu:** a [key function](keys.md#assigning-functions-to-keys),
  code 61

## Light time

Toggles the backlight timeout between **always on** and **15 seconds**
with one key. Useful to keep the display illuminated at a desk, then
switch back to a timeout when carrying the radio.

- **Menu:** a [key function](keys.md#assigning-functions-to-keys),
  code 62

## Other display changes

> [!NOTE]
> These come from the changelog for build `REFW-20260919-155710`. Their
> exact behavior has **not yet been documented** from a radio.

- **Bandwidth icon** on analog channels.
- **G icon** when an RX group is selected.
- **New icon** for scrambled/encrypted channels.
- **Promiscuous icon** now reflects the setting of the current VFO only.
- **Satellite pass list** no longer shows seconds.
- **Talker Alias** handling was rewritten. Incoming aliases get limited
  UTF-8 support, and the random Chinese and garbage characters are gone.
