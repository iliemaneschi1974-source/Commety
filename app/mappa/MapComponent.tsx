"use client";
import UserLocation from "@/components/Map/UserLocation";
import { useMapContext } from "@/contexts/MapContext";
import Header from "@/components/Header/Header";
import { getMarkerIcon } from "@/components/Map/MapMarker";
import { useEffect, useState } from "react";
import {

MapContainer,
TileLayer,
Marker,
Popup,
useMap,
useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker Leaflet + Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
iconRetinaUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
iconUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
shadowUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function RecenterMap() {
  const map = useMap();

  const {
    center,
    zoom,
    bounds,
  } = useMapContext();

  useEffect(() => {
    if (bounds) {
      const southWest: [number, number] = [
        bounds[0],
        bounds[2],
      ];

      const northEast: [number, number] = [
        bounds[1],
        bounds[3],
      ];

      map.flyToBounds(
  [southWest, northEast],
  {
    padding: [60, 60],
    maxZoom: 17,
    animate: true,
    duration: 1.3,
  }
);

      return;
    }

    map.flyTo(center, zoom, {
      animate: true,
      duration: 1.4,
      easeLinearity: 0.25,
    });

  }, [center, zoom, bounds, map]);

  return null;
}

function ClickHandler({
onSelect,
}: {
onSelect: (position: [number, number]) => void;
}) {
useMapEvents({
click(e) {
onSelect([e.latlng.lat, e.latlng.lng]);
},
});

return null;
}

export default function MapComponent() {
const [reports, setReports] = useState([
{
id: 1,
type: "meteo",
title: "Temporale forte",
description: "Grandine e pioggia intensa",
lat: 45.4642,
lng: 9.19,
},
{
id: 2,
type: "traffico",
title: "Incidente stradale",
description: "Traffico rallentato",
lat: 45.49,
lng: 9.23,
},
{
id: 3,
type: "evento",
title: "Concerto",
description: "Evento in centro città",
lat: 45.44,
lng: 9.15,
},
]);

const {
  center,
  zoom,
  flyTo,
} = useMapContext();

const [userPosition, setUserPosition] =
  useState<[number, number]>(center);

const [selectedPosition, setSelectedPosition] =
useState<[number, number] | null>(null);

const [open, setOpen] = useState(false);
const [type, setType] = useState("meteo");
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

useEffect(() => {
navigator.geolocation.getCurrentPosition(
(position) => {
const coords: [number, number] = [
  position.coords.latitude,
  position.coords.longitude,
];

setUserPosition(coords);

flyTo(coords, 15);
},
() => {
console.log("Posizione non autorizzata");
}
);
}, []);

const addReport = () => {
if (!title.trim()) return;
const newReport = {
  id: Date.now(),
  type,
  title,
  description,
  lat: selectedPosition
    ? selectedPosition[0]
    : userPosition[0],

  lng: selectedPosition
    ? selectedPosition[1]
    : userPosition[1],
};

setReports([...reports, newReport]);

setTitle("");
setDescription("");
setType("meteo");
setSelectedPosition(null);
setOpen(false);


};

return ( <main className="h-screen w-screen relative">
<Header />
<MapContainer
center={center}
zoom={zoom}
style={{ height: "100%", width: "100%" }}
> <RecenterMap />
    <ClickHandler
      onSelect={(position) => {
        setSelectedPosition(position);
        setOpen(true);
      }}
    />

    <TileLayer
      attribution="&copy; OpenStreetMap contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
<UserLocation />
    {selectedPosition && (
      <Marker position={selectedPosition}>
        <Popup>Punto selezionato 📍</Popup>
      </Marker>
    )}

    {reports.map((report) => (
      <Marker
        key={report.id}
        position={[report.lat, report.lng]}
        icon={getMarkerIcon(report.type)}
      >
        <Popup>
          <div className="min-w-[180px]">
            <h3 className="font-bold text-lg">
              {report.title}
            </h3>

            <p className="text-sm text-slate-600 mt-1">
              {report.description}
            </p>

            <p className="text-xs text-slate-400 mt-2 uppercase">
              {report.type}
            </p>
          </div>
        </Popup>
      </Marker>
    ))}
  </MapContainer>

  <button
    onClick={() => setOpen(true)}
    className="fixed bottom-6 right-6 z-[1000] w-16 h-16 rounded-full bg-[#2563FF] text-white text-4xl shadow-lg hover:bg-[#1f56e5]"
  >
    +
  </button>

  {open && (
    <div className="fixed inset-0 z-[2000] bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          Nuova segnalazione
        </h2>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded-xl p-3 mb-4"
        >
          <option value="meteo">🌧️ Meteo</option>
          <option value="traffico">🚗 Traffico</option>
          <option value="pericolo">⚠️ Pericolo</option>
          <option value="evento">🎉 Evento</option>
        </select>

        <input
          type="text"
          placeholder="Titolo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-xl p-3 mb-4"
        />

        <textarea
          placeholder="Descrizione"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-xl p-3 mb-4 h-28"
        />

        <div className="flex gap-3">
          <button
            onClick={() => setOpen(false)}
            className="flex-1 border rounded-xl py-3"
          >
            Annulla
          </button>

          <button
            onClick={addReport}
            className="flex-1 bg-[#2563FF] text-white rounded-xl py-3"
          >
            Pubblica
          </button>
        </div>
      </div>
    </div>
  )}
</main>
);
}
