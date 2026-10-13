"""Write a snapshot of the editor's database into data/*.js.

The editor artifact keeps the maps in its database (maps/<id>, registry/components).
Claude reads those documents out as JSON, then runs:

    python3 write-data.py <folder holding maps/*.json and registry/components.json>

Each map becomes data/<id>.js, the register becomes data/components.js, and the
script tags in index.html are rewritten so every map in the snapshot loads.
"""
import json
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).parent
DATA = HERE / "data"


def write(name, var, obj):
    body = json.dumps(obj, indent=2, ensure_ascii=False)
    (DATA / f"{name}.js").write_text(
        f"// {var}. Edited in the map editor; written back here as a snapshot.\n"
        "window.SM = window.SM || { maps: {} };\n"
        f"{var} = {body};\n"
    )


def main(src):
    src = pathlib.Path(src)
    DATA.mkdir(exist_ok=True)
    comps = json.loads((src / "registry" / "components.json").read_text())
    write("components", "SM.components", comps.get("items", []))
    maps = [json.loads(p.read_text()) for p in sorted((src / "maps").glob("*.json"))]
    maps.sort(key=lambda m: (m.get("order") or 0, m["id"]))
    keep = {"components.js"}
    for m in maps:
        if not re.fullmatch(r"[A-Za-z0-9_-]+", m["id"]):
            sys.exit(f"Unexpected map id: {m['id']!r}")
        write(m["id"], f"SM.maps[{json.dumps(m['id'])}]", m)
        keep.add(f"{m['id']}.js")
    for old in DATA.glob("*.js"):
        if old.name not in keep:
            old.unlink()
    tags = "\n".join(f'<script src="data/{n}"></script>' for n in ["components.js"] + [f"{m['id']}.js" for m in maps])
    index = HERE / "index.html"
    html = index.read_text()
    html, n = re.subn(r"<!-- data -->.*?<!-- /data -->", f"<!-- data -->\n{tags}\n<!-- /data -->", html, flags=re.S)
    if n != 1:
        sys.exit("index.html is missing its <!-- data --> markers")
    index.write_text(html)
    print(f"Wrote {len(maps)} maps and {len(comps.get('items', []))} components")


if __name__ == "__main__":
    main(sys.argv[1])
