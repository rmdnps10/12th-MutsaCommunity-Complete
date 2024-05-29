import React from "react";
import styled from "styled-components";
import CommentItem from "./CommentItem";
import { Black, White } from "../../styles/color";
import { useEffect } from "react";
import { instance } from "../../api/instance";
import { useParams } from "react-router-dom";
import { useState } from "react";
function CommentListSection() {
  const [comment, setComment] = useState("");

  const { postid } = useParams();
  const [commentList, setCommentList] = useState([]);

  const fetchCommentList = async () => {
    try {
      const res = await instance.get(
        `/board/post-detail/${postid}/comment-list/`
      );
      setCommentList(res.data.comments);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    fetchCommentList();
  }, []); 

  const handleClickPostButton = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    await instance.post(
      `/board/post-detail/${postid}/comment-create/`,
      { content: comment },
      { headers }
    );
    setComment("");
    fetchCommentList();
  };
  return (
    <CommentListSectionWrapper>
      <CommentCount>댓글 {commentList.length}</CommentCount>
      {commentList.map((item) => (
        <CommentItem
          key={item.id}
          content={item.content}
          created_at={item.created_at}
          user={item.user}
        />
      ))}
      <CommentTextArea
        placeholder="댓글을 작성해주세요"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <PostButton onClick={handleClickPostButton}>댓글 작성하기</PostButton>
    </CommentListSectionWrapper>
  );
}

const CommentListSectionWrapper = styled.section`
  padding: 2rem 4rem;
`;

const CommentCount = styled.div`
  font-size: 1.5rem;
  font-family: "GmarketSans";
`;

const CommentTextArea = styled.textarea`
  display: inline-block;
  width: 100%;
  height: 10rem;
  padding: 1rem 1rem;
  outline: none;
  border: 1px solid;
  resize: none;
  font-family: Pretendard;  
  margin: 2rem 0 1rem;
  border-radius: 1rem;
`;

const PostButton = styled.button`
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  font-family: "GmarketSans";
  background-color: ${Black};
  color: ${White};
`;
export default CommentListSection;
