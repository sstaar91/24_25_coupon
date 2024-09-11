import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/reset.scss";
import "./styles/common.scss";

createRoot(document.getElementById("root")!).render(<App />);
