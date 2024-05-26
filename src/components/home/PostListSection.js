import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostItem from "./PostItem";
import { instance } from "../../api/instance";
import { useSearchParams } from "react-router-dom";

function PostListSection() {
  const [pageNum, setPageNum] = useState(1);
  const [postList, setPostList] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const fetchPostData = async () => {
      const params = {
        order_by:
          searchParams.get("sortType") === "popular" ? "likes" : "created_at",
        page: pageNum,
      };
      try {
        const res = await instance.get("board/post-list/", {
          params,
        });
        if (res.status === 200) {
          setPostList(res.data.results);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPostData();
  }, [searchParams]);
  return (
    <PostItemContainer>
      <ScrollContainer>
        {postList?.map((item) => (
          <PostItem key={item.id} postData={item} />
        ))}
      </ScrollContainer>
    </PostItemContainer>
  );
}

const PostItemContainer = styled.div`
  padding: 1.5rem;
`;

const ScrollContainer = styled.div`
  height: calc(100vh - 16rem);
  overflow: scroll;
`;

export default PostListSection;
