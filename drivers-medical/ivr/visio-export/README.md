# Visio export of the NewCo routing

Builds `../newco-routing.vsdx` and `../newco-routing.pdf` from `../newco-routing-map.html`, for the developers who asked for the routing as a Visio flow. It covers the phone line and web chat.

The routing map is the master copy. After changing the map, run:

```
drivers-medical/ivr/visio-export/build.sh
```

It needs Node and Python 3. The PDF also needs LibreOffice and `pdfunite` (poppler-utils); without them only the Visio file is rebuilt.

## What's in the file

For each channel, phone then web chat:

- **Overview**: the lanes and how they connect, with a key. Web chat shows its two designs: version A (reference first, preferred but not agreed) and version B (reason first).
- **Whole flow**: every step on one page, with each lane as a grey band and the "Go to lane" links drawn as real arrows. Web chat has one per design. The phone one is large (about 42 by 100 inches), for screen use.
- **One page per lane**, sized to print.

Each step shows its requirement IDs. Notes, scripts and open questions are in its Shape Data.

## How it works

- `extract.cjs` reads the map's data and its copy of dagre straight out of the HTML.
- `layout.cjs` lays out each lane, the overview and the whole flow with dagre.
- `build.py` writes the pages and packages them with the styles and Dynamic connector master from `template.vsdx`, a small file saved by Visio. The arrows have to be instances of that master: Visio reports the file as corrupt if they aren't. `template.vsdx` comes from the [vsdx](https://github.com/dave-howard/vsdx) project, under the BSD licence in `TEMPLATE-LICENSE.txt`.

LibreOffice opens files that Visio rejects, so a clean PDF doesn't prove the Visio file opens. Check any change to `build.py` in Visio itself.

This is tooling for a handover file, not a prototype, so it sits outside the no-build rule for prototypes.
