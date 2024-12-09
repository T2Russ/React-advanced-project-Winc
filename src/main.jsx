import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Root } from "./components/Root";
import { Loader as createEventLoader, UpcomingEventPage } from "./pages/AddEventPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {  EventView, Loader as eventLoader } from "./pages/EventView";
import { EventsPage } from "./pages/EventsPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
      },
      {
        path: "/event/:eventId",
        element: <EventView />,
        loader: eventLoader,
      },
      {
        path: "/event/create",
        element: <UpcomingEventPage />,
        loader: createEventLoader,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
