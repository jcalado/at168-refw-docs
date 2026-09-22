---
title: "Power and battery"
description: "Battery voltage display, a dismissable low-battery warning, and USB charging control"
---

## Batt view

Sets how battery status appears at the top of the display: the
three-segment **Icon**, or a measured **Voltage** reading (for example,
`8.1V`).

- **Menu:** Settings → Extras → Batt view
- **Options:** `Icon`, `Voltage`
- **Default:** `Icon`
- **Storage:** reFW settings block `0x02E80000` + `0x10`, bit 0 (`0` =
  Icon, `1` = Voltage)

## Low battery

Decides whether you can dismiss the low-battery warning screen.

In factory firmware (**Locked**), the low-battery pop-up takes over the
display and refuses to leave until you plug in a charger. Setting this
to **Skippable** lets you press the Red (Back) key to dismiss the pop-up
so you can finish what you were doing.

- **Menu:** Settings → Extras → Low battery
- **Options:** `Locked`, `Skippable`
- **Default:** `Locked`
- **Storage:** reFW settings block `0x02E80000` + `0x10`, bit 2 (`0` =
  Locked, `1` = Skippable)

Dismissing the prompt does not change the battery state: the cell remains
depleted, and the radio still cuts power once voltage drops to the hard
cutoff limit.

## USB charge

Controls whether the radio draws battery charging power over its USB-C
port. Disabling charging is useful when the radio is tethered to a
laptop or phone for long sessions (such as [packet
logging](packet-log.md) or running [MAT3](mat3.md)) to avoid draining
the host battery.

- **Menu:** Settings → Extras → USB charge
- **Options:** `On`, `Off`
- **Default:** `On`
- **Storage:** reFW settings block `0x02E80000` + `0x11`, bit 1. Note
  that this bit is **stored inverted**: a raw `0` enables charging, and
  raw `1` turns charging off.
