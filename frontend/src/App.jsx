import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./features/router/Router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
