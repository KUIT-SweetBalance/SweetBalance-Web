import React from "react";
import styled from "styled-components";
interface Props {
    brand: string;
    drink: string;
    sugar: number;
    kcal: number;
    caffeine: number;
  }
const SKCBox = styled.div`
  height: 126px;
`;
const SKCList = styled.div`
  padding: 42px 60px 42px 59px;
  display: inline-flex;
  align-items: center;
  gap: 78px;
`;
const SKCitem = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const SKCName = styled.div`
  color: #121212;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.25px;
`;
const SKCnumber = styled.div`
  color: #121212;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 100% */
  letter-spacing: 0.25px;
`;



const SKC: React.FC<Pick<Props, 'sugar' | 'kcal' | 'caffeine'>> = ({
    sugar,
    kcal,
    caffeine,
  }) => {
    return (
      <SKCBox>
        <SKCList>
          <SKCitem>
            <SKCName>당류</SKCName>
            <SKCnumber>{sugar}g</SKCnumber>
          </SKCitem>
          <SKCitem>
            <SKCName>칼로리</SKCName>
            <SKCnumber>{kcal}kcal</SKCnumber>
          </SKCitem>
          <SKCitem>
            <SKCName>카페인</SKCName>
            <SKCnumber>{caffeine}mg</SKCnumber>
          </SKCitem>
        </SKCList>
      </SKCBox>
    );
  };


  export default SKC