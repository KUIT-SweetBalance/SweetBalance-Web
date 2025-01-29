import React from 'react';
import styled from 'styled-components';


interface ArrangementProps {
    title: string;
}

const Container = styled.div`
width:100%;
display: inline-flex;
padding: 10px 24px 20px 24px;
gap: 154.82px;
justify-content:space-between;
`;
const Lefttitle = styled.div`
color: #121212;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 142.857% */
letter-spacing: -0.35px;
`;
const Righttitle = styled.div`
display: flex;
align-items: center;
gap: 4px;`;
const Rightcontent = styled.div`
color: #121212;
text-align: right;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */
letter-spacing: -0.35px;`;
const Rightimg = styled.img`width:
 11.176px;
height: 10px;`;
const Arrangement: React.FC<ArrangementProps> = ({ title }) => {
    return (
        <Container>
            <Lefttitle>{title}</Lefttitle>
            <Righttitle>
                <Rightcontent>최신순</Rightcontent>
                <Rightimg src='/arrowtwo.svg'alt='arrow'/>
            </Righttitle>
        </Container>
    );
};

export default Arrangement;