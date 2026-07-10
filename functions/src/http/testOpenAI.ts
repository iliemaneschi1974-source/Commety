import { defineSecret } from "firebase-functions/params";
import { onRequest } from "firebase-functions/v2/https";

import { OpenAIClient } from "../ai/client/OpenAIClient";

const openAiApiKey =
  defineSecret("OPENAI_API_KEY");

/**
 * Endpoint diagnostico.
 */
export const testOpenAI = onRequest(
  {
    secrets: [openAiApiKey],
  },
  async (_request, response) => {

    try {

      const client =
        new OpenAIClient(
          openAiApiKey.value()
        ).getClient();

      const result =
        await client.responses.create({
          model: "gpt-5-mini",
          input:
            "Reply with exactly: CONNECTED",
        });

      response.status(200).json({
        success: true,
        model: "gpt-5-mini",
        output: result.output_text,
      });

    } catch (error) {

      console.error(error);

      response.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      });

    }

  }
);