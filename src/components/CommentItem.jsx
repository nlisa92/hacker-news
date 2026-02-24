import { useDispatch } from "react-redux";
import { fetchCommentById } from "../store/slices/commentsSlice";
import { useState } from "react";

const CommentItem = ({ comment, comments }) => {
  const dispatch = useDispatch();
  const [showReplies, setShowReplies] = useState(false);

  const handleToggleReplies = () => {
    if (!showReplies && comment.kids) {
      comment.kids.forEach((cid) => dispatch(fetchCommentById(cid)));
    }
    setShowReplies(!showReplies);
  };

  return (
    <div
      style={{
        borderLeft: "2px solid #ddd",
        paddingLeft: "10px",
        marginBottom: "10px",
      }}
    >
      <p style={{ margin: "4px 0", fontSize: "14px" }}>
        <strong>{comment.by || "Аноним"}</strong> •{" "}
        {new Date(comment.time * 1000).toLocaleString()}
      </p>
      <div
        dangerouslySetInnerHTML={{ __html: comment.text }}
        style={{ fontSize: "14px", marginBottom: "6px" }}
      />

      {comment.kids && comment.kids.length > 0 && (
        <button
          onClick={handleToggleReplies}
          style={{
            fontSize: "12px",
            color: "#0077cc",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          {showReplies ? "Скрыть ответы" : `Показать ответы (${comment.kids.length})`}
        </button>
      )}

      {showReplies && comment.kids && (
        <div style={{ marginTop: "8px" }}>
          {comment.kids.map((cid) => {
            const child = comments[cid];
            if (!child) return <p key={cid}>Загрузка ответа...</p>;
            return <CommentItem key={cid} comment={child} comments={comments} />;
          })}
        </div>
      )}
    </div>
  );
}

export default CommentItem;
