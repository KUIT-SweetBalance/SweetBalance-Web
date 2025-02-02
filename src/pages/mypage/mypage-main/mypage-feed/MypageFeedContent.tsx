import React from 'react';
import styled from 'styled-components';

const MypageFeedContentBox = styled.div`
display: inline-flex;
padding: 0px 24px 20px 24px;
align-items: center;
gap: 5px;
`;
const MypageFeedContentLeft = styled.div`
display: flex;
padding: 11.5px 12px 18.72px 12px;
flex-direction: column;
justify-content: flex-end;
align-items: flex-end;
gap: 14px;
`;
const MypageFeedContentRight = styled.div`
display: flex;
padding: 11.5px 12px;
flex-direction: column;
justify-content: flex-end;
align-items: flex-end;
gap: 10px;
`;
const MypageFeedContentLeftTop = styled.div`
display: flex;
padding: 10px 30px 10px 10px;
flex-direction: column;
justify-content: center;
align-items: left;
align-self: stretch;
`;
const MypageFeedContentTopText = styled.div`
color: var(--text, #121212);
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: -0.5px;
`;
const MypageFeedContentLeftBottom = styled.img`
width: 142.595px;
height: 67.329px;`;
const MypageFeedContentRightBottom = styled.img`
width: 78px;
height: 78px;
flex-shrink: 0;`;
const MypageFeedContent: React.FC = () => {
    return (
        <MypageFeedContentBox>
            <MypageFeedContentLeft>
                <MypageFeedContentLeftTop>
                    <MypageFeedContentTopText>나의</MypageFeedContentTopText>
                    <MypageFeedContentTopText>기록 목록</MypageFeedContentTopText>
                </MypageFeedContentLeftTop>
                <MypageFeedContentLeftBottom src='/Feedrecord.svg' alt='record'/>
            </MypageFeedContentLeft>

            <MypageFeedContentRight>
                <MypageFeedContentLeftTop>
                    <MypageFeedContentTopText>나의</MypageFeedContentTopText>
                    <MypageFeedContentTopText>즐겨찾기 목록</MypageFeedContentTopText>
                </MypageFeedContentLeftTop>
                <MypageFeedContentRightBottom src = '/FeedStar.svg' alt='Star'/>
            </MypageFeedContentRight>
        </MypageFeedContentBox>
    );
};

export default MypageFeedContent;