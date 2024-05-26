import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Body1 } from "../../styles/font";
import { Grey2, Red, White } from "../../styles/color";
import { instance } from "../../api/instance";
import { useNavigate } from "react-router-dom";
function LoginSection() {
  //TODOS
  // 1. 아이디, 비밀번호 값을 상태관리 변수로 지정하고 값이 변경됨에 따라 상태 업데이트하기
  // 2. useRef 사용하여 LoginSection컴포넌트가 첫 마운트되었을떄 아이디 input에 포커스 두기
  // 3. 로그인 버튼을 눌렀을 때, 아이디와 비밀번호를 서버에 전송하고 response 전달받기, response의 유형(성공,실패) 에 따라 예외처리 구현
  // 4. 로그인 요청 여러번 보내는 것 방지

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isPendingRequest, setIsPendingRequest] = useState(false);

  const idRef = useRef();
  const navigate = useNavigate();
  const onChangeField = (e) => {
    const { name, value } = e.target;
    if (name === "id") {
      setId(value);
    } else {
      setPw(value);
    }
  };
  const postLoginData = async () => {
    if (isPendingRequest) return;
    const body = {
      email: id,
      password: pw,
    };
    try {
      setIsPendingRequest(true);
      const res = await instance.post("accounts/login/", body);
      if (res.status === 200 && !isPendingRequest) {
        localStorage.setItem("accessToken", res.data.access);
        navigate("/");
      } else {
        alert("아이디나 비번이 틀렸어요!");
      }
    } catch (err) {
      alert("아이디나 비번이 틀렸어요!");
    } finally {
      setIsPendingRequest(false);
    }
  };
  useEffect(() => {
    idRef.current.focus();
  }, []);
  return (
    <LoginSectionWrapper>
      <div className="id">
        <Body1>아이디</Body1>
        <LoginInput
          placeholder="아이디를 입력해주세요."
          value={id}
          name="id"
          onChange={onChangeField}
          ref={idRef}
        />
      </div>
      <div className="pw">
        <Body1>비밀번호</Body1>
        <LoginInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={pw}
          name="pw"
          onChange={onChangeField}
        />
      </div>
      <LoginButton onClick={postLoginData}>로그인</LoginButton>
    </LoginSectionWrapper>
  );
}

const LoginSectionWrapper = styled.section`
  padding: 3.6rem 3.7rem 0;
  .pw {
    margin-top: 2rem;
  }
`;

const LoginInput = styled.input`
  display: inline-block;
  width: 100%;
  background-color: ${Grey2};
  padding: 0.3rem 1rem;
  height: 4rem;
  margin-top: 0.6rem;
  border-radius: 1rem;
`;

export const LoginButton = styled.button`
  background-color: ${Red};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${White};
  border-radius: 2rem;
  height: 5rem;
  font-size: 2rem;
  font-family: "GmarketSans";
  margin-top: 2rem;
`;

export default LoginSection;
