---
title: "Channels and monitoring"
description: "The Chan Set menu, per-channel promiscuous, squelch and options, a monitor key, Copy 2 VFO, and channel toggles"
---

## Chan Set menu

**Settings → Chan Set** edits the current channel. On reFW it has 33
items, in this order (checked on a radio with a digital channel
selected, 29 October 2026, build `F7492020`):

| # | Item | # | Item | # | Item |
| --- | --- | --- | --- | --- | --- |
| 1 | `New Chan` | 12 | `TX Prohibit` | 23 | `SMS Forbid` |
| 2 | `Delete Chan` | 13 | `Radio ID` | 24 | `Ack Forbid` |
| 3 | `CH Type` | 14 | `RX CC` | 25 | [`TX Idle`](calls.md#tx-idle) |
| 4 | `TX Power` | 15 | `TX CC` | 26 | `DMR Mode` |
| 5 | `Offset` | 16 | `R&T CC` | 27 | [`Slot Suit`](slot-suit.md) |
| 6 | [`Band width`](#bandwidth) | 17 | `Time Slot` | 28 | `CRC Ignore` |
| 7 | `RX Freq` | 18 | `Privacy` | 29 | [`Promiscuous`](#per-channel-promiscuous) |
| 8 | `TX Freq` | 19 | [`RX Group`](calls.md#rx-groups) | 30 | [`Call Ack`](#channel-options) |
| 9 | `TalkAround` | 20 | `Work Alone` | 31 | [`Auto Scan`](#channel-options) |
| 10 | `Name` | 21 | `CH Ranging` | 32 | [`Trunking`](#channel-options) |
| 11 | `TX Allow` | 22 | `APRS Rec` | 33 | [`SMS Ack`](#channel-options) |

With an analog channel selected, Chan Set shows a different list of
32 items instead (checked on a radio, 29 October 2026, build
`F7492020`). It has none of the DMR items above, and adds analog
signalling, squelch and audio options:

| # | Item | # | Item | # | Item |
| --- | --- | --- | --- | --- | --- |
| 1 | `New Chan` | 12 | `Reverse` | 23 | `2tone Enc` |
| 2 | `Delete Chan` | 13 | `Compander` | 24 | `2tone Dec` |
| 3 | `CH Type` | 14 | `Scrambler` | 25 | `5tone Enc` |
| 4 | `TCDT` | 15 | `RX Freq` | 26 | `5tone BOT` |
| 5 | `RCDT` | 16 | `TX Freq` | 27 | `5tone EOT` |
| 6 | `RTCDT` | 17 | `TalkAround` | 28 | `QDC1200` |
| 7 | `OPT signal` | 18 | `Name` | 29 | `PTT ID` |
| 8 | `TX Power` | 19 | `Busy Lock` | 30 | `Work Alone` |
| 9 | `Offset` | 20 | `TX Prohibit` | 31 | [`SQ Level`](#squelch) |
| 10 | [`Squelch`](#squelch) | 21 | `OWN ID` | 32 | [`Auto Scan`](#channel-options) |
| 11 | [`Band width`](#bandwidth) | 22 | `DTMF Enc` | | |

![The Chan Set menu on an analog channel, items 28 to 32: QDC1200,
PTT ID, Work Alone, SQ Level and Auto
Scan](./images/chan-set-analog-end.png)

## Per-channel promiscuous

Promiscuous mode (called Digi Moni in stock firmware) is stored with
each channel in reFW, so switching channels switches it too. Each
channel has a Promiscuous sub-menu with four items:

![The Promiscuous sub-menu: On/Off, CC Option, ID Option and Slot
Hold](./images/promiscuous-menu.png)

- `On/Off`: `Off`, `Single Slot` or `Double Slot`. Single Slot is no
  longer ignored.
- `CC Option`: `Any CC`, or `Same CC` to hear only this channel's
  colour code.
- `ID Option`: `Any Id` or `Same Id`.
- `Slot Hold`: `Off` or `On`.

![The Promiscuous On/Off list: Off, Single Slot and Double
Slot](./images/promiscuous-on-off.png)

Saving any of these also pins the channel's squelch to the level in
force at that moment (see [Squelch](#squelch)).

![The Chan Set menu, items 26 to 30: DMR Mode, Slot Suit, CRC Ignore,
Promiscuous and Call Ack](./images/chan-set-promiscuous.png)

- **Menu:** Settings → Chan Set → Promiscuous (item 29)
- **Storage:** the channel's extension record. See
  [settings-storage.md](settings-storage.md#per-channel-settings).

The list of items comes from the changelog for build
`REFW-20260919-155710`; their storage was checked on a radio.

## Promiscuous

Makes the Promiscuous key useful on analog channels. On stock firmware,
pressing it on an analog channel doesn't do much. With this setting on,
pressing Promiscuous on analog toggles the squelch fully open, so you
get an analog monitor key without giving up another programmable
button.

- **Menu:** Settings → Chan Set (`Unconfirmed`). It isn't one of the
  menu's 33 items on a digital channel, nor one of the 32 on an analog
  channel, nor one of the four in the Promiscuous sub-menu, so its
  label and place are `Not yet documented`
- **Options:** `Off`, `On` (`Unconfirmed`)
- **Default:** `Off` (`Unconfirmed`)
- **Storage:** `Not yet documented`, including whether it is now stored
  per channel

This logic is evaluated inside the Promiscuous key routine, so it only
changes what that specific key press does.

On reFW the Promiscuous key itself is a single toggle monitor on both
digital and analog channels: one press turns it on, the next turns it
off, with no need to hold the key. Stock firmware only toggles digital
promiscuous with it. The stock AnyTone CPS calls this key function
**Digital Monitor**.

> [!NOTE]
> Whether the key still needs this setting to act as a monitor
> on analog channels is `Unconfirmed`.

## Squelch

The squelch level is stored with each channel; reFW has no global
squelch level. Changing only promiscuous on a channel also saves the
squelch level in force at that moment to the channel.

What the radio uses on a channel that has never had a squelch level
saved is `Not yet documented`.

With an analog channel selected, Chan Set has two squelch items:
`Squelch` (item 10) and `SQ Level` (item 31). What each one sets, and
how they relate to the stored level, is `Not yet documented`.

- **Storage:** the channel's extension record. See
  [settings-storage.md](settings-storage.md#per-channel-settings).

## Bandwidth

On an analog channel, this swaps **25 kHz** (wide) and **12.5 kHz**
(narrow) without opening channel edit. Useful when a channel turns out
to be programmed at the wrong deviation for what you're actually
hearing.

It does nothing on a DMR channel.

- **Menu:** a [key function](keys.md#assigning-functions-to-keys),
  code 59

## APRS type

Turns **APRS on or off for the current channel**. Because it acts
per-channel, you can silence beaconing on the active channel without
changing APRS settings elsewhere in the codeplug.

- **Menu:** a [key function](keys.md#assigning-functions-to-keys),
  code 63

## Channel options

The last items in Chan Set, after
[Promiscuous](#per-channel-promiscuous):

- `Call Ack`: call confirmation. Stock firmware only lets you set this
  from CPS.
- `Auto Scan`: starts auto scan straight away. It runs on the main
  screen only.
- `Trunking`: not implemented yet. Selecting it shows a "Not Yet
  Implemented" message, which closes by itself after a few seconds.
- `SMS Ack`: sends an acknowledgement for a received message. This is
  separate from `SMS Forbid`.

![The Chan Set menu, items 29 to 33: Promiscuous, Call Ack, Auto Scan,
Trunking and SMS Ack](./images/chan-set-options.png)

On an analog channel only `Auto Scan` is offered, as item 32; the
other three are DMR-only.

Call Ack, Auto Scan and SMS Ack each open the same two-item list:

![The Auto Scan list: Off and On](./images/auto-scan-options.png)

![The message Trunking shows: Not Yet
Implemented](./images/trunking-not-implemented.png)

- **Menu:** Settings → Chan Set → Call Ack, Auto Scan, Trunking and
  SMS Ack (items 30 to 33 on a digital channel)
- **Options:** `Off`, `On` for Call Ack, Auto Scan and SMS Ack; none
  for Trunking (read on a radio, 29 October 2026, build `F7492020`)
- **Default:** `Not yet documented`
- **Storage:** `Not yet documented`

## Copy 2 VFO

Copies the current memory channel to the VFO and switches to VFO mode.

The VFO channel is not saved to flash straight away. It is written
eventually, when a later action triggers a flash save.

- **Menu:** a [key function](keys.md#assigning-functions-to-keys),
  code `Not yet documented`

## Using AnyTone's CPS

AnyTone's own CPS still works with a reFW radio for now, but may not in
future. A read followed by a write loses reFW's per-channel settings
([promiscuous](#per-channel-promiscuous) and [squelch](#squelch)),
because reFW keeps them in the channel extension records (see
[settings-storage.md](settings-storage.md#per-channel-settings)).
reFW's Extra settings live separately and are not affected.
