export interface ReportPhotoProps {
  readonly photoUrl?: string;
}

export default function ReportPhoto({
  photoUrl,
}: ReportPhotoProps) {
  if (!photoUrl) {
    return (
      <div
        style={{
          width: "380px",
          height: "518px",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          borderRadius: "24px",

          backgroundColor: "#F1F5F9",

          color: "#94A3B8",

          fontSize: "32px",
          fontWeight: 600,
        }}
      >
        Nessuna foto
      </div>
    );
  }

  return (
    <img
      src={photoUrl}
      alt="Foto della segnalazione"
      width={380}
      height={518}
      style={{
        objectFit: "cover",
        borderRadius: "24px",
      }}
    />
  );
}