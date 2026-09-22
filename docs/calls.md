---
title: "Calls, contacts and RX groups"
description: "Contact list shortcuts, call hold times, time slot fallback, RX groups and manual dial"
---

## Select 1st

In stock firmware, picking an entry from the talkgroup (TG) menu puts
**Select** several lines down in the pop-up menu. Turning this on moves
**Select** to the top slot, saving an extra keystroke on the default
action.

- **Menu:** Settings → Extras → Select 1st
- **Options:** `Off`, `On`
- **Default:** `Off`
- **Storage:** reFW settings block `0x02E80000` + `0x10`, bit 4

## Hold times

Sets how long the radio holds a DMR call after the last transmission,
before it drops back to the channel's own contact. Received and dialled
calls have separate timers, and private and group calls are split:

| Item | Holds | Storage |
| --- | --- | --- |
| `Private` | A private call you received | `general_settings` + `0x1A` |
| `Group` | A group call you received | `general_settings` + `0x19` |
| `Dial Private` | A private call you made | `extended_settings` + `0x38` |
| `Dial Group` | A group call you made | `extended_settings` + `0x37` |

This adds no storage of its own. The four timers are stock codeplug
fields that factory firmware only lets you set from CPS, and reFW puts
them in the radio's menu.

- **Menu:** Settings → Extras → Hold times, a sub-menu with the four
  items above
- **Options:** `1s` … `30s`, `30m`, `Infinite`
- **Default:** `6s` for all four
- **Storage:** one byte per timer, holding the option's position in the
  list: `0`–`29` = 1–30 s, `30` = 30 min, `31` = Infinite. Checked on a
  radio running `REFW-20260919-155710` on 2026-09-21: Private 20s → 23s
  changed `0x1A` from 19 to 22, Dial Private 20s → 30m changed `0x38`
  from 19 to 30, and Dial Group 30m → Infinite changed `0x37` from 30 to
  31. `Group` wasn't changed during the test; its byte is the stock
  group hang-time field next to Private.

## TX idle

Lets a call go out on whichever time slot is free. With TX idle on,
pressing PTT tries the channel's programmed slot first. If that slot is
busy, the radio tries the other one. If both are busy, it shows an error
instead of transmitting.

For example, with TG 100 as the channel contact on slot 1, a busy
slot 1 sends the call to TG 100 on slot 2.

- **Menu:** a [key function](keys.md#assigning-functions-to-keys),
  code 60. One press turns it on, the next turns it off.

## RX groups

A channel's RX group can now be cleared, and changes to it are saved
back to the channel. A **G** icon on the display shows when an RX group
is selected.

- **Storage:** channel record `+0x1C`, group-list index, `0xFF` = none.
  See [settings-storage.md](settings-storage.md#per-channel-settings).

The **RX Group** key function (code 65) goes with this: the firmware
pairs it with an `RX Group` / `Deselected` pop-up.

> [!NOTE]
> **Unconfirmed:** whether the RX Group function only deselects the RX
> group or toggles it back on, and whether the change is saved to the
> channel.

## Other call changes

> [!NOTE]
> These come from the changelog for build `REFW-20260919-155710`. Their
> exact behavior has **not yet been documented** from a radio.

- **Press PTT to select a contact** in a list, instead of opening it and
  choosing Select.
- **Hold shows the dial target.** When hold is in effect, the call
  screen shows the contact that PTT would dial.
- **List works on the call screen.** The List button there used to do
  nothing.
- **Manual dial:**
  - Press `*` on the manual dial screen to override the time slot.
  - Press the red key on the call screen to hang up a manually dialled
    call.
