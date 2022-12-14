import React, { useEffect, useState } from "react";
import "../../styles/productCard.css";
import Filters from "../../components/Products/Filters";
import Search from "../../components/Products/Search";
import ProductList from "../../components/Products/ProductList";
import Products from '../../components/Products'
import productAPI from "../../api/productsAPI";

import styled from 'styled-components'
import Helmet from "../../components/Helmet";
import DialogHOC from "../../hoc/DialogHOC";
import { Popconfirm, Pagination, Spin } from 'antd'
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: 100%;
`
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`
const FilterContainer = styled.div`
  padding: 20px;
  width: 20%;
  position: fixed;
  height: 100%;
  top: 80px;
  left: 0px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`

const FilterTitle = styled.div`
  width: 100%;
  text-align:center;
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 400;
  margin-top: 30px;
  
`
const FilterItemContainer = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 10px;
`
const FilterItemTitle = styled.p`
  font-size: 18px;
  text-transform: capitalize;
  font-weight: 600;
  margin-bottom: 10px;
`

const SortSelect = styled.select`
  padding : 10px;
  border-radius: 10px;
  font-size: 18px;
`
const SortSelectOption = styled.option`
  padding : 10px;
  font-size: 18px;
`

const CategorySelect = styled.select`
  padding : 10px;
  border-radius: 10px;
  font-size: 18px;
`
const CategorySelectOption = styled.option`
  padding : 10px;
  font-size: 18px;
`
const SizeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
const SizeOption = styled.div`
  width: 50%;
  padding: 5px;
  display: flex;
  align-items: center;
`
const SizeCheckbox = styled.input`
    width: 20px;
    height:  20px;
    margin-right:  10px;
`
const SizeCheckboxLabel = styled.label``
const Size = styled.input`
  margin-right: 10px
`
const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const MinPrice = styled.div`
  width: 40%;
  padding: 5px;
  display: flex;
  flex-direction: column;
`
const MinPriceInPut = styled.input`
  padding: 5px;
  border: 1px solid gray;
  border-radius: 5px;
  outline: none;
`
const MaxPrice = styled.div`
  width: 40%;
  padding: 5px;
  display: flex;
  flex-direction: column;
`
const MaxPriceInPut = styled.input`
  padding: 5px;
  border: 1px solid gray;
  border-radius: 5px;
  outline: none;
`
const FilterButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:  column;
  margin-bottom: 10px;
`

const FilterButton = styled.div`
  margin-bottom: 10px;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  color: white;
  background-color: teal;
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.25s ease-in;

  &:hover{
    background-color: darkblue;
  }
`
const ProductListContainer = styled.div`
  transform: translateX(25%);
  padding: 20px;
  width: 80%;
`
const PaginationContaier = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Page = styled.div`
  color: ${props => props.curr ? "white" : "black"};
  width: 40px;
  height: 40px;
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin : 10px;
  transition: all 0.25s ease-in;
  background-color: ${props => props.curr ? "rgba(0,0,0,0.65)" : "transparent"};



  &:hover{
    color: white;
    background-color: rgba(0,0,0,0.65);
  }

`
const sortOption = [
  // { id: 1, by: 'name', sort: 'asc', title: 'Từ A-Z' },
  // { id: 2, by: 'name', sort: 'desc', title: 'Từ Z-A' },
  { id: 3, by: 'price', sort: 'asc', title: 'Từ Giá tăng dần' },
  { id: 4, by: 'price', sort: 'desc', title: 'Từ Giá giảm dần' },
  // { id: 5, by: 'createdAt', sort: 'asc', title: 'Ngày ra mắt(gần nhất)' },
  // { id: 6, by: 'createdAt', sort: 'desc', title: 'Ngày ra mắt(lâu nhất)' }
]

const WebTestProductList = (props) => {
  // const [products, setProducts] = useState([])
  // const [currPage, setCurrPage] = useState(1)
  // const [totalPage, setTotalPage] = useState(1)
  // const [categories, setCategories] = useState([])
  // const [sizes, setSizes] = useState([])
  // const [filterInfo, setFilterInfo] = useState({
  //   categoryId: 0,
  //   sizes: [],
  //   minPrice: null,
  //   maxPrice: null,
  //   sortname: ""
  // })

  // const onChangeSortOption = (e) => {
  //   setFilterInfo({
  //     ...filterInfo,
  //     sortOptionId: e.target.value
  //   })
  // }
  // const onChangeCate = (e) => {
  //   setFilterInfo({
  //     ...filterInfo,
  //     categoryId: e.target.value
  //   })
  // }

  // const onChangeSizes = (e, id) => {
  //   if (e.target.checked) {
  //     if (!checkSizeCheckbox(filterInfo.sizes, id)) {
  //       setFilterInfo({
  //         ...filterInfo,
  //         sizes: [...filterInfo.sizes, id]
  //       })
  //     }
  //   } else {
  //     if (checkSizeCheckbox(filterInfo.sizes, id)) {
  //       setFilterInfo({
  //         ...filterInfo,
  //         sizes: filterInfo.sizes.filter(item => item !== id)
  //       })
  //     }
  //   }


  // }


  // const checkSizeCheckbox = (arr, id) => {
  //   let result = false;

  //   if (arr.find(item => item === id)) {
  //     result = true;
  //   }

  //   return result;
  // }

  // const handleClearFilterInfo = () => {
  //   setFilterInfo({
  //     categoryId: 0,
  //     sizes: [],
  //     minPrice: null,
  //     maxPrice: null,
  //     sortname: ""
  //   });
  //   setCurrPage(1)
  // }

  // const handleFilterProduct = () => {
  //   productAPI.getByFilter(filterInfo, 1, 15)
  //     .then((res) => {
  //       if (!res.status) {
  //         setProducts(res.list);
  //         setCurrPage(res.currentPage)
  //         setTotalPage(res.totalItems)
  //       } else {
  //         console.log(res)
  //       }
  //     })
  //     .catch(err => console.log(err))
  // }

  // useEffect(() => {
  //   console.log(filterInfo)
  //   console.log(currPage)
  //   productAPI.getByFilter(filterInfo, currPage, 15)
  //     .then((res) => {
  //       if (!res.status) {
  //         console.log(res)
  //         setProducts(res.list);
  //         setTotalPage(res.totalItems)
  //       } else {
  //         console.log(res)
  //       }
  //     })
  //     .catch(err => console.log(err))
  // }, [currPage])

  // useEffect(() => {
  //   productAPI.getFilterInfo()
  //     .then(res => {
  //       if (!res.status) {
  //         setCategories(res.categories)
  //         setSizes(res.sizes)
  //       } else {
  //         console.log(res);
  //       }
  //     })
  //     .catch(err => console.log(err));
  //   productAPI.getByFilter({
  //     "categoryId": 0,
  //     "sizes": [],
  //     "minPrice": null,
  //     "maxPrice": null,
  //     "sortname": ""
  //   }, 1, 15)
  //     .then(res => {
  //       setProducts(res.list)
  //       setTotalPage(res.totalItems)
  //       setFilterInfo({
  //         ...filterInfo,
  //         categoryId: 0,
  //         minPrice: null,
  //         maxPrice: null,
  //         sizes: [],
  //         sortOptionId: 1
  //       })
  //     })
  //     .catch(err =>
  //       console.log(err)
  //     )
  // }, [])

  // return (

  //   <Helmet
  //     title="Danh sách sản phẩm"
  //   >
  //     <Container>
  //       <Wrapper>
  //         <FilterContainer>
  //           <FilterTitle>bộ lọc sản phẩm</FilterTitle>
  //           {/* <FilterItemContainer>
  //             <FilterItemTitle>sắp xếp theo</FilterItemTitle>
  //             <SortSelect
  //               name="sortOptionId"
  //               onChange={onChangeSortOption}
  //               value={filterInfo.sortOptionId}
  //             >
  //               {
  //                 sortOption.map((item, index) => (
  //                   <SortSelectOption key={item.id} value={item.id}>{item.title}</SortSelectOption>
  //                 ))
  //               }

  //             </SortSelect>
  //           </FilterItemContainer> */}
  //           <FilterItemContainer>
  //             <FilterItemTitle>thể loại</FilterItemTitle>
  //             <CategorySelect
  //               onChange={onChangeCate}
  //               name="categoryId"
  //               value={filterInfo.categoryId}
  //             >
  //               <CategorySelectOption value={0} >Tất cả</CategorySelectOption>
  //               {
  //                 categories.length > 0 && categories.map((item, index) => (
  //                   <CategorySelectOption key={item.id} value={item.id}>{item.title}</CategorySelectOption>
  //                 ))
  //               }
  //             </CategorySelect>
  //           </FilterItemContainer>
  //           <FilterItemContainer style={{ paddingTop: "0px" }}>
  //             <FilterItemTitle>Size</FilterItemTitle>
  //             <SizeContainer>
  //               {
  //                 sizes.length > 0 && sizes.map((item, index) => (
  //                   <SizeOption key={item.id} onClick={(e) => onChangeSizes(e, item.id)}>
  //                     <SizeCheckbox type='checkbox' checked={checkSizeCheckbox(filterInfo.sizes, item.id)} onChange={(e) => onChangeSizes(e, item.id)} />
  //                     <SizeCheckboxLabel>{item.title}</SizeCheckboxLabel>
  //                   </SizeOption>
  //                 ))
  //               }
  //             </SizeContainer>
  //           </FilterItemContainer>
  //           <FilterItemContainer style={{ paddingTop: "0px" }}>
  //             <FilterItemTitle style={{ marginBottom: "0px", paddingTop: "0px" }}>Giá</FilterItemTitle>
  //             <PriceContainer>
  //               <MinPrice>
  //                 Từ <MinPriceInPut />
  //               </MinPrice>
  //               <MaxPrice>
  //                 Đến <MaxPriceInPut />
  //               </MaxPrice>
  //             </PriceContainer>
  //           </FilterItemContainer>
  //           <FilterButtonContainer>
  //             <Popconfirm
  //               title="Xóa bộ lọc"
  //               onConfirm={handleClearFilterInfo}
  //               onCancel={() => { console.log('cancle') }}
  //               okText="Xóa"
  //               cancelText="Hủy"
  //             >
  //               <FilterButton>Xóa bộ lọc</FilterButton>
  //             </Popconfirm>
  //             <FilterButton onClick={handleFilterProduct}>Lọc sản phẩm</FilterButton>
  //           </FilterButtonContainer>
  //         </FilterContainer>
  //         <ProductListContainer>
  //           {
  //             products.length > 0 &&
  //             <Products items={products} />
  //           }
  //           <PaginationContaier>
  //             {
  //               Array.from(Array(totalPage).keys()).map((item, index) => (
  //                 <Page key={index} curr={(index + 1) === currPage}
  //                   onClick={() => { setCurrPage(index + 1) }}
  //                 >
  //                   {item + 1}
  //                 </Page>
  //               ))
  //             }
  //           </PaginationContaier>
  //         </ProductListContainer>
  //       </Wrapper>
  //     </Container>
  //   </Helmet>
  // );

  const {page, categoryId} = useParams()
  const [products, setProducts] = useState([])
  const [showProducts, setShowProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currPage, setCurrPage] = useState(1)


  console.log(page, categoryId)

  const onChangePage = (page, total) => {
    setCurrPage(page)
    setIsLoading(true)
  }

  useEffect(() => {
    if (currPage) {
      const prData = products
      let showList = prData.slice(((currPage - 1) * 10), 10)
      console.log(showList)
      setShowProducts(showList)
      setIsLoading(false)
    }
  }, [currPage])

  useEffect(() => {
    productAPI.getAll()
      .then(res => {
        if (!res.status) {
          setProducts(res)
          const prData = [...res]
          let showList = prData.slice(((currPage - 1) * 10), 10)
          setShowProducts(showList)
          setIsLoading(false)
        } else {
          console.log(res)
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <Helmet
      title="Sản Phẩm"
    >
      <Container>
        <Wrapper>
          <FilterContainer>

          </FilterContainer>
          <ProductListContainer>
            {
              isLoading ?
                (
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 50 }}>
                    Loading ...<Spin />
                  </div>
                )
                :
                (
                  <>
                    {showProducts &&
                      <Products items={showProducts} />}
                    <Pagination current={currPage} total={products.length} onChange={onChangePage} pageSize={10} showSizeChanger={false}/>
                  </>

                )
            }
          </ProductListContainer>
        </Wrapper>
      </Container>
    </Helmet>
  )
};

export default WebTestProductList;
