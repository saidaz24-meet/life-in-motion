import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import IntroGatePage from "./views/IntroGatePage";
import StoryPage from "./views/StoryPage";
import HonorsPage from "./views/HonorsPage";
import VenturesPage from "./views/VenturesPage";
import AtlasPage from "./views/AtlasPage";
import BooksPage from "./views/BooksPage";
import AboutPage from "./views/AboutPage";
import ContactPage from "./views/ContactPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <IntroGatePage /> },
      { path: "/story", element: <StoryPage /> },
      { path: "/honors", element: <HonorsPage /> },
      { path: "/ventures", element: <VenturesPage /> },
      { path: "/atlas", element: <AtlasPage /> },
      { path: "/books", element: <BooksPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
]);
