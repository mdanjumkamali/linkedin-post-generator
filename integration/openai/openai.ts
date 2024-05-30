import OpenAI from "openai";

export default class OpenAIServices {
  public llm: OpenAI;
  constructor() {
    this.llm = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
  }

  async generatePost(prompt: string, voiceTone: string) {
    const response = await this.llm.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a expert linkedin Content creator. you have to create content based on voice tone ${voiceTone}`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
  }
}
