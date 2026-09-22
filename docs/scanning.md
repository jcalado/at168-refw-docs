---
title: "Scanning and band limits"
description: "VFO scan limits and changing the radio's band mode from the menu"
---

## Scan range

Sets the frequency limits for VFO scanning: a start and end frequency
for **VHF**, and another pair for **UHF**. A VFO scan stays within the
limits for the band you're on.

Frequencies are keyed in directly in MHz, with five decimal places (for
example `136.00000`).

| Item | Default | Storage |
| --- | --- | --- |
| `VHF Start` | `136.00000` | `general_settings` + `0x60` |
| `VHF End` | `174.00000` | `general_settings` + `0x64` |
| `UHF Start` | `460.00000` | `general_settings` + `0x58` |
| `UHF End` | `480.00000` | `general_settings` + `0x5C` |

This adds no storage of its own: the four limits are the stock CPS-only
VFO scan range fields.

- **Menu:** Settings → Extras → Scan range, a sub-menu with the four
  items above
- **Storage:** 4 bytes each, a little-endian u32 in units of 10 Hz.
  Checked on a radio running `REFW-20260919-155710` on 2026-09-21:
  VHF Start 136.00000 → 144.12345 MHz changed `0x60`–`0x63` from
  `00 85 CF 00` to `39 EA DB 00` and nothing else. The other three read
  back as the values the menu showed.
- **Validation:** `Not yet documented` (behavior when Start is above
  End, or outside the radio's band mode, is not tested).

## Band mode

Lets you change the radio's operating frequency bands directly from the
menu, skipping the power-on button combination needed to reach the
factory engineering menu. The list offers 18 options: **Mode 00**
through **Mode 17**.

- **Menu:** Settings → Extras → Band mode
- **Options:** `Mode 00` … `Mode 17`
- **Default:** Whatever mode your radio was provisioned with from the
  factory
- **Storage:** *Not stored in the codeplug!* This lives in byte `+3` of
  the flash device-info block at address `0x02FA0000` (making its
  physical address `0x02FA0003`).

> [!WARNING]
> The device-info sector stores radio calibration and identity data. The
> firmware maintains an A/B mirror bank at `0x02FC0000` and validates
> bank headers on boot. Tooling authors should treat this byte as
> **read-only** unless their software implements the dual-bank checksum
> and rotation logic. Both `at168-cps` (work in progress) and
> `at168-flasher` guard this data; always back up `device-info` before
> experimenting with band modes.
