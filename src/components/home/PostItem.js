import React from "react";
import styled from "styled-components";
import { Grey1, Grey2 } from "../../styles/color";
import { Body1, Body2 } from "../../styles/font";
import likeImg from "../../assets/icon/icon-like.png";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
function PostItem({ postData }) {
  const navigate = useNavigate();
  return (
    <StyledPostItem
      onClick={() => {
        navigate(`/post/${postData.id}`);
      }}
    >
      <div className="title">
        <Body1>{postData.title}</Body1>
      </div>
      <div className="post-info">
        <Body2 color={Grey1}>{postData.user}</Body2>
        <Body2 color={Grey1}>
          {dayjs(postData.created_at).format("MM-DD HH:mm")}
        </Body2>
        <div className="like">
          <LikeIcon src={likeImg} alt="좋아요 아이콘" />+{postData.likes_count}
        </div>
      </div>
      <div className="comment">
        <Body2>{postData.comments_count}</Body2>
        <Body2 color={Grey1}>댓글</Body2>
      </div>
    </StyledPostItem>
  );
}

const StyledPostItem = styled.div`
  position: relative;
  border-bottom: ${Grey1};
  height: 6.3rem;
  padding: 0.9rem 1.5rem;
  .post-info {
    display: flex;
    margin-top: 0.5rem;
    gap: 0.8rem;
    align-items: center;
  }
  .like {
    display: flex;
    align-items: center;
  }
  .comment {
    position: absolute;
    top: 0;
    right: 0;
    width: 4.9rem;
    height: 4.9rem;
    background-color: ${Grey2};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    border-radius: 1.5rem;
  }
`;

const LikeIcon = styled.img`
  width: 2.4rem;
`;

export default PostItem;
