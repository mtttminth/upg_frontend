export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export interface ChatRequest {
  message: string;
  history: ChatMessage[];
}

export interface ChatState {
  messages: ChatMessage[];
  isStreaming: boolean;
  isOpen: boolean;
  error: string | null;
}
