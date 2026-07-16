import { useProcessingOverlayContext } from "@/contexts/ProcessingOverlayContext";

/**
 * Hook pubblico del Processing Overlay.
 *
 * Astrae completamente il Context
 * dal resto dell'applicazione.
 */
export function useProcessingOverlay() {
  return useProcessingOverlayContext();
}