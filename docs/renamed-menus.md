---
title: "Renamed labels"
description: "Stock menus, functions and labels that reFW renames or rewords"
---

reFW renames several stock menus and functions, and tidies the wording
of others. These were checked against the firmware image of build
`REFW-20260919-155710`, compared with stock V1.05.

**Digi Moni is now Promiscuous.** The function and its shortcut behave
the same, apart from now being [stored per
channel](channels.md#promiscuous). The Extras item that extends it is
still called [Moni key](channels.md#moni-key).

**Radio Set groups** have new names:

| Stock | reFW |
| --- | --- |
| `Voice Func` | `Audio` |
| `Key Func` | `Keys` |
| `DISP Func` | `Display` |
| `Other Func` | `Misc` |

So key assignments now live under **Settings → Radio Set → Keys**. That
group also gains `Hash Short` and `0 Long` … `9 Long` for
[Extra remap](keys.md#extra-remap), plus a new `Key Tone` item.

**Other labels** were reworded, or had their capitalisation made
consistent (`Tx`/`Rx` become `TX`/`RX` throughout):

| Stock | reFW |
| --- | --- |
| `Tx Alias`, `Tx Allow`, `Tx Start`, `Tx End`, `Tx Idle` | `TX Alias`, `TX Allow`, `TX Start`, `TX End`, `TX Idle` |
| `TxPow Agc` | `TXPow Agc` |
| `Rx AGC`, `Rx Cdt`, `Rx Freq` | `RX AGC`, `RX CDT`, `RX Freq` |
| `Rx Group` (and the typo `Rx Gourp`) | `RX Group` |
| `ANA Rx`/`Tx`, `DIGI Rx`/`Tx` | `ANA RX`/`TX`, `DIGI RX`/`TX` |
| `Tx Form` | `TX Format` |
| `Tx Set` | `TX Options` |
| `CC Set` | `CC Option` (with a new `ID Option`) |
| `Any Cc`, `Same Cc` | `Any CC`, `Same ID` (with new `Any ID` and `Diff CC`) |
| `Infinity` | `Infinite` |
| `PRoaming CH 1` | `Roaming CH 1` |
| `CRCignore` | `CRC Ignore` |
| `No Tone` | `No subtone` |

Stock's `Local Record` label is gone. The capitalisation of **Menu** in
the button bar was also fixed.

These pairs were matched from the firmware's string tables. Where a
label disappeared and another appeared in its place, the pairing is
inferred from that swap rather than traced through menu code. The
Radio Set group names were confirmed on a radio.
