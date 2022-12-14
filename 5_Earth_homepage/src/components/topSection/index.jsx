import React from 'react';
import styled from 'styled-components';

const TopSectionContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #33333381;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20%;
  z-index: 2;
`;
const Logo = styled.div`
  margin: 0;
  color: #fff;
  font-weight: 700;
  font-size: 55px;
`;
const Slogan = styled.h4`
  margin: 0;
  color: #fff;
  font-weight: 700;
  font-size: 30px;
  margin-top: 1em;
`;
const Paragraph = styled.p`
  margin: 0;
  margin-top: 1em;
  color: #fff;
  font-size: 20px;
  line-height: 1.5;
  font-weight: 500;
  max-width: 50%;
  text-align: center;
`;
const DonateButton = styled.button`
  outline: none;
  border: 2px solid #fff;
  background-color: transparent;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  padding: 8px 14px;
  margin-top: 3em;
  cursor: pointer;
`;

export default function TopSection() {
  return (
    <TopSectionContainer>
      <Logo>Global Warming</Logo>
      <Slogan>Keep it cool for safe living</Slogan>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio assumenda
        architecto laudantium hic excepturi velit modi, maiores at illum porro.
      </Paragraph>
      <DonateButton>Donate</DonateButton>
    </TopSectionContainer>
  );
}
