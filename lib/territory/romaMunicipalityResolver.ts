import {ROMA_MUNICIPI} from "./romaMunicipi.generated";

type Position = readonly [number, number];
type Ring = readonly Position[];
type Polygon = readonly Ring[];

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
  if (!polygon.length || !isPointInRing(longitude, latitude, polygon[0])) {
    return false;
  }
  return !polygon
    .slice(1)
    .some((hole) => isPointInRing(longitude, latitude, hole));
}

export function resolveRomaMunicipio(
  latitude: unknown,
  longitude: unknown
): {districtCode: string; districtName: string} | null {
  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    return null;
  }

  for (const municipio of ROMA_MUNICIPI) {
    if (
      municipio.boundary.some((polygon) =>
        isPointInPolygon(longitude, latitude, polygon)
      )
    ) {
      return {
        districtCode: municipio.code,
        districtName: municipio.name,
      };
    }
  }

  return null;
}
