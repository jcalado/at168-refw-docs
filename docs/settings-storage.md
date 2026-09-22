---
title: "Settings storage"
description: "Memory and codeplug offsets for developers building custom CPS tools"
---

Notes for CPS and tooling authors: where reFW keeps its settings, in
flash and in the codeplug.

On current builds, reFW keeps almost all of its own settings in a
512-byte **reFW settings block** in flash at `0x02E80000`, outside the
codeplug. A codeplug read or write does not touch it. The exceptions are
Extras items that just expose a stock setting, which stay in the stock
codeplug field (see [below](#stock-fields-exposed-in-extras)).

Everything on this page was checked on a radio running
`REFW-20260919-155710` on 2026-09-21, by reading the block and the
codeplug before and after changing settings, and against that firmware
image.

## The reFW settings block

| Offset | Size | Contents |
| --- | --- | --- |
| `0x00` | 4 | ASCII `REFW`: validity tag used by host tools to detect reFW |
| `0x04`-`0x0F` | 12 | Not yet documented (zero on the test radio) |
| `0x10` | 1 | [Extras flags, byte 1](#0x10-extras-flags-byte-1) |
| `0x11` | 1 | [Extras flags, byte 2](#0x11-extras-flags-byte-2) |
| `0x12`-`0x3F` | 46 | Not yet documented (zero on the test radio) |
| `0x40` | 1 | [Key function](#key-functions), `#` short press (Hash Short) |
| `0x41`-`0x4A` | 10 | [Key functions](#key-functions), `0 Long` … `9 Long` |
| `0x4B`-`0x1FF` | | Not yet documented (zero on the test radio) |

The firmware loads the block into RAM at startup and writes all 512
bytes back whenever a setting changes. If the block doesn't start with
`REFW`, reFW treats it as blank: it zeroes the block, writes the tag,
sets `0 Long` to `16` (Dial), and saves it. So a fresh install starts
with every flag at `0` and every other key function at `0` (OFF).

reFW keeps a second copy, bank B, at `0x02EA0000`. Each bank has status
words at the end of its 128 KiB sector: a bank is *live* when `+0x1FFFC`
holds `55 55 AA AA` and `+0x1FFF8` doesn't hold the retired tag
`AA AA 55 55`. At boot the firmware loads bank A (`0x02E80000`) if A is
live, otherwise bank B. Each save erases and writes the bank that isn't
live, marks it live, and retires the other.

On the test radio both banks were marked live and neither was retired,
so the firmware loads bank A. Writing the 512 bytes of bank A through the
normal program-mode protocol works: on 2026-09-21 an `at168-cps` write
changed Knob mode, MAT3 and Show cont, and the radio booted with all
three. Tools should write **bank A only** and never touch either bank's
status words. Program-mode reads of bank B aren't a reliable view of it:
the same address read as a clean copy of A once, and as unrelated bytes
before and after.

### `0x10`: Extras flags, byte 1

| Bit | Extras item | Values | Evidence |
| --- | --- | --- | --- |
| 0 | [Batt view](power.md#batt-view) | 0 = Icon, 1 = Voltage | Matches radio |
| 1 | [Knob mode](keys.md#knob-mode) | 0 = Channel, 1 = Zone | Flip-tested |
| 2 | [Low battery](power.md#low-battery) | 0 = Locked, 1 = Skippable | Matches radio |
| 3 | [Faster](display.md#faster) | 0 = Off, 1 = On | Matches radio |
| 4 | [Select 1st](calls.md#select-1st) | 0 = Off, 1 = On | Matches radio |
| 5 | [Promiscuous](channels.md#promiscuous) | 0 = Off, 1 = On | Matches radio |
| 6 | [LP1 silent](keys.md#lp1-silent) | 0 = Off, 1 = On | Matches radio |
| 7 | [Extra remap](keys.md#extra-remap) | 0 = Off, 1 = On | Matches radio |

### `0x11`: Extras flags, byte 2

| Bit | Extras item | Values | Evidence |
| --- | --- | --- | --- |
| 0 | [VFO marker](display.md#vfo-marker) | 0 = Off, 1 = On | Firmware |
| 1 | [USB charge](power.md#usb-charge) | **inverted**: 0 = charging on, 1 = off | Firmware |
| 2 | [Packet log](packet-log.md#turning-it-on) | 0 = Off, 1 = On | Firmware |
| 3 | [MAT3](mat3.md#mat3-setting) | 0 = Disabled, 1 = Enabled | Flip-tested |
| 4-7 | | unused so far | |

**Evidence** column:

- **Flip-tested:** changing the setting on the radio changed only this
  bit, and it survived a power cycle.
- **Matches radio:** the bit agrees with what the radio's menu showed,
  from a single reading. The order and the firmware's menu code
  (item *n* reads bit *n*) back this up.
- **Firmware:** read from the `REFW-20260919-155710` code that uses the
  bit (USB charge sits next to the battery-voltage checks, Packet log
  gates the log flush), not yet observed on a radio.

In RAM, `0x10` and `0x11` form one little-endian 16-bit word, so the
firmware's own numbering runs from Batt view (bit 0) to MAT3 (bit 11).

### Key functions

Offsets `0x40`-`0x4A` each hold one key-function code: `0x40` for the
`#` key's short press, then `0 Long` through `9 Long`. Checked on a
radio: all four keys that were assigned read back as the codes of the
functions the menu showed.

Codes index a 66-entry function table (`0..65`). `0..57` are the stock
functions. reFW adds:

| Code | Function |
| --- | --- |
| 58 | [Slot Suit](channels.md#slot-suit) |
| 59 | [Bandwidth](channels.md#bandwidth) |
| 60 | [TX Idle](calls.md#tx-idle) |
| 61 | [Night Mode](display.md#night-mode) |
| 62 | [Light Time](display.md#light-time) |
| 63 | [APRS Type](channels.md#aprs-type) |
| 64 | [MAT3](mat3.md#mat3-key-function) |
| 65 | [RX Group](calls.md#rx-groups) |

At startup reFW resets any of these eleven bytes above `65` (`0x41`):
`0 Long` goes back to `16` and the rest to `0`. Tools should still
enum-constrain them: whether the key dispatcher itself checks the code
is `Not yet documented`, and the startup reset only runs at boot.

## Not in the stock codeplug area

None of reFW's own settings live in `general_settings`. Changing Knob
mode and MAT3 on the radio changed the reFW block and no codeplug byte,
and the block's startup code never reads the codeplug. Bytes `0xEB` and
`0xEF` of `general_settings` are not reFW settings.

## Stock fields exposed in Extras

Some Extras items don't add storage. They put a stock CPS-only setting
into the radio's menu, and the value stays in the stock codeplug field:

| Extras item | Stock field | Location |
| --- | --- | --- |
| [Show cont](display.md#show-cont) | `show_current_contact` | `general_settings` + `0xB9`, bit 0 (0 = Off, 1 = On) |
| [Hold times](calls.md#hold-times) → Private | `private_call_hang_time` | `general_settings` + `0x1A` |
| [Hold times](calls.md#hold-times) → Group | `group_call_hang_time` | `general_settings` + `0x19` (not flip-tested) |
| [Hold times](calls.md#hold-times) → Dial Private | `man_dial_private_call_hang_time` | `extended_settings` + `0x38` |
| [Hold times](calls.md#hold-times) → Dial Group | `man_dial_group_call_hang_time` | `extended_settings` + `0x37` |
| [Scan range](scanning.md#scan-range) → VHF Start / End | `min_`/`max_vfo_scan_frequency_vhf` | `general_settings` + `0x60` / `0x64` |
| [Scan range](scanning.md#scan-range) → UHF Start / End | `min_`/`max_vfo_scan_frequency_uhf` | `general_settings` + `0x58` / `0x5C` |

Checked by diffing codeplug reads around changes on the radio. The four
hold times store the menu option's position in the list: `0`–`29` =
1–30 s, `30` = 30 min, `31` = Infinite. The scan range limits are
little-endian u32 values in units of 10 Hz.

## Not in the codeplug

| Setting | Where |
| --- | --- |
| reFW settings | `0x02E80000`, 512 bytes (see [above](#the-refw-settings-block)) |
| Band mode | Device-info block, `0x02FA0003` (byte +3 of `0x02FA0000`), mirrored at `0x02FC0000`. Read-only for third-party tools (see [extras-menu.md](scanning.md#band-mode)) |
| Packet log contents | Flash at `0x0D200000` (page table) and `0x0D400000`-`0x0D800000` (pages; see [packet-log.md](packet-log.md)) |
| License | 96-byte blob at `0x02EC0000`. Not covered by any codeplug element, so codeplug reads and writes cannot disturb an installed license. |

## Reading the block

The block reads like any other flash region in program mode: 16-byte
reads at the ordinary programming-cable speed, the same session
`at168-cps detect-refw` uses. Leaving program mode reboots the radio.

With [MAT3](mat3.md#mat3-setting) enabled, the radio streams packet data
over the same USB port, and the program-mode handshake can fail with a
reply starting `84 A9 61` (the packet record signature). Retrying
usually succeeds.

## Per-channel settings

reFW's per-channel settings ([promiscuous and
squelch](channels.md#per-channel-promiscuous)) live in each channel's
64-byte **channel extension** record, which sits `0x2000` after the
channel's own record (channel *n* in bank *n* / 128, slot *n* % 128;
banks are `0x40000` apart from `0x00800000`). The RX group stays in the
stock channel record.

| Setting | Location | Values |
| --- | --- | --- |
| Promiscuous → On/Off | extension `+0x04`, bits 0–1 | 0 = Off, 1 = Single Slot, 2 = Double Slot (3 = unset, all-`0xFF` record) |
| Promiscuous → ID Option | extension `+0x04`, bit 2 | 0 = Any Id, 1 = Same Id |
| Promiscuous → CC Option | extension `+0x04`, bit 3 | 0 = Any CC, 1 = Same CC |
| Slot hold | extension `+0x04`, bit 4 | 0 = Off, 1 = On |
| Squelch level | extension `+0x09`, bits 0–2 | level |
| Squelch flag | extension `+0x09`, bit 3 | 1 = the channel has a saved level; 0 is `Not yet documented` (reFW has no global squelch) |
| RX group | channel `+0x1C` | group-list index, `0xFF` = none |

Checked on a radio running `REFW-20260919-155710` on 2026-09-21, on
channels 169 (`CQ0DMS TS1`) and 211 (`LX`), by diffing full codeplug
reads:

- Promiscuous Off → Single Slot changed extension `+0x04` from `00` to
  `01`. It also wrote `+0x09` = `09` (level 1, flag set), matching VFO
  A's squelch of 1, though the squelch wasn't touched.
- Promiscuous Single → Double Slot with Slot hold turned on changed
  `+0x04` from `01` to `12`.
- Clearing the RX group changed channel `+0x1C` from `0` to `0xFF`.
- On channel 211 (`LX`), changing the squelch from 2 to 4 changed
  extension `+0x09` from `0A` to `0C` (flag already set).
- Setting CC Option to Same CC and ID Option to Same Id together changed
  `+0x04` from `10` to `1C`. Which bit is which comes from the firmware:
  the channel-edit menu reads CC Option from bit 3 of that byte.

## Unmapped

Every Extras item's storage is now mapped. PF-key assignments in the
Keys menu have not been checked against the reFW block yet.
