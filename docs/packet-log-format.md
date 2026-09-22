---
title: "Packet log format"
description: "Flash layout and record format of the packet log, for tools that read it"
---

Notes for tools that read the [packet log](packet-log.md).

## Where the log lives

The log sits in flash outside the codeplug region, so reading or
writing a codeplug never disturbs it.

| Region | Address | Notes |
| --- | --- | --- |
| Page table | `0x0D200000`, 4096 bytes | 1024 × 4-byte little-endian page pointers, in write order. The first erased entry (`0xFFFFFFFF`) ends the log. |
| Pages | `0x0D400000` … `0x0D800000` | 4096 bytes each |
| Spare area | stride `0x20000`, offset `0x1F000`, 256 bytes | |

Reads run at **921600 baud**.

## Record format

Records are written back-to-back into a page, 2-byte aligned, with `0xFF`
meaning erased. Each record is a tag byte, then a 6-byte header, then the
payload padded to alignment. Header bytes `0..2` are the constant
signature `84 A9 61` and `3..4` the payload length (big-endian u16).
Header byte `5` is not understood.

| Tag | Name | What it is |
| --- | --- | --- |
| `0x2A` | `tune` | The radio settled on a frequency; the frames that follow were logged on it. 8 bytes: frequency as u32 LE in units of 10 Hz, then a timestamp. |
| `0x3C` | `frame_in` | A frame, written by the firmware with the tag `<` |
| `0x3E` | `frame_out` | A frame, written with the tag `>` |

Which end of the link `<` and `>` actually mean is **not** established.
Decoders should show the arrow the firmware chose rather than relabel it
as TX/RX.

## Existing readers

`at168-cps` declares the layout above as data in
`at168_cps/defs/packetlog/d168uv.json`, so a change in the firmware's
log format is a JSON edit rather than a code change.

The original tool is DualTachyon's `at-log.py`, which reads the same
region; `at168-cps`'s reader is a port of it.
