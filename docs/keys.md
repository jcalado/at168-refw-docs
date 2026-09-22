---
title: "Keys and navigation"
description: "Assigning functions to keys, number-key and # shortcuts, the knob, and faster menu entry"
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
  7. When enabled, pressing `#` runs your custom shortcut instead of the
  stock save-channel routine. The radio also exposes a new **Hash
  Short** entry under **Settings → Radio Set → Keys**, next to new **0
  Long** … **9 Long** entries for the number keys.
- **Storage (functions):** reFW settings block `0x02E80000` + `0x40` for
  Hash Short, then `0x41` … `0x4A` for `0 Long` … `9 Long`. Each byte is
  a key-function code from `0` to `65`; see
  [settings-storage.md](settings-storage.md#key-functions) for the
  codes.

Keep in mind that functions requiring a sustained press-and-hold (such
as Sub PTT, Alarm, Monitor, or TBST Send) can technically be mapped to
`#`, but won't do anything useful on a short tap.

## LP1 silent

Silences the beep from **Long Press 1**. The radio's programmable keys
support a long press that normally emits a confirmation beep when
triggered. Turning this on silences the confirmation beep.

- **Menu:** Settings → Extras → LP1 silent
- **Options:** `Off`, `On`
- **Default:** `Off`
- **Storage:** reFW settings block `0x02E80000` + `0x10`, bit 6

## Knob mode

Swaps what the top rotary knob and the up/down keys do on the idle
screen. One of them steps through **Channels** in the active zone and
the other through **Zones**. This setting picks which does which.

- **Menu:** Settings → Extras → Knob mode
- **Options:** `Channel`, `Zone`
- **Default:** `Zone`
- **Storage:** reFW settings block `0x02E80000` + `0x10`, bit 1 (`0` =
  Channel, `1` = Zone). Flip-tested on a radio running
  `REFW-20260919-155710` on 2026-09-21.

## Menu navigation and entry

> [!NOTE]
> These come from the changelog for build `REFW-20260919-155710`. Their
> exact behavior has **not yet been documented** from a radio.

- **PF1+2 scrolls faster** up and down through menus.
- **Jump by value.** Typing an option's value on the keypad jumps
  straight to that option.
- **DCS codes can be typed in directly** instead of scrolled to.
