export interface ReportPlaceholderProps {
  /**
   * Colore principale della categoria.
   *
   * Viene fornito dal tema grafico
   * di Commety.
   */
  readonly backgroundColor: string;

  /**
   * Icona ufficiale della categoria.
   *
   * Deve essere la stessa utilizzata
   * dai marker della mappa.
   */
  readonly icon: React.ReactNode;
}

/**
 * Placeholder mostrato quando
 * la segnalazione non contiene fotografie.
 *
 * Non conosce categorie.
 * Non conosce Firestore.
 * Non contiene colori hardcoded.
 */
export default function ReportPlaceholder({
  backgroundColor,
  icon,
}: ReportPlaceholderProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
      }}
    >
      {icon}
    </div>
  );
}