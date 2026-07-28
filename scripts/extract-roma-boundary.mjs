import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { open } from "shapefile";
import proj4 from "proj4";

const sourceRoot = resolve(
  ".tmp-istat-roma-boundary",
  "Com01012026_g"
);
const outputPath = resolve(
  "functions",
  "src",
  "territory",
  "romaBoundary.generated.ts"
);

function squaredDistance(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return dx * dx + dy * dy;
}

function segmentDistance(point, start, end) {
  let x = start[0];
  let y = start[1];
  let dx = end[0] - x;
  let dy = end[1] - y;

  if (dx !== 0 || dy !== 0) {
    const t =
      ((point[0] - x) * dx + (point[1] - y) * dy) /
      (dx * dx + dy * dy);
    if (t > 1) {
      x = end[0];
      y = end[1];
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }

  dx = point[0] - x;
  dy = point[1] - y;
  return dx * dx + dy * dy;
}

function simplifyStep(points, first, last, tolerance, result) {
  let maxDistance = tolerance;
  let index = -1;
  for (let cursor = first + 1; cursor < last; cursor += 1) {
    const distance = segmentDistance(
      points[cursor],
      points[first],
      points[last]
    );
    if (distance > maxDistance) {
      index = cursor;
      maxDistance = distance;
    }
  }
  if (index === -1) return;
  if (index - first > 1) {
    simplifyStep(points, first, index, tolerance, result);
  }
  result.push(points[index]);
  if (last - index > 1) {
    simplifyStep(points, index, last, tolerance, result);
  }
}

function simplifyRing(ring, tolerance = 0.00003) {
  if (ring.length <= 5) return ring;
  const closed =
    squaredDistance(ring[0], ring[ring.length - 1]) === 0;
  const points = closed ? ring.slice(0, -1) : ring.slice();
  const result = [points[0]];
  simplifyStep(
    points,
    0,
    points.length - 1,
    tolerance * tolerance,
    result
  );
  result.push(points[points.length - 1]);
  if (closed) result.push(result[0]);
  return result;
}

const source = await open(
  `${sourceRoot}/Com01012026_g_WGS84.shp`,
  `${sourceRoot}/Com01012026_g_WGS84.dbf`
);

let roma;
for (;;) {
  const item = await source.read();
  if (item.done) break;
  if (item.value.properties.PRO_COM_T === "058091") {
    roma = item.value;
    break;
  }
}

if (!roma || roma.geometry.type !== "MultiPolygon") {
  throw new Error("Il confine ISTAT di Roma non è stato trovato.");
}

const coordinates = roma.geometry.coordinates.map((polygon) =>
  polygon.map((ring) =>
    simplifyRing(
      ring.map((position) =>
        proj4("EPSG:32632", "EPSG:4326", position)
      )
    )
  )
);
const sourcePoints = roma.geometry.coordinates.reduce(
  (sum, polygon) =>
    sum +
    polygon.reduce((ringSum, ring) => ringSum + ring.length, 0),
  0
);
const outputPoints = coordinates.reduce(
  (sum, polygon) =>
    sum +
    polygon.reduce((ringSum, ring) => ringSum + ring.length, 0),
  0
);

const contents = `/**
 * Confine del Comune di Roma estratto dai confini amministrativi ISTAT 2026.
 * Fonte: https://www.istat.it/storage/cartografia/confini_amministrativi/generalizzati/2026/Limiti01012026_g.zip
 * Codice ISTAT: 058091. Coordinate WGS84 [longitudine, latitudine].
 * File generato automaticamente: non modificare a mano.
 */
export const ROMA_BOUNDARY = ${JSON.stringify(coordinates)} as const;
`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, contents, "utf8");
console.log(
  JSON.stringify({ outputPath, sourcePoints, outputPoints })
);
