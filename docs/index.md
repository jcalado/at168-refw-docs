---
title: "reFW for the AnyTone AT-D168UV"
description: "Community documentation for reFW, a custom firmware for the AnyTone AT-D168UV handheld radio."
tableOfContents: false
---

reFW builds directly on top of AnyTone's factory firmware. These pages
cover everything it changes, grouped by what you're doing with the
radio: most new options live in **Settings → Extras**, and reFW also
adds key functions, stores some settings per channel, renames labels
and fixes bugs across the rest of the radio.

![The radio's home screen in dual-VFO mode: the date and time, an
analog channel above a DMR channel, each with its channel and zone
name, and the battery shown as a voltage in the top corner](./images/radio-home-screen.png)

The home screen on reFW, with the battery shown as a voltage by
[Batt view](power.md#batt-view).

Standing at the radio looking at a menu? The [Extras
menu](extras-menu.md) and [Shortcut functions](shortcuts.md) pages list
every item and link to where it is described.

## What's here

### Using the radio

<!-- pages: Using the radio -->
| Page | Description |
| --- | --- |
| [Display and indicators](display.md) | Idle screen options, backlight and dimming shortcuts, and new icons |
| [Keys and navigation](keys.md) | Assigning functions to keys, number-key and # shortcuts, the knob, and faster menu entry |
| [Calls, contacts and RX groups](calls.md) | Contact list shortcuts, call hold times, time slot fallback, RX groups and manual dial |
| [Channels and monitoring](channels.md) | Per-channel promiscuous mode and squelch, an analog monitor key, and channel toggles |
| [Scanning and band limits](scanning.md) | VFO scan limits and changing the radio's band mode from the menu |
| [Power and battery](power.md) | Battery voltage display, a dismissable low-battery warning, and USB charging control |
| [FM radio and clock](fm-radio-and-clock.md) | RDS on the broadcast FM receiver, and setting the clock from a PC |
<!-- /pages -->

### Watching DMR traffic

<!-- pages: Watching DMR traffic -->
| Page | Description |
| --- | --- |
| [MAT3 live packet viewer](mat3.md) | Streaming live DMR packet data via MAT3 over USB-C |
| [Packet log](packet-log.md) | Recording DMR traffic to flash and pulling the log off the radio |
<!-- /pages -->

### Reference

<!-- pages: Reference -->
| Page | Description |
| --- | --- |
| [Extras menu](extras-menu.md) | Every item in Settings → Extras, with its options and default, linked to where it is described |
| [Shortcut functions](shortcuts.md) | Every function reFW adds to the assignable key list, linked to where it is described |
| [Renamed labels](renamed-menus.md) | Stock menus, functions and labels that reFW renames or rewords |
| [Bug fixes](bug-fixes.md) | Stock firmware bugs that reFW fixes |
<!-- /pages -->

### For tool authors

<!-- pages: For tool authors -->
| Page | Description |
| --- | --- |
| [Settings storage](settings-storage.md) | Memory and codeplug offsets for developers building custom CPS tools |
| [Packet log format](packet-log-format.md) | Flash layout and record format of the packet log, for tools that read it |
<!-- /pages -->

## What this site is (and isn't)

These docs focus on the radio from an operator's perspective, paired
with just enough under-the-hood storage details so folks writing
third-party CPS or tools can reliably read and write settings.

This is neither the source code for reFW nor a guide on compiling it
from scratch.

## How we document things

Whenever we cover a setting, you'll find the available **options**, the
factory **default**, and where it lands in **storage**.

We value accuracy over guesswork: if something hasn't been verified on
physical hardware or in disassembly, we explicitly label it as
`Unconfirmed` or `Not yet documented`. If you spot something new or can
fill in a gap, see
[CONTRIBUTING.md](https://github.com/jcalado/at168-refw-docs/blob/main/CONTRIBUTING.md).
