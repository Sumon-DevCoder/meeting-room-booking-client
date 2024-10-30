import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton.tsx";

const stripePromise = loadStripe(
  "pk_test_51P0MsXP4EIINmDPdY5PvdQAa7TkzoxRJpSmFkrmgZzKIoD1z2HwErrrwIm7jkmpcjyKSRBiMkVmjGU6SsSbRuOMy00MMnZmO3Q"
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
          <ScrollToTopButton />
        </Elements>
      </PersistGate>
      <Toaster richColors closeButton position="top-center" />
    </Provider>
  </StrictMode>
);
