import React, { useState } from "react";
import styled from "styled-components";

// 시럽 옵션 타입 정의
type SyrupOption =   "바닐라" | "카라멜" | "헤이즐넛" | "초코" | "없음";

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: 600;
`;

const SelectBox = styled.div`
  position: relative;
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  background: white;
  appearance: none; /* 기본 화살표 제거 */
  cursor: pointer;

  &:focus {
    outline: 2px solid #6c5ce7; /* 포커스 시 보라색 테두리 */
  }
`;

const Arrow = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 16px;
`;

const SyrupSelect: React.FC = () => {
  const [selectedSyrup, setSelectedSyrup] = useState<SyrupOption>("없음");

  return (
    <Container>
      <Label htmlFor="syrup-select">시럽 선택</Label>
      <SelectBox>
        <Select
          id="syrup-select"
          value={selectedSyrup}
          onChange={(e) => setSelectedSyrup(e.target.value as SyrupOption)}
        >
          
          <option value="바닐라">바닐라</option>
          <option value="카라멜">카라멜</option>
          <option value="헤이즐넛">헤이즐넛</option>
          <option value="초코">초코</option>
          <option value="없음">없음</option>
        </Select>
        <Arrow>▼</Arrow>
      </SelectBox>
    </Container>
  );
};

export default SyrupSelect;
