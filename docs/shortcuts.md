---
title: "Shortcut functions"
description: "Every function reFW adds to the assignable key list, linked to where it is described"
---

reFW adds these functions to the list you can assign to a programmable
key, a number-key long press or the `#` key (see [Assigning functions
to keys](keys.md#assigning-functions-to-keys)). Each links to where it
is described.

| Function | Code | What it does |
| --- | --- | --- |
| [Slot Suit](channels.md#slot-suit) | 58 | Swap the channel between slot 1 and slot 2 |
| [Bandwidth](channels.md#bandwidth) | 59 | Analog channel bandwidth, 25 kHz ↔ 12.5 kHz |
| [TX idle](calls.md#tx-idle) | 60 | Fall back to the other time slot when yours is busy |
| [Night mode](display.md#night-mode) | 61 | Dimmed screen |
| [Light time](display.md#light-time) | 62 | Backlight, always on ↔ your previous timeout |
| [APRS type](channels.md#aprs-type) | 63 | APRS on or off for the current channel |
| [MAT3](mat3.md#mat3-key-function) | 64 | MAT3 USB streaming, enabled ↔ disabled |
| [RX Group](calls.md#rx-groups) | 65 | Deselect the channel's RX group |

Slot Suit is a stock function that reFW unlocks on radios where AnyTone
hid it; the others are new.

The functions are mostly **toggles**: one press flips the setting,
another press flips it back. Most act on the radio's live state rather
than the codeplug, so the current channel behaves differently without
you having to go in and edit it. MAT3 is the exception: it changes the
stored Extras setting. RX Group's exact behaviour is still
`Unconfirmed`.

## Storage

Each key assignment is one byte holding a function code. The codes
above come from the function table in `REFW-20260919-155710`, checked on
a radio for Light Time.

`0..57` are the stock functions, so the table now has 66 entries. The
`#` and number-key assignments live in reFW's settings block, not the
codeplug; see
[settings-storage.md](settings-storage.md#key-functions). PF-key
assignments haven't been checked against the block. A CPS should only
offer codes `0..65`; whether the key dispatcher bounds-checks the code is
`Not yet documented`.
