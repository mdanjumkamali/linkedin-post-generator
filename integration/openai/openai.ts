import OpenAI from "openai";

export default class OpenAIServices {
  public llm: OpenAI;
  constructor() {
    this.llm = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
}
