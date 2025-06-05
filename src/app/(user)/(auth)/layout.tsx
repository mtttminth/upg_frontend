"use client";
import "@/styles/admin/admin.scss";
import * as React from "react";
import Box from "@mui/material/Box";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Box
        sx={{
          backgroundImage: "url('./images/bg.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100%",
          width: "100%",
          backgroundPosition: `top right`,
        }}
      >
        <Box
          component="main"
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
          }}
          sx={{ flexGrow: 1, p: 3 }}
        >
          {children}
        </Box>
      </Box>
    </section>
  );
}
