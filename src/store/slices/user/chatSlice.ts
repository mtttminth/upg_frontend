import { ChatMessage, ChatState } from "@/types/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ChatState = {
  messages: [],
  isStreaming: false,
  isOpen: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    addUserMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({ role: "user", content: action.payload });
    },
    startStreaming: (state) => {
      state.isStreaming = true;
      state.error = null;
      state.messages.push({ role: "model", content: "" });
    },
    appendChunk: (state, action: PayloadAction<string>) => {
      const lastMsg = state.messages[state.messages.length - 1];
      if (lastMsg?.role === "model") {
        lastMsg.content += action.payload;
      }
    },
    stopStreaming: (state) => {
      state.isStreaming = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isStreaming = false;
    },
    clearChat: () => initialState,
  },
});

export const {
  toggleChat,
  addUserMessage,
  startStreaming,
  appendChunk,
  stopStreaming,
  setError,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;
