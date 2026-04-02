import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";

import { ColorModeProvider } from "./components/ui/color-mode";

import { AuthProvider } from "./Contexts/AuthContext";

import App from "./App";
import "./index.css";
import { AppWithSchedule } from "./AppWithSchedule";

const system = createSystem(defaultConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <ColorModeProvider>
        
          <AuthProvider>
            <AppWithSchedule>
              <App />
            </AppWithSchedule>
          </AuthProvider>
      </ColorModeProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
