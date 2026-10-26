
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import HomePage from "../features/home/pages/HomePage";
import StoryPage from "../features/story/pages/StoryPage";
import CharactersPage from "../features/characters/pages/CharactersPage";
import LevelsPage from "../features/levels/pages/LevelsPage";
import MediaPage from "../features/media/pages/MediaPage";
import TeamPage from "../features/team/pages/TeamPage";
import NewsPage from "../features/news/pages/NewsPages";
import NewsDetailPage from "../features/news/pages/NewsDetailPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/historia" element={<StoryPage />} />
        <Route path="/personajes" element={<CharactersPage />} />
        <Route path="/niveles" element={<LevelsPage />} />
        <Route path="/galeria" element={<MediaPage />} />
        <Route path="/equipo" element={<TeamPage />} />

        <Route path="/noticias" element={<NewsPage />} />
        <Route
          path="/noticias/:slug"
          element={<NewsDetailPage />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
