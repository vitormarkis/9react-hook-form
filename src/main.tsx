import ReactDOM from "react-dom/client"
import { App } from "./MultiStep/App"
import "./index.css"
import { MultiStepProvider } from "./MultiStep/context"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MultiStepProvider>
  <App />
  </MultiStepProvider>
)
