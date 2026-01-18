import tokenService from "../tokenService";
import { USER } from "@/consts/common";
import { ChatMessage } from "@/types/chat";

const BASE_URL = process.env.API_BASE_URL;

export const streamChat = async (
  message: string,
  history: ChatMessage[],
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (error: string) => void
) => {
  const token = tokenService.getAccessToken(USER);

  try {
    const response = await fetch(`${BASE_URL}/user/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        tokenService.resetToken(USER);
        window.location.href = "/login";
        return;
      }
      throw new Error(`HTTP ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("No reader available");

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") {
            onDone();
            return;
          }
          try {
            const parsed = JSON.parse(data);
            if (parsed.text) onChunk(parsed.text);
            if (parsed.error) onError(parsed.error);
          } catch {}
        }
      }
    }
    onDone();
  } catch (error: any) {
    onError(error.message || "Chat failed");
  }
};

export default { streamChat };
