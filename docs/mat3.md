---
title: "MAT3 live packet viewer"
description: "Streaming live DMR packet data via MAT3 over USB-C"
---

With MAT3 enabled, the radio streams live DMR frames out of its USB-C
port to the **MAT3** app on an Android phone, which decodes and shows
over-the-air traffic as it happens. Unlike the [Packet
log](packet-log.md), which records to flash for later download,
nothing is stored on the radio.

## What you need

- An **Android phone** running the **MAT3** app from
  [mat3.jcalado.com](https://mat3.jcalado.com).
- A standard **USB-C to USB-C** data cable. The phone acts as the USB
  host, so a regular phone cable works without needing the factory
  programming cable.

## Getting started

1. On the radio, set **Settings → Extras → MAT3** to `Enabled`, or
   press a key assigned to the [MAT3 function](#mat3-key-function).
   The setting is saved, so it stays enabled until you turn it off.
2. Connect your radio to your Android device using the USB-C cable.
3. Open the **MAT3** app on your phone and grant USB permissions when
   prompted. The app should detect the radio and start displaying live
   traffic immediately.

![The MAT3 app's Monitor tab: timeslot 1 and 2 status cards, filter
chips for packet types, a list of recent group calls on each timeslot,
and a live log of timestamped CALL, ALIAS, DATA, CACH and END
packets](./images/mat3-monitor.png)

> [!TIP]
> **Conserving phone battery:** When connected over USB-C, Android phones
> often attempt to charge the radio. To avoid draining the phone, set
> [USB charge](power.md#usb-charge) to `Off` in the Extras menu.

While MAT3 is enabled, the stream shares the USB port with programming,
so a CPS may need a retry or two to connect.

## MAT3 setting

- **Menu:** Settings → Extras → MAT3
- **Options:** `Disabled`, `Enabled`
- **Default:** `Disabled`
- **Storage:** reFW settings block `0x02E80000` + `0x11`, bit 3 (`0` =
  Disabled, `1` = Enabled). Flip-tested on a radio running
  `REFW-20260919-155710` on 2026-09-21; the setting survives a power
  cycle.

## MAT3 key function

Flips the MAT3 setting between enabled and disabled from a key, and
shows `MAT3 Enabled` or `MAT3 Disabled` to confirm. It changes the same
stored setting as Settings → Extras → MAT3, so the choice sticks. Useful
to assign to a side key if you use MAT3 often.

- **Menu:** a [key function](keys.md#assigning-functions-to-keys),
  code 64

> [!NOTE]
> **Still to be documented:** Full details on the raw USB wire protocol,
> front-panel responsiveness while streaming is active, and the cleanest
> exit sequence back to normal radio operation.
