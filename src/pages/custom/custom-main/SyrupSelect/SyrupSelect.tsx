import React, { useState } from "react";
import styled from "styled-components";

// 시럽 옵션 타입 정의
// const syrupOptions: Record<string , string[]> = {
//   "투썸플레이스": ["시럽 없음", "바닐라", "카라멜", "헤이즐넛"],
//   "메가커피": ["시럽 없음", "바닐라", "헤이즐넛", "카라멜", "초코시럽", "자몽"],
//   "스타벅스":["시럽 없음","헤이즐넛","바닐라","슈가프리 바닐라","캐러멜","시나몬 돌체","토피넛","클래식","자몽"],
//   "빽다방":["시럽 없음","바닐라","헤이즐넛","카라멜","꿀","자몽","흑당"],
// };
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

const SyrupSelect: React.FC<{Syrupmenu: string[];syrupName:string|null;onSyrupChange:(newName:string)=>void}> = ({Syrupmenu,syrupName,onSyrupChange}) => {
  // const [selectedSyrup, setSelectedSyrup] = useState<string>(
  //   syrupName ?? "시럽 없음" // ✅ syrupName이 null이면 "시럽 없음"으로 초기화
  // );
  // const [selectedBrand, setSelectedBrand] = useState<string>(brand);

  return (
    <Container>
      <Label htmlFor="syrup-select">시럽 선택</Label>
      <SelectBox>
        <Select
          id="syrup-select"
          value={syrupName ?? "시럽 없음"} // ✅ null이면 "시럽 없음" 사용
          onChange={(e) => onSyrupChange(e.target.value)}
        >
          
          {Syrupmenu.map((syrup) => (
          <option key={syrup} value={syrup}>
            {syrup}
          </option>
        ))}
        </Select>
        <Arrow>▼</Arrow>
      </SelectBox>
    </Container>
  );
};

export default SyrupSelect;
