import ReportOpenGraphImage from "@/components/opengraph-image/ReportOpenGraphImage";

import { ReportOpenGraphModel } from "@/types/opengraph";

const report: ReportOpenGraphModel = {
  title: "Concerto live in piazza questa sera",
  address: "Via Cassia, Roma",
  relativeTime: "3 minuti fa",
  category: "evento",
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
      <div style={{ transform: "scale(0.7)", transformOrigin: "center center" }}>
        <ReportOpenGraphImage report={report} />
      </div>
    </main>
  );
}
