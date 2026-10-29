---
title: "Calls, contacts and RX groups"
description: "Contact list shortcuts, call hold times and exclusive hold, time slot fallback, RX groups and manual dial"
---

## Select first

In stock firmware, picking an entry from the talkgroup (TG) menu puts
**Select** several lines down in the pop-up menu. reFW always puts
**Select** in the top slot, saving an extra keystroke on the default
action. There is no setting for this.

## Hold times

A hold keeps the radio on a DMR call after the last transmission, so
you can follow the conversation, before it drops back to the channel's
own contact. Calls to contacts and group lists have separate timers from
manually dialled calls, and private and group calls are split:

| Item | Holds | Storage |
| --- | --- | --- |
| `Private` | A private call to or from a contact | `general_settings` + `0x1A` |
| `Group` | A group call on a contact or group list | `general_settings` + `0x19` |
| `Dial Private` | A manually dialled private call | `extended_settings` + `0x38` |
| `Dial Group` | A manually dialled group call | `extended_settings` + `0x37` |

A hold starts from calls you make, including a manual dial and
[Last Call](#last-call), and from received calls that match the
channel's [RX group](#rx-groups). Calls picked up through
[promiscuous](channels.md#promiscuous) listening never start or update
a hold.

There is one hold timer, shared by both VFOs. While a hold is active:

- Dual watch is paused.
- PTT transmits on the held VFO, even when it isn't the selected one.
- A call to another TG on the same slot can take over the hold, unless
  the hold is [exclusive](#exclusive-hold).

This adds no storage of its own. The four timers are stock codeplug
fields that factory firmware only lets you set from CPS, and reFW puts
them in the radio's menu.

![The Misc menu in Radio Set, items 25 to 29: Date Time, TX Preamble,
Header RPT, Scan Range and Hold Times](./images/misc-menu.png)

![The Hold Times sub-menu: Private, Group, Dial Private and Dial
Group](./images/hold-times-menu.png)

- **Menu:** Settings → Radio Set → Misc → Hold Times, a sub-menu with
  the four items above
- **Options:** `1s` … `30s`, `30m`, `Infinite`
- **Default:** `6s` for all four
- **Storage:** one byte per timer, holding the option's position in the
  list: `0`–`29` = 1–30 s, `30` = 30 min, `31` = Infinite. Checked on a
  radio running `REFW-20260919-155710` on 2026-09-21: Private 20s → 23s
  changed `0x1A` from 19 to 22, Dial Private 20s → 30m changed `0x38`
  from 19 to 30, and Dial Group 30m → Infinite changed `0x37` from 30 to
  31. `Group` wasn't changed during the test; its byte is the stock
  group hang-time field next to Private.

## Exclusive hold

While a hold is exclusive, only the held contact plays: other calls on
the channel stay silent until the hold ends. The channel indicator turns
red to show it.

- **Menu:** `*` during a hold, or the **Exclusive**
  [key function](keys.md#assigning-functions-to-keys), code
  `Not yet documented`

A hold becomes exclusive when:

- You press `*` during a hold. This only works when a hold already
  exists, and not while the keypad is locked.
- You press a key assigned the **Exclusive** function.
- A private or emergency call comes in. An incoming private call also
  takes over from a manual dial.
- You dial manually. Manual-dial holds are always exclusive, but don't
  show the red indicator yet.

## Ending a hold

On the main screen, the red key's label reads `Hang` while a hold is
active. Pressing it ends the hold, whatever started it.

On the call screen, the red key hangs up manual dials and exclusive
holds. Otherwise it stays `List`.

## Last Call

This is stock behaviour. Last Call makes a temporary contact in RAM for
the last caller and uses it as the channel's contact. When the hold
expires, the channel's own contact comes back. It only works for
callers with an entry in the contact database, and it clears the
reply set by `*` during a promiscuous call.

## TX idle

Lets a call go out on whichever time slot is free. With TX idle on,
pressing PTT tries the channel's programmed slot first. If that slot is
busy, the radio tries the other one. If both are busy, it shows an error
instead of transmitting.

For example, with TG 100 as the channel contact on slot 1, a busy
slot 1 sends the call to TG 100 on slot 2. This means TX idle can put
the same TG on both slots.

- **Menu:** a [key function](keys.md#assigning-functions-to-keys),
  code 60. One press turns it on, the next turns it off.

Whether the call goes out also depends on the channel's TX Allow
setting:

- `Always` and Same CC: TX idle can transmit.
- Diff CC: TX idle can transmit once the channel has received
  something. A VFO that has never received RF gives `Chan Busy` on PTT
  under Diff CC. This is a stock bug.
- `Channel free`: TX idle always fails.

## RX groups

A channel's RX group can now be cleared, and changes to it are saved
back to the channel. A **G** icon on the display shows when an RX group
is selected.

- **Storage:** channel record `+0x1C`, group-list index, `0xFF` = none.
  See [settings-storage.md](settings-storage.md#per-channel-settings).

The **RX Group** key function (code 65) opens the RX group list, where
you select or deselect the channel's RX group. The choice is always
saved to the channel. This function and holding `0` (direct dial)
also work on the call screen.

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
- **Manual dial:** press `*` on the manual dial screen to override the
  time slot.
