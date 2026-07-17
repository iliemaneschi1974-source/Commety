export interface ReportPhotoProps {
  readonly photoUrl?: string;
  readonly fallback?: React.ReactNode;
}

/**
 * Visualizza la fotografia della segnalazione.
 *
 * La foto è pensata principalmente per immagini
 * verticali provenienti da smartphone.
 */
export default function ReportPhoto({
  photoUrl,
  fallback,
}: ReportPhotoProps) {
  if (!photoUrl) {
    return (
      <div
        style={{
          width: 500,
          minWidth: 500,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#F3F4F6",
        }}
      >
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={photoUrl}
      alt=""
      style={{
        width: 500,
        minWidth: 500,
        height: "100%",
        objectFit: "cover",
        objectPosition: "center center",
        display: "block",
      }}
    />
  );
}