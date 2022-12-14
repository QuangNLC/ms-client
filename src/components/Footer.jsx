import React from "react";
import styled from "styled-components";
import footerImg from "../assets/imgs/footer-img.png";
import footerPayment from "../assets/imgs/payment.png";
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
const Container = styled.div`
  width: 100%;
  background-color: lightgray;
  color: white;
  display: flex;
  padding: 20px;
  position: relative;
`;

const FooterColumn = styled.div`
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const Title = styled.h2`
  font-size: 18px;
  text-transform: capitalize;
  font-weight: 300;
  margin-bottom: 20px;
`;
const AboutUs = styled.div`
  width: 100%;
`;
const Detail = styled.p`
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
  ${(props) => props.fullHeight && "height: 100%;"}
`;
const ImageContainer = styled.div``;
const Image = styled.img``;
const ContactList = styled.ul``;
const ContactListItem = styled.li`
  display: flex;
  align-items: center;
`;
const SupportList = styled.ul``;
const SupportListItem = styled.li`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Footer = () => {
  return (
    <Container>
      <FooterColumn>
        <Title>về man shop</Title>
        <AboutUs>
          <Detail>
            Man Shop chuyên kinh doanh quần áo nam uy tín, nói không với hàng
            nhái tại Thành Phố Hà Nội.
          </Detail>
          <ImageContainer>
            <Image src={footerImg} />
          </ImageContainer>
        </AboutUs>
      </FooterColumn>
      <FooterColumn>
        <Title>liên hệ</Title>
        <ContactList>
          <ContactListItem>
            <MapTwoToneIcon style={{ fontSize: "36px", marginRight: "10px" }} />
            <Detail fullHeight={true}>
              Tòa nhà FPT Polytechnic, P.Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm,
              Hà Nội
            </Detail>
          </ContactListItem>
          <ContactListItem>
            <LocalPhoneTwoToneIcon
              style={{ fontSize: "36px", marginRight: "10px" }}
            />
            <Detail fullHeight={true}>0346.410.888</Detail>
          </ContactListItem>
          <ContactListItem>
            <EmailTwoToneIcon
              style={{ fontSize: "36px", marginRight: "10px" }}
            />
            <Detail fullHeight={true}>s21manshop@gmail.com</Detail>
          </ContactListItem>
        </ContactList>
      </FooterColumn>
      <FooterColumn>
        <Title>hỗ trợ khách hàng</Title>
        <SupportList>
          <SupportListItem>Chính sách đổi trả</SupportListItem>
          <SupportListItem>Chính sách bảo mật</SupportListItem>
          <SupportListItem>Chính sách mua hàng online</SupportListItem>
          <SupportListItem>Chính sách bảo hành</SupportListItem>
        </SupportList>
      </FooterColumn>
      {/* <FooterColumn>
        <Title>thanh toán</Title>
        <ImageContainer style={{ marginTop: "30px" }}>
          <Image src={footerPayment} />
        </ImageContainer>
      </FooterColumn> */}
    </Container>
  );
};

export default Footer;
