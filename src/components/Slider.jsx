import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ArrowLeftTwoToneIcon from "@mui/icons-material/ArrowLeftTwoTone";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
import slider01 from "../assets/imgs/slider01.png";
import slider02 from "../assets/imgs/slider02.png";
import slider03 from "../assets/imgs/slider03.png";

const Container = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  overflow: hidden;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  transition: all 1s ease-in;
  transform: translateX(-${(props) => props.currIndex * 100}vw);
`;

const ArrowLeft = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateX(50%);
  cursor: pointer;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.25 ease-in;

  &:hover {
    background-color: rgba(0, 0, 0, 0.85);
    transform: scale(1.1) translateX(50%);
  }
`;
const ArrowRight = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.25 ease-in;

  &:hover {
    background-color: rgba(0, 0, 0, 0.85);
    transform: scale(1.1) translateX(-50%);
  }
`;

const Slide = styled.div`
  width: 100vw;
  height: 75vh;
  position: relative;
  position: relative;
`;

const BgImageContainer = styled.div`
    width: 100%;
    height: 100%
    position: absolute;
    top: 0;
    left: 0;
`;
const BgImage = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: cover;
`;

const Slider = ({ items }) => {
  const images = [slider01, slider02, slider03];

  const [slideIndex, setSlideIndex] = useState(0);

  const hanldeClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : items.length - 1);
    } else {
      setSlideIndex(slideIndex < items.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Wrapper currIndex={slideIndex}>
        {images.map((item, key) => (
          <Slide key={key}>
            <BgImageContainer>
              <BgImage src={item} />
            </BgImageContainer>
            <ArrowLeft onClick={() => hanldeClick("left")}>
              <ArrowLeftTwoToneIcon
                style={{ color: "white", fontSize: "36px" }}
              />
            </ArrowLeft>
            <ArrowRight onClick={() => hanldeClick("right")}>
              <ArrowRightTwoToneIcon
                style={{ color: "white", fontSize: "36px" }}
              />
            </ArrowRight>
          </Slide>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Slider;
