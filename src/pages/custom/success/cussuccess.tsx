import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/button/Button';
const Circle = styled.div`
    display: flex;
    flex-direction: column;
    width:273px;
    height: 273px;
    padding: 59px 98px;
    align-items: center;
    gap: 10px;
    border-radius: 136.5px;
    border: 1.934px solid #D6AC8A;
`;

const Img = styled.img`
    width: 66.347px;
    height: 91.717px;
`;

const Sugar = styled.div`
    color: var(--text, #121212);
    text-align: center;
    font-family: 'Pretendard';
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.5px;
`;

const Complete = styled.div`
    color: var(--secondary, #D6AC8A);
    text-align: center;
    font-family: 'Pretendard';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.5px;
`;
const Success: React.FC = () => {
    return (
        <>
        <Circle>
            <Img src='/recording.svg' alt='recording'/>
            <Sugar>당 5g</Sugar>
            <Complete>기록 완료</Complete>
        </Circle>
        </>
    );
};

const Successbox = styled.div`
    padding: 290px 60px;
`;

const ButtonBox = styled.div`
width:100%;
    display: flex;
    padding: 10px 24px;
    align-items: center;
    gap: 17px;
    position: absolute;
    bottom:0;
`;

const CusSuccess: React.FC = () => {
    return (
        <>
            <Successbox>
                <Success/>
            </Successbox>
            <ButtonBox>
                <Button content='계속 기록하기' bgColor='bg-white' size='lg'/>
                <Button content='홈으로' bgColor='bg-primary' size='lg'/>
            </ButtonBox>
        </>
    );
};

export default CusSuccess;