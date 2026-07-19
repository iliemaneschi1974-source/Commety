import { ReportOpenGraph } from "@/components/opengraph";

import { ReportOpenGraphModel } from "@/types/opengraph";

const report: ReportOpenGraphModel = {
  title: "Doppio arcobaleno dopo il temporale",
  address: "Via Cassia, Roma",
  relativeTime: "3 minuti fa",
  category: "meteo",
  mediaUrl: "/playground/rainbow.jpg",
  mediaType: "photo",
};

export default function OpenGraphPlaygroundPage() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#E5E7EB",
        padding: 40,
      }}
    >
      <ReportOpenGraph report={report} />
    </main>
  );
}
