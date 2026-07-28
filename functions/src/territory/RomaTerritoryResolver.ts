import {ROMA_BOUNDARY} from "./romaBoundary.generated";

type Position = readonly [number, number];
type Ring = readonly Position[];
type Polygon = readonly Ring[];
type MultiPolygon = readonly Polygon[];

export interface MunicipalityTerritory {
  municipalityCode: "058091";
  municipalityName: "Roma";
  provinceCode: "RM";
  regionCode: "12";
  regionName: "Lazio";
  source: "ISTAT_2026";
}

const ROMA_TERRITORY: MunicipalityTerritory = {
  municipalityCode: "058091",
  municipalityName: "Roma",
  provinceCode: "RM",
  regionCode: "12",
  regionName: "Lazio",
  source: "ISTAT_2026",
};

function isPointInRing(
  longitude: number,
  latitude: number,
  ring: Ring
): boolean {
  let inside = false;
  for (
    let current = 0, previous = ring.length - 1;
    current < ring.length;
    previous = current++
  ) {
    const [currentLongitude, currentLatitude] = ring[current];
    const [previousLongitude, previousLatitude] = ring[previous];
    const crossesLatitude =
      currentLatitude > latitude !== previousLatitude > latitude;
    const intersection =
      ((previousLongitude - currentLongitude) *
        (latitude - currentLatitude)) /
        (previousLatitude - currentLatitude) +
      currentLongitude;

    if (crossesLatitude && longitude < intersection) {
      inside = !inside;
    }
  }
  return inside;
}

function isPointInPolygon(
  longitude: number,
  latitude: number,
  polygon: Polygon
): boolean {
  if (polygon.length === 0) return false;
  if (!isPointInRing(longitude, latitude, polygon[0])) {
    return false;
  }
  return !polygon
    .slice(1)
    .some((hole) => isPointInRing(longitude, latitude, hole));
}

export function resolveRomaTerritory(
  latitude: unknown,
  longitude: unknown
): MunicipalityTerritory | null {
  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    return null;
  }

  const boundary = ROMA_BOUNDARY as MultiPolygon;
  return boundary.some((polygon) =>
    isPointInPolygon(longitude, latitude, polygon)
  ) ?
    ROMA_TERRITORY :
    null;
}
