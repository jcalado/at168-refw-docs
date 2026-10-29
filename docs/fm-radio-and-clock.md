---
title: "FM radio and clock"
description: "RDS on the broadcast FM receiver, and setting the clock from a PC"
---

> [!NOTE]
> Most of this page comes from the changelog for build
> `REFW-20260919-155710`. Unless it says otherwise, the exact behavior
> has **not yet been documented** from a radio.

## FM radio RDS

The broadcast FM receiver decodes RDS. The reFW developer has
improved how reliably it decodes (October 2026).

With the FM radio on, the lower half of the screen (VFO B, which was
the selected side) shows the frequency in large digits, with the
station name from RDS under it. Whether it moves to the upper half
when VFO A is selected is `Not yet documented`.

![The FM radio on 94.30 MHz, with the RDS station name ANTENA 2 under
the frequency](./images/fm-radio-rds.png)

Checked on a radio on 29 October 2026, build `F7492020`, tuned to
94.30 MHz. The station name stayed on screen without scrolling or
changing over 12 seconds, and no other RDS text (such as RadioText)
appeared. Whether reFW shows
RadioText, clock time or other RDS data is `Not yet documented`.

## Clock sync

The real-time clock can be set from a PC. `at168-cps` does this from its
**REFW** tab or with `at168-cps set-clock --port …`, and can optionally
set it every time it reads or writes the radio.

The radio must be running normally, not in programming mode. The
command is one-way, so nothing confirms the clock was set. Stock
firmware ignores it.
