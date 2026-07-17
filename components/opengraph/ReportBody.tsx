interface ReportBodyProps {
  readonly children: React.ReactNode;
}

/**
 * Corpo principale della Open Graph Card.
 *
 * Organizza esclusivamente il layout
 * composto da fotografia e contenuto.
 */
export default function ReportBody({
  children,
}: ReportBodyProps) {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}