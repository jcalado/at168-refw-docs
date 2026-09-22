---
title: "Extras menu"
description: "Every item in Settings → Extras, with its options and default, linked to where it is described"
---

> [!NOTE]
> **Work in progress.** The items in the Extras menu are still being
> developed, and can change at any time: items may be added, renamed,
> reordered or removed between reFW builds.

reFW puts most of its custom options into a single menu on the radio:
**Settings → Extras**. This page lists its 16 items in menu order, as
of build `REFW-20260919-155710`. Each links to where it is described,
alongside related changes.

Most are simple on/off toggles that take effect the moment you flip
them. Three open sub-screens: Band mode, Scan range and Hold times.

| Item | What it does | Options | Default |
| --- | --- | --- | --- |
| [Batt view](power.md#batt-view) | Battery as an icon, or as a live voltage reading | Icon / Voltage | Icon |
| [Knob mode](keys.md#knob-mode) | Swap what the knob and the up/down keys step through | Channel / Zone | Zone |
| [Low battery](power.md#low-battery) | Whether the low-battery warning can be dismissed | Locked / Skippable | Locked |
| [Faster](display.md#faster) | Speed of the marquee / alternating text cycle | Off / On | Off |
| [Select 1st](calls.md#select-1st) | Move "Select" to the top of contact lists | Off / On | Off |
| [Promiscuous](channels.md#promiscuous) | Promiscuous key also toggles squelch on analog | Off / On | Off |
| [LP1 silent](keys.md#lp1-silent) | Silence the extra-long-press beep | Off / On | Off |
| [Extra remap](keys.md#extra-remap) | Make number-key long presses and `#` remappable | Off / On | Off |
| [VFO marker](display.md#vfo-marker) | Mark the active VFO in dual-VFO mode | Off / On | Off |
| [Band mode](scanning.md#band-mode) | Change band limits without the engineering menu | Mode 00 … Mode 17 | per radio |
| [USB charge](power.md#usb-charge) | Toggle battery charging over the USB-C port | On / Off | On |
| [Show cont](display.md#show-cont) | Alternate contact name with zone name on idle | Off / On | Unconfirmed |
| [Packet log](packet-log.md#turning-it-on) | Journal traffic to flash for later download | Off / On | Off |
| [Scan range](scanning.md#scan-range) | VHF and UHF scan limits for VFO mode | sub-menu | none |
| [Hold times](calls.md#hold-times) | How long received and dialled calls are held | sub-menu | 6s each |
| [MAT3](mat3.md#mat3-setting) | Stream DMR traffic over USB to the MAT3 app | Disabled / Enabled | Disabled |

Most of these are saved in reFW's own settings block in flash, not in
the codeplug, so reading or writing a codeplug doesn't carry them. See
[settings-storage.md](settings-storage.md).
