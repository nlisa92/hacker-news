import NewsItem from "./NewsItem";

const NewsList = ({ news })=> {
  if (!news || news.length === 0) {
    return <p>Нет новостей для отображения</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {news.map((item) => (
        <NewsItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default NewsList;

