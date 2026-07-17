export default function ReportFooter() {
  return (
    <div
      style={{
        height: 82,

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        padding: "0 42px",

        background: "#FFFFFF",

        borderTop: "1px solid rgba(15,23,42,.08)",
      }}
    >
      <img
        src="/logo.png"
        alt="Commety"
        style={{
          height: 44,
          width: "auto",
          display: "block",
        }}
      />

      <span
        style={{
          fontSize: 22,
          fontWeight: 500,
          color: "#64748B",
          letterSpacing: -0.2,
        }}
      >
        Scopri cosa sta succedendo vicino a te
      </span>
    </div>
  );
}