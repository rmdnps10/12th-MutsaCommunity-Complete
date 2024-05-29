import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostItem from "./PostItem";
import { instance } from "../../api/instance";
import { useSearchParams } from "react-router-dom";
import { pageNumAtom } from "../../util/atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
function PostListSection() {
  const [pageNum, setPageNum] = useRecoilState(pageNumAtom);
  const [postList, setPostList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPageNum((prevPage) => prevPage + 1);
    }
  };
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
          if (pageNum === 1) {
            setPostList(res.data.results);
          } else {
            setPostList((prev) => [...prev, ...res.data.results]);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPostData();
  }, [searchParams, pageNum]);
  useEffect(() => {
    setPageNum(1);
  }, []);
  useEffect(() => {
    //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });

    // 최하단 요소를 관찰 대상으로 지정함
    const observerTarget = document.getElementById("observer");

    // 관찰 시작
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, []);

  return (
    <PostItemContainer>
      <ScrollContainer>
        {postList?.map((item) => (
          <PostItem key={item.id} postData={item} />
        ))}
        <div id="observer" style={{ height: "10px" }}></div>
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
