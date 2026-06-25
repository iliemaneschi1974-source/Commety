export interface SearchResult {
  id: string;
  name: string;
  lat: number;
  lon: number;

  type: string;
  class: string;
 importance: number;

  boundingBox: [
    number,
    number,
    number,
    number
  ];
}

export async function searchPlaces(
  query: string
): Promise<SearchResult[]> {

  if (query.trim().length < 3) {
    return [];
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=8&q=${encodeURIComponent(
      query
    )}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Errore durante la ricerca.");
  }

  const data = await response.json();

return data.map((item: any) => ({
  id: item.place_id.toString(),
  name: item.display_name,

  lat: Number(item.lat),
  lon: Number(item.lon),

  type: item.type,
  class: item.class,
  importance: item.importance ?? 0,

  boundingBox: [
    Number(item.boundingbox[0]), // Sud
    Number(item.boundingbox[1]), // Nord
    Number(item.boundingbox[2]), // Ovest
    Number(item.boundingbox[3]), // Est
  ],
}));
}