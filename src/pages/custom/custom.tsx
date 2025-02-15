import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Modal from "./custom-main/Modal";
import Syrup from "./custom-main/Syrup";
import Recoding from "./custom-main/Recording";
import CustomTop from "./CustomTop/CustomTop";
import Brandrink from "./CustomBrandrink/CustomBradrink";
import SizeComponent from "./customSizecomponent/SizeComponent";
import SKC from "./CustomSKC/SKC";
import Recommend from "./Recommend/Recommend";
import { useParams, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchCustomDrink, ScrapCustomDrink, BeverageDetail } from "../../api/custom/custommain";

interface SizeProps {
  sizeType: string;
  volume: number;
}

const Container = styled.div`
  width: 393px;
  height: 1057px;
  background-color: #fff;
`;

const GrayBox = styled.div`
  width: 393px;
  height: 15px;
  background: #f4f4f4;
  margin: 20px 0 0 0;
`;

const Askinfo = styled.div`
  padding: 22px 0;
  width: 393px;
  color: rgba(18, 18, 18, 0.5);
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.3px;
`;

const CustomMain: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSlideUpOpen, setIsSlideUpOpen] = useState(false);
  const { beverageId } = useParams<{ beverageId: string }>();
  const location = useLocation();
  const Syrupinfo = location.state?.drink;
  
  // ✅ NaN 방지 처리 (beverageId가 없을 경우 0)
  const beverageIdNumber = Number(beverageId)

  // ✅ useQuery는 항상 실행되도록 유지, 대신 쿼리 내부에서 예외 처리
  const { data, isLoading, error } = useQuery({
    queryKey: ["customDrink", beverageIdNumber],
    queryFn: async () => {
      if (beverageIdNumber === 0) return { data: null }; // 빈 데이터 반환
      return fetchCustomDrink(beverageIdNumber);
    },
  });

  const [selectedSize, setSelectedSize] = useState<number>(0);

  // ✅ undefined 방지 및 초기화 로직 개선
  useEffect(() => {
    if (data?.data?.sizeDetails?.length) {
      setSelectedSize(0);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const drinkData: BeverageDetail = data?.data || ({} as BeverageDetail);

  // ✅ useMemo 사용하여 불필요한 계산 방지
  const updatedSizeDetails: SizeProps[] = useMemo(() => {
    return drinkData?.sizeDetails?.map(({ sizeType, volume }) => ({
      sizeType,
      volume,
    })) || [];
  }, [drinkData]);

  const handleSizeClick = (index: number) => {
    setSelectedSize(index);
  };

  const handleStarClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRecodingClick = () => {
    setIsSlideUpOpen(true);
  };

  // const handleSlideUpClose = () => {
  //   setIsSlideUpOpen(false);
  // };

  const mutation = useMutation({
    mutationFn: ScrapCustomDrink,
    onSuccess: (data) => {
      console.log("즐겨찾기 성공:", data);
    },
    onError: (error) => {
      console.error("즐겨찾기 실패:", error);
      alert("즐겨찾기 추가 중 오류 발생 ❌");
    },
  });

  const handleScrap = () => {
    setIsModalOpen(false);
    mutation.mutate(drinkData.beverageId);
  };

  return (
    <Container>
      <CustomTop imgUrl={drinkData.imgUrl} />
      <Brandrink
        brand={drinkData.brand}
        drink={drinkData.name}
        onClick={handleStarClick}
        onClick1={handleScrap}
        scrap={drinkData.favorite}
      />
      <SizeComponent sizes={updatedSizeDetails} selectedSize={selectedSize} handleSizeClick={handleSizeClick} />
      {drinkData.sizeDetails && drinkData.sizeDetails[selectedSize] && (
        <>
          <SKC
            sugar={drinkData.sizeDetails[selectedSize].sugar}
            kcal={drinkData.sizeDetails[selectedSize].calories}
            caffeine={drinkData.sizeDetails[selectedSize].caffeine}
          />
          <GrayBox />
          <Recommend
            recom={drinkData.sizeDetails[selectedSize].recommends}
            sugar={drinkData.sizeDetails[selectedSize].sugar}
            brand={drinkData.brand}
          />
        </>
      )}
      <Askinfo>정보 수정을 요청하고 싶어요</Askinfo>
      <Recoding onClick={handleRecodingClick} />

      {isModalOpen && <Modal onClick={handleModalClose} onClick1={handleScrap} brand={drinkData.brand} drink={drinkData.name} />}
      {isSlideUpOpen && drinkData.sizeDetails && drinkData.sizeDetails[selectedSize] && (
        <Syrup
          Syrupmenu={drinkData.syrups}
          Syrup={Syrupinfo}
          beverageId={beverageIdNumber}
          beverageSizeId={drinkData.sizeDetails[selectedSize]?.id}
          
        />
      )}
    </Container>
  );
};

export default CustomMain;
