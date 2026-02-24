import CommentItem from "./CommentItem";

function CommentsTree({ rootIds = [], comments }) {
  if (!rootIds || rootIds.length === 0) {
    return <p>Комментариев пока нет</p>;
  }

  return (
    <div
      style={{
        marginLeft: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {rootIds.map((id) => {
        const comment = comments[id];
        if (!comment) return <p key={id}>Загрузка комментария...</p>;

        return <CommentItem key={id} comment={comment} comments={comments} />;
      })}
    </div>
  );
}

export default CommentsTree;
