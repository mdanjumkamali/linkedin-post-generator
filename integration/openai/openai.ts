import OpenAI from "openai";
import { postGeneratorTemplate } from "./prompts";

export default class OpenAIServices {
  public llm: OpenAI;
  constructor() {
    this.llm = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
  }

  async generatePost(topic: string, tone: string) {
    const response = await this.llm.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.5,

      messages: [
        {
          role: "system",
          content: postGeneratorTemplate({ topic, tone }),
        },
        {
          role: "user",
          content: topic,
        },
      ],
    });
    return response.choices[0].message.content;
  }
}
