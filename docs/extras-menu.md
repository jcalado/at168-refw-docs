---
title: "Extra menu"
description: "Every item in Settings → Extra, with its options and default, linked to where it is described"
---

> [!NOTE]
> **Work in progress.** The items in the Extra menu are still being
> developed, and can change at any time: items may be added, renamed,
> reordered or removed between reFW builds.

**Settings → Extra** is reFW's own menu. This page lists its 4 items
in menu order. Each links to where it is described, alongside related
changes.

![The Extra menu: Band Mode, USB Charge, Packet Log and
MAT3](./images/extras-menu.png)

USB charge, Packet log and MAT3 are on/off toggles that take effect
the moment you flip them. Band mode opens a list of modes.

Most reFW options sit beside related stock settings in **Settings →
Radio Set** instead:

- **Audio:** [PF Beep](keys.md#pf-beep)
- **Display:** [Sub Text](display.md#sub-text),
  [Bat Icon](power.md#bat-icon) and
  [Bat Warning](power.md#bat-warning)
- **Keys:** [Hash Short and 0 Long … 9
  Long](keys.md#number-key-and--shortcuts), and [Knob and
  Up/Down](keys.md#knob-select)
- **Misc:** [Scan Range](scanning.md#scan-range) and
  [Hold Times](calls.md#hold-times)

| Item | What it does | Options | Default |
| --- | --- | --- | --- |
| [Band mode](scanning.md#band-mode) | Change band limits without the engineering menu | Mode 00 … Mode 17 | per radio |
| [USB charge](power.md#usb-charge) | Toggle battery charging over the USB-C port | On / Off | On |
| [Packet log](packet-log.md#turning-it-on) | Journal traffic to flash for later download | Off / On | Off |
| [MAT3](mat3.md#mat3-setting) | Stream DMR traffic over USB to the MAT3 app | Disabled / Enabled | Disabled |

Most of these are saved in reFW's own settings block in flash, not in
the codeplug, so reading or writing a codeplug doesn't carry them. See
[settings-storage.md](settings-storage.md).
