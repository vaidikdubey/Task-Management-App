import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: "#0f172a",
                        color: "#ffffff",
                        borderRadius: "12px",
                        border: "1px solid #334155",
                        padding: "12px 16px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                    },
                    success: {
                        style: {
                            background: "#059669",
                        },
                    },
                    error: {
                        style: {
                            background: "#dc2626",
                        },
                    },
                }}
            />
            <App />
        </BrowserRouter>
    </StrictMode>
);
