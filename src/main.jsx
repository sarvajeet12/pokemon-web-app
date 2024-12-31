import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

// router
import { router } from "./router";
import { RouterProvider } from "react-router-dom";

// import react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React Query Instance
const queryClient = new QueryClient()



// main
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider >
  </StrictMode>
);