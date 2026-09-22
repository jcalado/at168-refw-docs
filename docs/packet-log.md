---
title: "Packet log"
description: "Recording DMR traffic to flash and pulling the log off the radio"
---

reFW can journal radio traffic to flash and let you pull it off the radio
later. It is a debugging and curiosity tool: nothing on the radio reads
the log back, and nothing the radio does depends on it. To watch traffic
live instead, use [MAT3](mat3.md).

## Turning it on

When on, packet headers and metadata are written sequentially to a
reserved region of SPI flash outside the codeplug, so reading or
writing a codeplug never disturbs the log.

- **Menu:** Settings → Extras → Packet log
- **Options:** `Off`, `On`
- **Default:** `Off`
- **Storage:** reFW settings block `0x02E80000` + `0x11`, bit 2, outside
  the codeplug (see
  [settings-storage.md](settings-storage.md#0x11-extras-flags-byte-2)).
  A codeplug write does not set it.

## Downloading

With `at168-cps` (work in progress):

```sh
uv run at168-cps packet-log --port /dev/ttyUSB0            # decoded, to stdout
uv run at168-cps packet-log --port /dev/ttyUSB0 > log.txt  # progress stays on stderr
uv run at168-cps packet-log --port /dev/ttyUSB0 --limit 8  # first 8 pages only
```

The CPS GUI has the same thing on its **REFW** tab.

- The download is **read-only**. Nothing in these tools writes to the log
  region.
- The log is a ring of pages written oldest-first; reading it does not
  clear it.

For the flash layout and record format, see [Packet log
format](packet-log-format.md).
