import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopNews, fetchNewsById } from "../store/slices/newsSlice";
import NewsList from "../components/NewsList";

const MainPage = () => {
  const dispatch = useDispatch();
  const { ids, items, loading } = useSelector((state) => state.news);

  // Загружаем список ID топ-новостей
  useEffect(() => {
    dispatch(fetchTopNews());
  }, [dispatch]);

  // Загружаем детали каждой новости
  useEffect(() => {
    if (ids.length > 0) {
      ids.forEach((id) => dispatch(fetchNewsById(id)));
    }
  }, [ids, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchTopNews());
  };

  const newsArray = ids
    .map((id) => items[id])
    .filter(Boolean)
    .sort((a, b) => b.time - a.time);

  return (
    <div style={{ padding: 20 }}>
      <h1>Hacker News — Top 100</h1>

      <button onClick={handleRefresh} style={{ marginBottom: 20 }}>
        Обновить
      </button>

      {loading && <p>Загрузка...</p>}

      <NewsList news={newsArray} />
    </div>
  );
}

export default MainPage;

