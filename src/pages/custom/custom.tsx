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

interface Props {
  brand: string;
  drink: string;
  sugar: number;
  kcal: number;
  caffeine: number;
  scrap: boolean;
}
interface SizeProps {
  name: string;
  size: number;
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



  


const CustomMain: React.FC<Props> = ({ brand, drink, sugar, kcal, caffeine ,scrap}) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [isSlideUpOpen, setIsSlideUpOpen] = useState(false); // 슬라이드 업 모달
    const [realScrap, setrealScrap] = useState(scrap); // 슬라이드 업 모달

    const sizes: SizeProps[] = [
        { name: 'SHORT', size: 236 },
        { name: 'TALL', size: 354 },
        { name: 'GRANDE', size: 473 },
        { name: 'VENTI', size: 591 },  
    ];

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
            <CustomTop/>
            <Brandrink brand={brand} drink={drink} onClick={handleStarClick} onClick1={handleScrap} scrap ={realScrap} />
            <SizeComponent sizes={sizes} />
            <SKC sugar={sugar} kcal={kcal} caffeine={caffeine} />
            <GrayBox />
            <Recommend  sugar={sugar}  brand={brand} />
            <Askinfo>정보 수정을 요청하고 싶어요</Askinfo>
            <Recoding sugar={sugar} onClick ={handleRecodingClick } />
            {/* 팝업 모달 */}
            {isModalOpen && (
                <Modal onClick={handleModalClose} onClick1={handleScrap}brand={brand} drink={drink}/>
            )}
              {isSlideUpOpen && (
                <Syrup  sugar={sugar} onClick={handleSlideUpClose}/>
            )}
            
        </Container>
    );
};


export default CustomMain;
