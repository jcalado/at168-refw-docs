---
title: "Keys and navigation"
description: "Assigning functions to keys, number-key and # shortcuts, what the knob and up/down keys select, and faster menu entry"
---

## Assigning functions to keys

reFW adds new functions to the list you can assign to a programmable
key (see [Shortcut functions](shortcuts.md) for all of them). You set
them up the same way as stock ones: **Settings → Radio Set → Keys**,
pick the key (PF1, PF2, …) and the press length, then pick the
function.

With [Extra remap](#extra-remap) on, number-key long presses and the
`#` key can hold a function too, which helps if the side buttons are
already in use.

## Extra remap

Enables additional programmable shortcuts across the keypad:
long-pressing any **number key (0–9)** and short-pressing the **`#`
key** can trigger custom actions.

- **Menu:** Settings → Extras → Extra remap
- **Options:** `Off`, `On`
- **Default:** `Off`

Here is how the `#` key mapping works in memory:

- **Storage (enable):** reFW settings block `0x02E80000` + `0x10`, bit
  7. The radio also exposes a new **Hash Short** entry under **Settings
  → Radio Set → Keys**, next to new **0 Long** … **9 Long** entries for
  the number keys.
- **Storage (functions):** reFW settings block `0x02E80000` + `0x40` for
  Hash Short, then `0x41` … `0x4A` for `0 Long` … `9 Long`. Each byte is
  a key-function code; see
  [settings-storage.md](settings-storage.md#key-functions) for the
  codes.

The `#` key has no stock function left in reFW: its short press only
runs the shortcut you assign to Hash Short. There is no long press on
`#`.

## LP1 silent

Silences the beep from **Long Press 1**. The radio's programmable keys
support a long press that normally emits a confirmation beep when
triggered. Turning this on silences the confirmation beep.

- **Menu:** Settings → Extras → LP1 silent
- **Options:** `Off`, `On`
- **Default:** `Off`
- **Storage:** reFW settings block `0x02E80000` + `0x10`, bit 6

## Knob select

Picks what the top rotary knob and the up/down keys step through on
the idle screen. Each one is set on its own, and both can step through
the same thing: for example, the up/down keys for channels and the
knob for talkgroups.

- **Menu:** Settings → Radio Set → Keys → Knob and Up/Down (the last
  two items in the Keys menu)
- **Options:** zone, channel or contact (the exact wording on the
  radio is `Not yet documented`)
- **Default:** `Not yet documented`
- **Storage:** `Not yet documented`

Contact steps only through the talkgroups in the channel's
[RX group](calls.md#rx-groups). On a channel with no RX group it does
nothing. When you change channel or VFO, the contact goes back to the
channel's own contact.

Scanning and WFM take over the knob while they run, and the knob does
nothing on the call screen.

## PTT lock

When the keypad is locked, PTT is locked too. There is no setting for
this.

## Menu navigation and entry

> [!NOTE]
> These come from the changelog for build `REFW-20260919-155710`. Their
> exact behavior has **not yet been documented** from a radio.

- **PF1+2 scrolls faster** up and down through menus.
- **Jump by value.** Typing an option's value on the keypad jumps
  straight to that option.
- **DCS codes can be typed in directly** instead of scrolled to.

PF1 is also handled better when backing out of editors and when
scrolling up while already at the top of a list.
