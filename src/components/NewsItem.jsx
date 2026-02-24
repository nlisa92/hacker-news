import { Link } from "react-router-dom";

function NewsItem({ item }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "6px",
        background: "#fafafa",
      }}
    >
      <h3 style={{ margin: "0 0 6px 0" }}>
        <Link to={`/item/${item.id}`} style={{ textDecoration: "none" }}>
          {item.title}
        </Link>
      </h3>
      <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
        Автор: {item.by} | Рейтинг: {item.score} |{" "}
        {new Date(item.time * 1000).toLocaleString()}
      </p>
    </div>
  );
}

export default NewsItem;

