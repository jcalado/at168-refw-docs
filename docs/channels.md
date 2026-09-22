---
title: "Channels and monitoring"
description: "Per-channel promiscuous mode and squelch, an analog monitor key, and channel toggles"
---

## Per-channel promiscuous

Promiscuous mode (called Digi Moni in stock firmware) is stored with
each channel in reFW, so switching channels switches it too. Each
channel has a Promiscuous sub-menu with four items:

- `On/Off`: `Off`, `Single Slot` or `Double Slot`. Single Slot is no
  longer ignored.
- `CC Option`: `Any CC`, or `Same CC` to hear only this channel's
  colour code.
- `ID Option`: `Any Id` or `Same Id`.
- `Slot Hold`: `Off` or `On`.

Saving any of these also pins the channel's squelch to the level in
force at that moment (see [Squelch](#squelch)).

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

- **Menu:** Settings → Extras → Promiscuous
- **Options:** `Off`, `On`
- **Default:** `Off`
- **Storage:** reFW settings block `0x02E80000` + `0x10`, bit 5

This logic is evaluated inside the Promiscuous key routine, so it only
changes what that specific key press does.

## Squelch

The squelch level is stored with each channel; reFW has no global
squelch level. Changing only promiscuous on a channel also saves the
squelch level in force at that moment to the channel.

What the radio uses on a channel that has never had a squelch level
saved is `Not yet documented`.

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

## Slot Suit

Smart time slot management, switched on or off with one key. While it
is on, the radio monitors both **slot 1** and **slot 2** on a DMR
channel, without needing [promiscuous
mode](#per-channel-promiscuous), and manages the time slot itself: you
can't pick or swap the slot directly.

> [!NOTE]
> **Unconfirmed:** which slot a call you make goes out on while Slot
> Suit is on, and whether the setting is kept when you change channel
> or power-cycle the radio.

Slot Suit is a stock AnyTone function, not a reFW addition. Factory
firmware has it (the V1.05 image contains the label) but only offers it
on Chinese-market models. reFW makes it assignable on the others too.

- **Menu:** a [key function](keys.md#assigning-functions-to-keys),
  code 58

## APRS type

Turns **APRS on or off for the current channel**. Because it acts
per-channel, you can silence beaconing on the active channel without
changing APRS settings elsewhere in the codeplug.

- **Menu:** a [key function](keys.md#assigning-functions-to-keys),
  code 63
