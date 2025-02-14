import React ,{useState} from 'react';
import styled from 'styled-components';
// import Button from '../../components/button/Button';
import Modal from './custom-main/Modal';
import Syrup from './custom-main/Syrup';
import Recoding from './custom-main/Recording';
import CustomTop from './CustomTop/CustomTop';
import Brandrink from './CustomBrandrink/CustomBradrink';
import SizeComponent from './customSizecomponent/SizeComponent';
import SKC from './CustomSKC/SKC';
import Recommend from './Recommend/Recommend';
import { useParams,useLocation  } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchCustomDrink,BeverageDetailResponse,BeverageDetail,SizeDetail,RecommendedBeverage } from '../../api/custom/custommain';

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
  font-family: 'Pretendard';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.3px;
`;



  
// { brand, drink, sugar, kcal, caffeine ,scrap}

const CustomMain: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [isSlideUpOpen, setIsSlideUpOpen] = useState(false); // 슬라이드 업 모달
    const [realScrap, setrealScrap] = useState(false); // 슬라이드 업 모달
    const { beverageId } = useParams<{ beverageId: string }>();
    const beverageIdNumber = Number(beverageId);
    const location = useLocation();
    const Syrupinfo = location.state?.drink;
    const handleSizeClick = (index: number) => {
      setSelectedSize(index);
    };
    const [selectedSize, setSelectedSize] = React.useState<number>(0);
    const { data, isLoading, error } = useQuery({
      queryKey: ["customDrink", beverageIdNumber], // 음료 ID별 캐싱을 위해 key 설정
      queryFn: () => fetchCustomDrink(beverageIdNumber!),
      enabled: !!beverageIdNumber, // query will not execute until beverageIdNumber exists
    });
  
    // ✅ 로딩 상태
    if (isLoading) return <p>Loading...</p>;
    
    // ✅ 에러 처리
    if (error) return <p>Error: {error.message}</p>;
  
    // ✅ 정상적으로 데이터 로드된 경우
    const drinkData: BeverageDetail = data?.data || {} as BeverageDetail;
    console.log(drinkData)
    const updatedSizeDetails: SizeProps[]  = drinkData.sizeDetails.map(({ sizeType, volume }: { sizeType: string; volume: number }) => ({
      sizeType,
      volume,
    }));

    const    handleStarClick = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // 모달 닫기
    };
    const handleRecodingClick = () => {
        setIsSlideUpOpen(true); // 슬라이드 업 모달 열기
    };

    const handleSlideUpClose = () => {
      setIsSlideUpOpen(false); // 슬라이드 업 모달 닫기
  };
  const handleScrap = () => {
    setIsModalOpen(false); // 모달 닫기

    setrealScrap(prev => !prev); // 스크랩 상태 토글
};

      
    return (
        <Container>
            <CustomTop imgUrl={drinkData.imgUrl}/>
            <Brandrink brand={drinkData.brand} drink={drinkData.name} onClick={handleStarClick} onClick1={handleScrap} scrap ={drinkData.favorite} />
            <SizeComponent sizes={updatedSizeDetails} selectedSize={selectedSize} handleSizeClick={handleSizeClick}/>
            <SKC sugar={drinkData.sizeDetails[selectedSize].sugar} kcal={drinkData.sizeDetails[selectedSize].calories} caffeine={drinkData.sizeDetails[selectedSize].caffeine} />
            <GrayBox />
            <Recommend recom={drinkData.sizeDetails[selectedSize].recommends} sugar={drinkData.sizeDetails[selectedSize].sugar}  brand={drinkData.brand} />
            <Askinfo>정보 수정을 요청하고 싶어요</Askinfo>
            <Recoding  onClick ={handleRecodingClick }/>
            {/* 팝업 모달 */}
            {isModalOpen && (
                <Modal onClick={handleModalClose} onClick1={handleScrap}brand={drinkData.brand} drink={drinkData.name}/>
            )}
            {isSlideUpOpen && (
                <Syrup Syrupmenu={drinkData.syrups} Syrup={Syrupinfo} beverageId={beverageIdNumber} beverageSizeId={drinkData.sizeDetails[selectedSize].id}/>
            )}
            
        </Container>
    );
};


export default CustomMain;
