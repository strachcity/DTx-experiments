# Visio export of the NewCo phone routing

Builds `../newco-phone-routing.vsdx` and `../newco-phone-routing.pdf` from `../newco-routing-map.html`, for the developers who asked for the routing as a Visio flow.

The routing map is the master copy. After changing the map, run:

```
drivers-medical/ivr/visio-export/build.sh
```

It needs Node and Python 3. The PDF also needs LibreOffice and `pdfunite` (poppler-utils); without them only the Visio file is rebuilt.

## What's in the file

- **Overview**: the seven phone lanes and how they connect, with a key.
- **Whole flow**: every step on one page, with each lane as a grey band and the "Go to lane" links drawn as real arrows. Large (about 42 by 100 inches), for screen use.
- **Lane 1 to Lane 7**: one page per lane, sized to print.

Each step shows its requirement IDs. Notes, scripts and open questions are in its Shape Data.

## How it works

- `extract.cjs` reads the map's data and its copy of dagre straight out of the HTML.
- `layout.cjs` lays out each lane, the overview and the whole flow with dagre.
- `build.py` writes the `.vsdx` package directly, with no Visio template or library.

This is tooling for a handover file, not a prototype, so it sits outside the no-build rule for prototypes.
