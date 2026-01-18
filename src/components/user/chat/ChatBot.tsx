"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  toggleChat,
  addUserMessage,
  startStreaming,
  appendChunk,
  stopStreaming,
  setError,
} from "@/store/slices/user/chatSlice";
import { streamChat } from "@/services/user/chatService";
import {
  Box,
  Fab,
  Paper,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useState, useRef, useEffect } from "react";

const ChatBot = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, isStreaming, isOpen, error } = useSelector(
    (state: RootState) => state.chat
  );
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage = input.trim();
    setInput("");
    dispatch(addUserMessage(userMessage));
    dispatch(startStreaming());

    const history = messages.map((m) => ({ role: m.role, content: m.content }));

    await streamChat(
      userMessage,
      history,
      (text) => dispatch(appendChunk(text)),
      () => dispatch(stopStreaming()),
      (err) => dispatch(setError(err))
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Fab
        color="primary"
        onClick={() => dispatch(toggleChat())}
        sx={{ position: "fixed", bottom: 24, right: 24 }}
      >
        <ChatIcon />
      </Fab>
    );
  }

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 360,
        height: 500,
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          bgcolor: "primary.main",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1">Chat Assistant</Typography>
        <IconButton
          size="small"
          onClick={() => dispatch(toggleChat())}
          sx={{ color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflow: "auto", p: 2, bgcolor: "#f5f5f5" }}>
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            sx={{
              mb: 1,
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                maxWidth: "80%",
                p: 1.5,
                borderRadius: 2,
                bgcolor: msg.role === "user" ? "primary.main" : "white",
                color: msg.role === "user" ? "white" : "text.primary",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.content ||
                (isStreaming && idx === messages.length - 1 && "...")}
            </Box>
          </Box>
        ))}
        {error && (
          <Typography color="error" variant="caption">
            {error}
          </Typography>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box sx={{ p: 2, borderTop: "1px solid #ddd", display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isStreaming}
          multiline
          maxRows={3}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={isStreaming || !input.trim()}
        >
          {isStreaming ? <CircularProgress size={24} /> : <SendIcon />}
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatBot;
