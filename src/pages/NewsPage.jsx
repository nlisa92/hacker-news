import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNewsById } from "../store/slices/newsSlice";
import { fetchCommentById } from "../store/slices/commentsSlice";
import CommentsTree from "../components/CommentsTree";

const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newsItem = useSelector((state) => state.news.items[id]);
  const comments = useSelector((state) => state.comments.items);

  useEffect(() => {
    dispatch(fetchNewsById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (newsItem?.kids) {
      newsItem.kids.forEach((cid) => dispatch(fetchCommentById(cid)));
    }
  }, [newsItem, dispatch]);

  const handleRefreshComments = () => {
    if (newsItem?.kids) {
      newsItem.kids.forEach((cid) => dispatch(fetchCommentById(cid)));
    }
  };

  if (!newsItem) return <p>Загрузка...</p>;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate("/")}>Назад</button>

      <h2>{newsItem.title}</h2>

      {newsItem.url && (
        <a href={newsItem.url} target="_blank" rel="noreferrer">
          Открыть источник
        </a>
      )}

      <p>Автор: {newsItem.by}</p>
      <p>Дата: {new Date(newsItem.time * 1000).toLocaleString()}</p>
      <p>Комментариев: {newsItem.descendants || 0}</p>

      <button onClick={handleRefreshComments} style={{ marginBottom: 20 }}>
        Обновить комментарии
      </button>

      <CommentsTree rootIds={newsItem.kids || []} comments={comments} />
    </div>
  );
};

export default NewsPage;
