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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCustomDrink, ScrapCustomDrink, BeverageDetail } from "../../api/custom/custommain";
import { DeleteScrapDrinks } from "../../api/mypage/scrap/MypageScrap";

interface SizeProps {
  sizeType: string;
  volume: number;
}

const Container = styled.div`
  width: 100%;
  height: 1057px;
  background-color: #fff;
`;

const GrayBox = styled.div`
  width: 100%;
  height: 15px;
  background: #f4f4f4;
  /* margin: 20px 0 0 0;/ */
  z-index:2;
  position: relative;
  background-color:white;
`;

const Askinfo = styled.div`
  padding: 22px 0;
  width: 100%;
  color: rgba(18, 18, 18, 0.5);
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.3px;
  z-index:2;
  position: relative;
  background-color:white;
`;

const CustomMain: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSlideUpOpen, setIsSlideUpOpen] = useState(false);
  const { beverageId } = useParams<{ beverageId: string }>();
  const location = useLocation();
  const [selectedSize, setSelectedSize] = useState<number>(0);

  
  const Syrupinfo = location.state?.drink ?? location.state ?? {};


  const queryClient = useQueryClient();

  const beverageIdNumber = useMemo(() => {
    const id = beverageId ? Number(beverageId) : 0;
    return isNaN(id) ? 0 : id;
  }, [beverageId]);

  // ✅ useQuery 실행 방식 수정 (항상 실행, 내부에서 예외 처리)
  const { data, isLoading, error } = useQuery({
    queryKey: ["customDrink", beverageIdNumber],
    queryFn: async () => {
      if (!beverageIdNumber) return { data: null }; // 빈 데이터 반환
      return fetchCustomDrink(beverageIdNumber);
    },
  });

  // ✅ size 갖고 와서 그렇게 설정하는 거고
  useEffect(() => {  
    if (data?.data?.sizeDetails?.length && Syrupinfo?.beverageSizeId) {
      const foundIndex = data.data.sizeDetails.findIndex(
        (size) => size.id === Syrupinfo.beverageSizeId
      );
      // 찾은 인덱스가 유효한 경우에만 `setSelectedSize` 업데이트
      if (foundIndex !== -1) {
        setSelectedSize(foundIndex);
      } else {
        setSelectedSize(0); // 기본값 설정
      }
    }
  }, [data, Syrupinfo]);
  useEffect(() => {
    if (isModalOpen || isSlideUpOpen) {
      document.body.style.overflow = "hidden"; // 📌 전체 페이지 스크롤 차단
    } else {
      document.body.style.overflow = "auto"; // 📌 다시 스크롤 가능
    }

    return () => {
      document.body.style.overflow = "auto"; // 📌 Cleanup (안전한 복원)
    };
  }, [isModalOpen, isSlideUpOpen]); 

  const drinkData: BeverageDetail = data?.data || ({} as BeverageDetail);

  // ✅ useMemo 수정: `undefined` 방지 및 빈 배열 반환
  const updatedSizeDetails: SizeProps[] = useMemo(() => {
    return drinkData?.sizeDetails?.map(({ sizeType, volume }) => ({
      sizeType,
      volume,
    })) || [];
  }, [drinkData]);

  const handleSizeClick = (index: number) => {
    setSelectedSize(index);
  };

  // ✅ 즐겨찾기 추가 Mutation (추가 후 UI 업데이트)
  const scrapMutation = useMutation({
    mutationFn: ScrapCustomDrink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customDrink", beverageIdNumber] }); // 최신 데이터 가져오기
    },
    onError: (error) => {
      console.error("즐겨찾기 추가 실패 ❌:", error);
      alert("즐겨찾기 추가 중 오류 발생 ❌");
    },
  });

  const handleScrap = () => {
    setIsModalOpen(false);
    scrapMutation.mutate(drinkData.beverageId);
  };

  // ✅ 즐겨찾기 삭제 Mutation (삭제 후 UI 업데이트)
  const deleteScrapMutation = useMutation({
    mutationFn: (favoriteId: number) => DeleteScrapDrinks(favoriteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customDrink", beverageIdNumber] }); // 최신 데이터 가져오기
    },
    onError: (error) => {
      console.error("삭제 실패 ❌:", error);
    },
  });

  const handleDelete = (favoriteId: number) => {
    deleteScrapMutation.mutate(favoriteId);
  };

  return (
    <Container>
      {/* ✅ UI에서 로딩 및 에러 처리 (return 사용 X) */}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <CustomTop imgUrl={drinkData.imgUrl} />
          <Brandrink
            brand={drinkData.brand}
            drink={drinkData.name}
            onClick={() => setIsModalOpen(true)}
            onClick1={handleDelete}
            scrap={drinkData.favorite}
            beverageId={drinkData.beverageId}
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
                brand={drinkData.brand}
              />
            </>
          )}
          <Askinfo>정보 수정을 요청하고 싶어요</Askinfo>
          <Recoding onClick={() => setIsSlideUpOpen(true)} />

          {isModalOpen && (
            <Modal onClick={() => setIsModalOpen(false)} onClick1={handleScrap} brand={drinkData.brand} drink={drinkData.name} />
          )}
          {isSlideUpOpen && drinkData.sizeDetails && drinkData.sizeDetails[selectedSize] && (
            <Syrup
              Syrupmenu={drinkData.syrups}
              Syrup={Syrupinfo}
              beverageId={beverageIdNumber}
              beverageSizeId={drinkData.sizeDetails[selectedSize]?.id}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default CustomMain;
