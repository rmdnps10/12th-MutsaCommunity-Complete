import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useCallback } from "react";
dayjs.extend(duration);

function DdaySection() {
  // dayjs 라이브러리를 사용하여 타겟 일정까지의 남은 시간을 반환해주는 함수
  const calculateTimeLeft = useCallback(() => {
    const now = dayjs(); // 현재 시간
    const targetDate = dayjs("2024-08-16"); // 기말고사 시간
    const diff = targetDate.diff(now);

    const durationObj = dayjs.duration(diff);

    return {
      days: durationObj.days(),
      hours: durationObj.hours(),
      minutes: durationObj.minutes(),
      seconds: durationObj.seconds(),
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <StyledDday>
      기말고사까지 D-{timeLeft.days}{" "}
      {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}:
      {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}:
      {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}초
      남았습니다.🥹
    </StyledDday>
  );
}

const StyledDday = styled.section`
  font-family: "GmarketSans";
  font-weight: 400;
  font-size: 1.5rem;
  text-align: center;
  margin: 1rem 0 1rem;
`;

export default DdaySection;
