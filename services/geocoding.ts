export interface ReverseGeocodingResult {
  address: string;
  city: string;
}

interface NominatimAddress {
  road?: string;
  pedestrian?: string;
  footway?: string;
  path?: string;
  residential?: string;
  suburb?: string;
  neighbourhood?: string;
  village?: string;
  town?: string;
  city?: string;
  municipality?: string;
}

interface NominatimResponse {
  address?: NominatimAddress;
}

const NOMINATIM_URL =
  "https://nominatim.openstreetmap.org/reverse";

const REQUEST_TIMEOUT = 8000;

function buildAddress(address?: NominatimAddress): string {
  if (!address) {
    return "Indirizzo non disponibile";
  }

  return (
    address.road ??
    address.pedestrian ??
    address.footway ??
    address.path ??
    address.residential ??
    address.suburb ??
    address.neighbourhood ??
    "Indirizzo non disponibile"
  );
}

function buildCity(address?: NominatimAddress): string {
  if (!address) {
    return "";
  }

  return (
    address.city ??
    address.town ??
    address.village ??
    address.municipality ??
    ""
  );
}

export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<ReverseGeocodingResult> {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT);

  try {
    const params = new URLSearchParams({
      lat: latitude.toString(),
      lon: longitude.toString(),
      format: "jsonv2",
      addressdetails: "1",
    });

    const response = await fetch(`${NOMINATIM_URL}?${params.toString()}`, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Reverse geocoding failed");
    }

    const data: NominatimResponse = await response.json();

    return {
      address: buildAddress(data.address),
      city: buildCity(data.address),
    };
  } catch (error) {
    console.error("Reverse geocoding error:", error);

    return {
      address: "Indirizzo non disponibile",
      city: "",
    };
  } finally {
    clearTimeout(timeout);
  }
}