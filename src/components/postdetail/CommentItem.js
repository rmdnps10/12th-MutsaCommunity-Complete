import React from "react";
import styled from "styled-components";
import { Body2 } from "../../styles/font";
import { Grey1 } from "../../styles/color";
import dayjs from "dayjs";
function CommentItem({ content, created_at, user }) {
  return (
    <CommentItemWrapper>
      <div className="row-1">
        <Body2>{user}</Body2>
        <Body2 color={Grey1}>{dayjs(created_at).format("MM-DD HH:mm")}</Body2>
      </div>
      <div className="content">
        <Body2>{content}</Body2>
      </div>
    </CommentItemWrapper>
  );
}

const CommentItemWrapper = styled.div`
  padding: 1.5rem 0 0;
  .row-1 {
    display: flex;
    gap: 1.5rem;
  }
  .content {
    margin-top: 0.5rem;
  }
`;
export default CommentItem;
