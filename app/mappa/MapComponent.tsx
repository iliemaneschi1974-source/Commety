"use client";
import { useAuth } from "@/contexts/AuthContext";
import MessageDialog from "@/components/ui/MessageDialog";
import { Report } from "@/types/report";
import { useProcessingOverlay } from "@/hooks/useProcessingOverlay";
import {
  listenModerationDecision,
} from "@/services/reportModeration";
import ReportBottomSheet from "@/components/Map/ReportBottomSheet";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import Header from "@/components/Header/Header";
import ClickHandler from "@/components/Map/ClickHandler";
import UserFab from "@/components/User/UserFab";
import RecenterMap from "@/components/Map/RecenterMap";
import ReportForm, {
  ReportFormData,
} from "@/components/Map/ReportForm";
import ReportsLayer from "@/components/Map/ReportsLayer";
import UserLocation from "@/components/Map/UserLocation";

import { useMapContext } from "@/contexts/MapContext";
import { getReportById } from "@/services/reports";
import { submitReport } from "@/services/reportSubmission";

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



export default function MapComponent() {
  const {
    center,
    zoom,
    flyTo,
  } = useMapContext();
  const processingOverlay =
  useProcessingOverlay();
const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sharedReportId =
    searchParams.get("report");
    const openedFromSharedLink = useRef(false);
    const sharedReportHandled = useRef(false);

  const [userPosition, setUserPosition] =
    useState<[number, number]>(center);

  const [selectedPosition, setSelectedPosition] =
    useState<[number, number] | null>(null);

  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] =
  useState<Report | null>(null);

const [sheetOpen, setSheetOpen] =
  useState(false);
const [messageDialogOpen, setMessageDialogOpen] =
  useState(false);

const [messageDialogTitle, setMessageDialogTitle] =
  useState("");

const [messageDialogDescription, setMessageDialogDescription] =
  useState("");
useEffect(() => {
  if (!navigator.geolocation) {
    console.warn("Geolocalizzazione non supportata");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const coords: [number, number] = [
        position.coords.latitude,
        position.coords.longitude,
      ];

      setUserPosition(coords);

if (!openedFromSharedLink.current) {
  flyTo(coords, 15);
}
    },
    () => {
      console.warn("Posizione non autorizzata");
    }
  );
}, []);

useEffect(() => {
  if (!sharedReportId) {
    return;
  }
    sharedReportHandled.current = true;
const reportId = sharedReportId;
  async function openSharedReport() {
    try {
      const report = await getReportById(
  reportId
);

      if (!report) {
        console.warn("Segnalazione non trovata");
        return;
      }
      openedFromSharedLink.current = true;
      flyTo(
        [report.lat, report.lng],
        16
      );

      setSelectedReport(report);

      setSheetOpen(true);
    } catch (error) {
      console.error(
        "Errore apertura segnalazione condivisa:",
        error
      );
    }
  }

  openSharedReport();
}, [sharedReportId]);

const handleCreateReport = async (
  data: ReportFormData
) => {
  try {
    const position =
      selectedPosition ?? userPosition;

    console.log(
      "selectedPosition:",
      selectedPosition
    );

    console.log(
      "userPosition:",
      userPosition
    );

    const result =
      await submitReport({
        ...data,

        lat: position[0],
        lng: position[1],

        userId: user?.uid,

        username:
          user?.profile.username,

        displayName:
          user?.profile.displayName,

        avatarUrl:
          user?.profile.avatarUrl,
      });
      

    if (!result.success) {
      




      setMessageDialogTitle(
        result.moderationMessage!.title
      );

      setMessageDialogDescription(
        result.moderationMessage!.description
      );

      setMessageDialogOpen(true);

      return;
    }
    setSelectedPosition(null);
setOpen(false);

if (!result.reportId) {
  return;
}

/**
 * Nessuna immagine:
 * la segnalazione è già pubblicata.
 */
if (data.images.length === 0) {
  return;
}

/**
 * Sono presenti immagini:
 * attendiamo la moderazione AI.
 */
processingOverlay.showProcessing();

const unsubscribe =
  listenModerationDecision(
    result.reportId,
    (event) => {

      unsubscribe();

      if (
        event.decision === "APPROVATO"
      ) {

        processingOverlay.showSuccess();

        setTimeout(() => {
          processingOverlay.hide();
        }, 2000);

        return;
      }

      processingOverlay.hide();

      setMessageDialogTitle(
        "Segnalazione non pubblicata"
      );

      setMessageDialogDescription(
        "L'immagine caricata non soddisfa i requisiti di pubblicazione di Commetty. Ti invitiamo a caricarne una diversa."
      );

      setMessageDialogOpen(true);

    }
  );
  } catch (error) {
    console.error(
      "Errore durante la creazione della segnalazione:",
      error
    );
  }
};
  return (
    <main className="relative h-screen w-screen">
      <Header />

      <MapContainer
        center={center}
        zoom={zoom}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <RecenterMap />

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
            <Popup>
              Nuova segnalazione
            </Popup>
          </Marker>
        )}

        <ReportsLayer
  onReportClick={(report) => {
    setSelectedReport(report);
    setSheetOpen(true);
  }}
/>
      </MapContainer>

      <UserFab />

      <ReportForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCreateReport}
      />
      <ReportBottomSheet
  report={selectedReport}
  open={sheetOpen}
  onClose={() => {
  setSheetOpen(false);
  setSelectedReport(null);

  if (openedFromSharedLink.current) {
    openedFromSharedLink.current = false;

    setTimeout(() => {
      router.replace("/mappa");
    }, 350);
  }
}}
/>
<MessageDialog
  open={messageDialogOpen}
  title={messageDialogTitle}
  message={messageDialogDescription}
  onClose={() =>
    setMessageDialogOpen(false)
  }
/>
    </main>
  );
}