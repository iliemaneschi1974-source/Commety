import {mkdir, readFile, writeFile} from "node:fs/promises";
import {dirname, resolve} from "node:path";

const sourcePath = resolve(
  "functions",
  "src",
  "territory",
  "romaMunicipi.source.geojson"
);
const sourceUrl =
  "https://services-eu1.arcgis.com/CQGl8ODCKnscqiME/ArcGIS/rest/services/Perimetrazioni_Comune_di_Roma/FeatureServer/0/query?where=1%3D1&outFields=MUNICIPIO%2CDENOMINAZI%2CCOD_ISTAT&returnGeometry=true&outSR=4326&f=geojson";
const outputPaths = [
  resolve("functions", "src", "territory", "romaMunicipi.generated.ts"),
  resolve("lib", "territory", "romaMunicipi.generated.ts"),
];

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
  let maximum = tolerance;
  let index = -1;
  for (let cursor = first + 1; cursor < last; cursor += 1) {
    const distance = segmentDistance(
      points[cursor],
      points[first],
      points[last]
    );
    if (distance > maximum) {
      maximum = distance;
      index = cursor;
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

function simplifyRing(ring, tolerance = 0.00002) {
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

let sourceContents;
try {
  sourceContents = await readFile(sourcePath, "utf8");
} catch {
  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(
      `Download dei confini municipali non riuscito: ${response.status}.`
    );
  }
  sourceContents = await response.text();
}

const source = JSON.parse(sourceContents);
const municipi = source.features
  .filter((feature) => /^\d+$/.test(feature.properties.MUNICIPIO))
  .map((feature) => {
    const polygons =
      feature.geometry.type === "MultiPolygon" ?
        feature.geometry.coordinates :
        [feature.geometry.coordinates];
    return {
      code: String(feature.properties.MUNICIPIO),
      name: String(feature.properties.DENOMINAZI),
      boundary: polygons.map((polygon) =>
        polygon.map((ring) => simplifyRing(ring))
      ),
    };
  })
  .sort((first, second) => Number(first.code) - Number(second.code));

if (municipi.length !== 15) {
  throw new Error(`Attesi 15 Municipi, trovati ${municipi.length}.`);
}

const contents = `/**
 * Confini dei 15 Municipi di Roma Capitale, coordinate WGS84.
 * Fonte cartografica: layer pubblico "Perimetrazioni Comune di Roma".
 * https://services-eu1.arcgis.com/CQGl8ODCKnscqiME/ArcGIS/rest/services/Perimetrazioni_Comune_di_Roma/FeatureServer/0
 * File generato automaticamente: non modificare a mano.
 */
export const ROMA_MUNICIPI = ${JSON.stringify(municipi)} as const;
`;

for (const outputPath of outputPaths) {
  await mkdir(dirname(outputPath), {recursive: true});
  await writeFile(outputPath, contents, "utf8");
}

console.log(JSON.stringify({
  municipi: municipi.length,
  outputPaths,
}));
