import OpenAI from "openai";

/**
 * Factory del client OpenAI.
 *
 * Il layer AI non conosce Firebase
 * né Secret Manager.
 */
export class OpenAIClient {

  private readonly client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
    });
  }

  getClient(): OpenAI {
    return this.client;
  }

}