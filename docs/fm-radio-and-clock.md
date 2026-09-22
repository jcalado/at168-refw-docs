---
title: "FM radio and clock"
description: "RDS on the broadcast FM receiver, and setting the clock from a PC"
---

> [!NOTE]
> Most of this page comes from the changelog for build
> `REFW-20260919-155710`. Unless it says otherwise, the exact behavior
> has **not yet been documented** from a radio.

## FM radio RDS

The broadcast FM receiver decodes RDS.

## Clock sync

The real-time clock can be set from a PC. `at168-cps` does this from its
**REFW** tab or with `at168-cps set-clock --port …`, and can optionally
set it every time it reads or writes the radio.

The radio must be running normally, not in programming mode. The
command is one-way, so nothing confirms the clock was set. Stock
firmware ignores it.
