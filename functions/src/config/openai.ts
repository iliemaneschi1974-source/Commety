import OpenAI from "openai";

/**
 * Client OpenAI condiviso da tutte
 * le Cloud Functions.
 *
 * La chiave API viene letta
 * esclusivamente dalle variabili
 * d'ambiente del runtime.
 *
 * In produzione verrà fornita tramite
 * Firebase Secret Manager.
 */
export const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});