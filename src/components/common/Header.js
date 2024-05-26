import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grey1, Grey2 } from "../../styles/color";
import logo from "../../assets/icon/logo.svg";
import login from "../../assets/icon/login.svg";
import { useLocation, useNavigate } from "react-router-dom";
import backIcon from "../../assets/icon/icon-back.svg";
import postIcon from "../../assets/icon/icon-write-post.png";
function Header() {
  // useLocation훅을 통하여 현재 위치를 비구조화할당으로 pathname이라는 변수로서 저장
  const { pathname } = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  
  const getIsLogin = () => {
    if (localStorage.getItem("accessToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };
  useEffect(() => {
    getIsLogin();
  }, [pathname]);

  if (pathname === "/") {
    return (
      <StyledHeader1>
        <div className="logo-section">
          <LogoImg src={logo} />
          <LogoText>멋사 게시판</LogoText>
        </div>
        {/* 로그인 되어있을 때, 안 되어있을 때로 나누어서 조건부 렌더링  */}
        {isLogin ? (
          <LoginSuccessDisplay>
            <UserName>정인영</UserName>
            <PostImg src={postIcon} />
          </LoginSuccessDisplay>
        ) : (
          <LoginNavigateImg
            src={login}
            onClick={() => {
              navigate("/login");
            }}
          />
        )}
      </StyledHeader1>
    );

    // 홈 화면 이외 페이지 헤더
  } else {
    return (
      <StyledHeader2>
        <BackImg
          src={backIcon}
          onClick={() => {
            navigate("/");
          }}
        />
        <LogoText>
          {pathname === "/writePost"
            ? "글쓰기"
            : pathname === "/login"
              ? "로그인"
              : "글 상세보기"}
        </LogoText>
      </StyledHeader2>
    );
  }
}

const StyledHeader1 = styled.header`
  background-color: ${Grey2};
  border-bottom: ${Grey1};
  height: 55px;
  display: flex;
  align-items: center;
  padding: 20px;
  .logo-section {
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
  }
`;

const StyledHeader2 = styled(StyledHeader1)`
  position: relative;
  justify-content: center;
`;

const LogoText = styled.div`
  font-family: "GmarketSans";
  font-size: 2rem;
  font-weight: 600;
`;

const BackImg = styled.img`
  width: 23px;
  position: absolute;
  top: 15px;
  left: 18px;
  cursor: pointer;
`;

const LogoImg = styled.img`
  height: 40px;
`;

const PostImg = styled.img`
  width: 32px;
`;

const LoginSuccessDisplay = styled.div`
  margin-left: auto;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const UserName = styled.div`
  font-family: "GmarketSans";
  font-size: 1.5rem;
  font-weight: 600;
`;

const LoginNavigateImg = styled.img`
  margin-left: auto;
  width: 33px;
  cursor: pointer;
`;

export default Header;
