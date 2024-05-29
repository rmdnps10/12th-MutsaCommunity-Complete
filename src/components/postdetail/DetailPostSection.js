import React from "react";
import styled from "styled-components";
import { Body1 } from "../../styles/font";
import circleLikeIcon from "../../assets/icon/icon-like-circle.svg";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { instance } from "../../api/instance";

function DetailPostSection() {
  const [post, setPost] = useState(null);
  const [likeCount, setLikeCount] = useState();
  const { postid } = useParams();
  const [isLike, setIsLike] = useState();
  const [isPendingRequest, setIsPendingRequest] = useState(false);
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await instance.get(`board/post-detail/${postid}`);
        setPost(res.data);
        setLikeCount(res.data.likes_count);

        const headers = {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        };
        const res2 = await instance.get(`board/post-detail/${postid}/like/`, {
          headers,
        });
        setIsLike(res2.data.like);
      } catch (err) {
        alert(err);
      }
    };
    fetchPostData();
  }, []);
  const handleClickLikeButton = async () => {
    if (isPendingRequest) return;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    setIsPendingRequest(true);
    if (isLike) {
      await instance.delete(`board/post-detail/${postid}/like/delete/`, {
        headers,
      });
      setLikeCount((prev) => prev - 1);
      setIsLike(false);
    } else {
      await instance.post(
        `board/post-detail/${postid}/like/create/`,
        {},
        {
          headers,
        }
      );
      setLikeCount((prev) => prev + 1);
      setIsLike(true);
    }
    setIsPendingRequest(false);
  };
  return (
    <DetailPostSectionWrapper>
      <div className="title">{post?.title}</div>
      <div className="writer">
        <Body1>{post?.user}</Body1>
      </div>
      <div className="content">{post?.content}</div>
      <LikeSection $isLike={isLike}>
        <LikeButton
          src={circleLikeIcon}
          alt="좋아요 아이콘"
          onClick={handleClickLikeButton}
        />
        <LikeCount>{likeCount}</LikeCount>
      </LikeSection>
    </DetailPostSectionWrapper>
  );
}

const DetailPostSectionWrapper = styled.section`
  padding: 2rem 4.8rem;
  .title {
    font-weight: 600;
    font-size: 1.8rem;
  }
  .writer {
    margin-top: 1rem;
  }
  .content {
    margin-top: 1rem;
    font-size: 1.2rem;
    line-height: 130%;
  }
`;

const LikeSection = styled.section`
  display: flex;
  margin-top: 2rem;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: ${(props) => (props.$isLike ? 0.4 : 1)};
`;

const LikeButton = styled.img`
  width: 8rem;
  cursor: pointer;
`;
const LikeCount = styled.div`
  font-family: "GmarketSans";
  font-weight: 600;
  font-size: 1.5rem;
`;
export default DetailPostSection;
