// import React, { useEffect, useState } from "react";
// import Helmet from "../../components/Helmet";
// import { sliderData, productData } from "../../assets/data/data";
// import Slider from "../../components/Slider";
// import styled from "styled-components";
// import Announcement from "../../components/Announcement";
// import cate1 from '../../assets/imgs/category-img-1.jpg';
// import cate2 from '../../assets/imgs/category-img-2.jpg';
// import cate3 from '../../assets/imgs/category-img-4.jpg';
// import Products from "../../components/Products";
// import { Link } from "react-router-dom";
// import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
// import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
// import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
// import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
// import productAPI from "../../api/productsAPI";
// import vietnamData from '../../assets/data/vietnamData.json';
// import addressAPI from "../../api/addressAPI";

// const CategoriesContainer = styled.div`
//   width: 100%;
//   padding: 80px 50px;
//   display: flex;
//   align-items: center;
//   justify-content:space-between;
//   flex-wrap: wrap;
// `
// const CategoryWrapper = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: center;
// `
// const CategoryImageContainer = styled.div`
//   width: 360px;
//   height: 480px;
//   position: relative;
//   text-align: center;
// `
// const CategoryImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: -1;
// `

// const CategoryTitle = styled.h3`
//   margin-top: 20px;
//   font-size: 26px;
//   color: white
// `
// const Button = styled.button`
//   margin-top: 20px;
//   padding: 10px 18px;
//   border-radius: 4px;
//   border: none;
//   cursor: pointer;
//   font-size: 16px;
//   font-weight: 500;
//   color: white;
//   background-color: rgba(0,0,0,0.65);
//   transition: all 0.25s ease-in;
//   &:hover{
//     background-color: red;
//   }
// `

// const ProductSection = styled.div`
//   margin-top: 120px;

// `
// const ProductSectionTitle = styled.h2`
//   font-size: 36px;
//   font-weight: 500;
//   width: 100%;
//   text-align: center;
//   margin-bottom: 10px;
// `
// const ProductSectionNavigate = styled.div`
//   margin-top: 30px;
//   width: 100%;
//   display: flex;
//   justify-content: center;
// `

// const NavButton = styled.button`
//   padding: 10px 20px;
//   background-color: rgba(0,0,0,0.85);
//   border-radius: 4px;
//   border: none;
//   font-size: 20px;
//   font-weight: 400;
//   cursor: pointer;
//   transition:all 0.25s ease-in;
//   color: white;

//   &:hover{
//     background-color: red;
//   }
// `

// const ServiceContainer = styled.div`
//   width: 100%;
//   margin: 50px 0;
//   padding: 0 50px;
//   display: flex;

// `
// const Service = styled.div`
//   flex : 1;
//   padding: 10px;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   justify-content: flex-start;
//   border: 0.5px solid lightgray;
// `
// const ServiceIcon = styled.div`
// `
// const ServiceTitle = styled.h3`
//   font-weight: 500;
//   margin: 20px;
// `
// const ServiceDesc = styled.div`
//   color: #666;
//   font-size: 14px;
//   font-weight: 300;
//   text-align: justify;
// `

// const WebHomePage = () => {

//   const [newProducts, setNewProducts] = useState([])

//   const fillData = () => {
//     console.log('fillData')
//     const cityData = vietnamData.map((item) => ({ title: item.Name }))
//     console.log(vietnamData)

//     addressAPI.fillCitysData(cityData)
//       .then(res => {
//         if (!res.status) {
//           console.log(res)
//         } else {
//           console.log(res)
//         }
//       })
//       .then(res => {
//         vietnamData.forEach((city, index) => {
//           const districtData = city.Districts.map((item) => {
//             return {
//               title: item.Name,
//               wards: item.Wards.map(ward => ({ title: ward.Name }))
//             }
//           })
//           addressAPI.fillDistrictsData(districtData, (index + 1))
//             .then(res => {
//               console.log(res)
//             })
//             .catch(err => console.log(err))
//         })
//       })
//       .catch(err => console.log(err))

//   }

//   return (
//     <Helmet title={"Trang Ch???"}>
//       <Slider items={sliderData} />
//       <div>
//         <button onClick={fillData}> fill</button>
//       </div>
//       <ProductSection>
//         <ProductSectionTitle>S???n Ph???m M???i Nh???t</ProductSectionTitle>
//         {
//           newProducts && newProducts.length > 0 &&
//           <Products items={newProducts} />
//         }
//         <ProductSectionNavigate>
//           <Link to="/products">
//             <NavButton>
//               Xem T???t C???
//             </NavButton>
//           </Link>
//         </ProductSectionNavigate>
//       </ProductSection>
//       <ServiceContainer>
//         <Service>
//           <ServiceIcon><PaymentOutlinedIcon style={{ fontSize: "40px" }} /></ServiceIcon>
//           <ServiceTitle>Thanh To??n An To??n</ServiceTitle>
//           <ServiceDesc>H??? tr??? nhi???u h??nh th???c thanh to??n.</ServiceDesc>
//         </Service>
//         <Service>
//           <ServiceIcon><CurrencyExchangeOutlinedIcon style={{ fontSize: "40px" }} /></ServiceIcon>
//           <ServiceTitle>Ho??n Ti???n V???i S???n Ph???m L???i</ServiceTitle>
//           <ServiceDesc>H??? tr??? ho??n ti???n ho???c ?????i tr??? trong 15 ng??y ?????u n???u c?? l???i t??? nh?? s???n xu???t.</ServiceDesc>
//         </Service>
//         <Service>
//           <ServiceIcon><MarkChatReadOutlinedIcon style={{ fontSize: "40px" }} /></ServiceIcon>
//           <ServiceTitle>H??? Tr??? Tr???c Tuy???n</ServiceTitle>
//           <ServiceDesc>H??? tr??? tr???c tuy???n 24/7 v??o c??c ng??y th?????ng, ng??y trong tu???n.</ServiceDesc>
//         </Service>
//         <Service>
//           <ServiceIcon><DiamondOutlinedIcon style={{ fontSize: "40px" }} /></ServiceIcon>
//           <ServiceTitle>Nhi???u ??u ????i H???p D???n</ServiceTitle>
//           <ServiceDesc>????ng k?? h???i vi??n ngay ????? nh???n nhi???u ??u ????i h???p d???n s???m nh???t.</ServiceDesc>
//         </Service>
//       </ServiceContainer>
//       <ProductSection>
//         <ProductSectionTitle>C?? Th??? B???n S??? Th??ch</ProductSectionTitle>
//         {
//           newProducts && newProducts.length > 0 &&
//           <Products items={newProducts} />
//         }
//         <ProductSectionNavigate>
//           <Link to="/products">
//             <NavButton>
//               Xem T???t C???
//             </NavButton>
//           </Link>
//         </ProductSectionNavigate>
//       </ProductSection>
//     </Helmet>
//   );
// };

// export default WebHomePage;

import React, { useEffect, useState } from "react";
import Helmet from "../../components/Helmet";
import { sliderData, productData } from "../../assets/data/data";
import Slider from "../../components/Slider";
import styled from "styled-components";
import Announcement from "../../components/Announcement";
import cate1 from "../../assets/imgs/category-img-1.jpg";
import cate2 from "../../assets/imgs/category-img-2.jpg";
import cate3 from "../../assets/imgs/category-img-4.jpg";
import Products from "../../components/Products";
import { Link } from "react-router-dom";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import MarkChatReadOutlinedIcon from "@mui/icons-material/MarkChatReadOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import productAPI from "../../api/productsAPI";
import vietnamData from "../../assets/data/vietnamData.json";
import addressAPI from "../../api/addressAPI";

const CategoriesContainer = styled.div`
  width: 100%;
  padding: 80px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const CategoryWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
const CategoryImageContainer = styled.div`
  width: 360px;
  height: 480px;
  position: relative;
  text-align: center;
`;
const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const CategoryTitle = styled.h3`
  margin-top: 20px;
  font-size: 26px;
  color: white;
`;
const Button = styled.button`
  margin-top: 20px;
  padding: 10px 18px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: white;
  background-color: rgba(0, 0, 0, 0.65);
  transition: all 0.25s ease-in;
  &:hover {
    background-color: red;
  }
`;

const ProductSection = styled.div`
  margin-top: 120px;
`;
const ProductSectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 500;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
`;
const ProductSectionNavigate = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NavButton = styled.button`
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 4px;
  border: none;
  font-size: 20px;clea
  font-weight: 400;
  cursor: pointer;
  transition: all 0.25s ease-in;
  color: white;
  &:hover {
    background-color: red;
  }
`;

const ServiceContainer = styled.div`
  width: 100%;
  margin: 50px 0;
  padding: 0 50px;
  display: flex;
`;
const Service = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  border: 0.5px solid lightgray;
`;
const ServiceIcon = styled.div``;
const ServiceTitle = styled.h3`
  font-weight: 500;
  margin: 20px;
`;
const ServiceDesc = styled.div`
  color: #666;
  font-size: 14px;
  font-weight: 300;
  text-align: justify;
`;

const WebHomePage = () => {
  const [newProducts, setNewProducts] = useState([]);

  const fillData = () => {
    console.log("fillData");
    const cityData = vietnamData.map((item) => ({ title: item.Name }));
    console.log(vietnamData);

    addressAPI
      .fillCitysData(cityData)
      .then((res) => {
        if (!res.status) {
          console.log(res);
        } else {
          console.log(res);
        }
      })
      .then((res) => {
        vietnamData.forEach((city, index) => {
          const districtData = city.Districts.map((item) => {
            return {
              title: item.Name,
              wards: item.Wards.map((ward) => ({ title: ward.Name })),
            };
          });
          addressAPI
            .fillDistrictsData(districtData, index + 1)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Helmet title={"Trang Ch???"}>
      {/* <Announcement /> */}
      <Slider items={sliderData} />

      {/* Fill data from .json file to sql server data */}
      {/* <div>
        <button onClick={fillData}> fill</button>
      </div> */}
      {/* <CategoriesContainer>
        <CategoryWrapper>
          <CategoryImageContainer>
            <CategoryTitle>Qu???n B??</CategoryTitle>
            <Button>Mua Ngay</Button>
            <CategoryImage src={cate1} />
          </CategoryImageContainer>
        </CategoryWrapper>
        <CategoryWrapper>
          <CategoryImageContainer>
            <CategoryTitle>Gi??y</CategoryTitle>
            <Button>Mua Ngay</Button>
            <CategoryImage src={cate2} />
          </CategoryImageContainer>
        </CategoryWrapper>
        <CategoryWrapper>
          <CategoryImageContainer>
            <CategoryTitle>Ph??? Ki???n</CategoryTitle>
            <Button>Mua Ngay</Button>
            <CategoryImage src={cate3} />
          </CategoryImageContainer>
        </CategoryWrapper>
      </CategoriesContainer> */}
      <ProductSection>
        <ProductSectionTitle>S???n Ph???m M???i Nh???t</ProductSectionTitle>
        {newProducts && newProducts.length > 0 && (
          <Products items={newProducts} />
        )}
        <ProductSectionNavigate>
          <Link to="/products">
            <NavButton>Xem T???t C???</NavButton>
          </Link>
        </ProductSectionNavigate>
      </ProductSection>
      <ServiceContainer>
        <Service>
          <ServiceIcon>
            <PaymentOutlinedIcon style={{ fontSize: "40px" }} />
          </ServiceIcon>
          <ServiceTitle>Thanh To??n An To??n</ServiceTitle>
          <ServiceDesc>H??? tr??? nhi???u h??nh th???c thanh to??n.</ServiceDesc>
        </Service>
        <Service>
          <ServiceIcon>
            <CurrencyExchangeOutlinedIcon style={{ fontSize: "40px" }} />
          </ServiceIcon>
          <ServiceTitle>Ho??n Ti???n V???i S???n Ph???m L???i</ServiceTitle>
          <ServiceDesc>
            H??? tr??? ho??n ti???n ho???c ?????i tr??? trong 15 ng??y ?????u n???u c?? l???i t??? nh??
            s???n xu???t.
          </ServiceDesc>
        </Service>
        <Service>
          <ServiceIcon>
            <MarkChatReadOutlinedIcon style={{ fontSize: "40px" }} />
          </ServiceIcon>
          <ServiceTitle>H??? Tr??? Tr???c Tuy???n</ServiceTitle>
          <ServiceDesc>
            H??? tr??? tr???c tuy???n 24/7 v??o c??c ng??y th?????ng, ng??y trong tu???n.
          </ServiceDesc>
        </Service>
        <Service>
          <ServiceIcon>
            <DiamondOutlinedIcon style={{ fontSize: "40px" }} />
          </ServiceIcon>
          <ServiceTitle>Nhi???u ??u ????i H???p D???n</ServiceTitle>
          <ServiceDesc>
            ????ng k?? h???i vi??n ngay ????? nh???n nhi???u ??u ????i h???p d???n s???m nh???t.
          </ServiceDesc>
        </Service>
      </ServiceContainer>
      <ProductSection>
        <ProductSectionTitle>C?? Th??? B???n S??? Th??ch</ProductSectionTitle>
        {newProducts && newProducts.length > 0 && (
          <Products items={newProducts} />
        )}
        <ProductSectionNavigate>
          <Link to="/products">
            <NavButton>Xem T???t C???</NavButton>
          </Link>
        </ProductSectionNavigate>
      </ProductSection>
    </Helmet>
  );
};

export default WebHomePage;
