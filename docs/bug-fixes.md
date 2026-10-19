---
title: "Bug fixes"
description: "Stock firmware bugs that reFW fixes"
---

This page comes from the changelog for build `REFW-20260919-155710`
and from notes by the reFW developer (October 2026). Unless it says
otherwise, the exact behavior and storage have **not yet been
documented** from a radio. Treat it as a map of what to look for, not
as verified detail.

reFW fixes these stock firmware bugs:

- Wrong time slot tagging and call tracking on invalid air frames.
- Deleting a channel from VFO B.
- Group contacts not holding correctly.
- Deleting contacts and RX groups.
- A frozen, glitchy UI when PTT is pressed just as the hold timer
  expires.
- Garbled Talker Alias text.
- The hotkey contact function.
- Squelch in satellite mode.
- A channel saved from VFO didn't increase the channel count, so it
  stayed hidden in the zone editor until the radio was rebooted.
- A custom background image being wrongly detected.
- Band mode 14 wiping the codeplug. Stock forces Band 0 and wipes the
  codeplug when the model name doesn't start with `168#` and Band is
  14. reFW removes this, and Band mode 14 behaves like any other
  [band mode](scanning.md#band-mode).
- The [Hold times](calls.md#hold-times) pop-up showing the wrong value.
- [Hang](calls.md#ending-a-hold) not stopping the call audio, and the
  red key's label staying on `Hang` after a hold expired.
- The knob still acting on the call screen.
- Restore and update mode.
- A bug in professional mode.

Settings are also only written to flash when they actually change.
Stock rewrites them on every change.
