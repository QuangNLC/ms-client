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
import { Popconfirm, Pagination, Spin, Select, Tooltip, Typography, Checkbox, Empty, Button } from 'antd'
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  width: 100%;
`
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`
const FiltersContainer = styled.div`
  width: 20%;
  padding: 20px;
`
const FilterItem = styled.div`
  width: 100%;
  padding 20px;
`

const FilterItemTitle = styled.div`
  width: 100%;
`
const SizesWrapper = styled.div``
const SizeItem = styled.div``
const ProductListContainer = styled.div`
  padding: 20px;
  width: 80%;
`
const ProductListWrrapper = styled.div`
  width: 100%;
`
const ProductFilterContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
`

const ProductFilerItem = styled.div`
  padding: 5px;
`


const sortOption = [
  { id: 1, by: 'name', sort: 'asc', byTitle: 'Theo Tên Sản Phẩm', title: 'Từ A-Z' },
  { id: 2, by: 'name', sort: 'desc', byTitle: 'Theo Tên Sản Phẩm', title: 'Từ Z-A' },
  { id: 3, by: 'price', sort: 'asc', byTitle: 'Theo Giá Sản Phẩm', title: 'Giá tăng dần' },
  { id: 4, by: 'price', sort: 'desc', byTitle: 'Theo Giá Sản Phẩm', title: 'Giá giảm dần' },
  { id: 5, by: 'createdAt', sort: 'asc', byTitle: 'Theo Ngày Ra Mắt', title: 'Mới nhất' },
  { id: 6, by: 'createdAt', sort: 'desc', byTitle: 'Theo Ngày Ra Mắt', title: 'Cũ nhất' }
]

const checkSizeExist = (arr, id) => {
  let result = false;
  if (arr && arr.length > 0) {
    let index = arr.findIndex(item => item === id);
    if (index !== -1) {
      result = true;
    }
  }
  return result;
}

const WebProductList = (props) => {

  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [showProducts, setShowProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currPage, setCurrPage] = useState(1)
  const [categories, setCategories] = useState([])
  const [sizes, setSizes] = useState([])
  const [filterSize, setFilterSize] = useState(undefined)
  const [payloadOption, setPayloadOption] = useState({
    categoryId: 0,
    page: 1,
    sortId: 1,
    sizeId: [],
    name: ''
  })
  const { searchText } = useParams()

  const onChangeSizesOption = (e, item) => {
    console.log(e.target.checked, item)
    if (e.target.checked) {
      setPayloadOption((curr) => {
        return (
          {
            ...curr,
            sizeId: checkSizeExist(curr.sizeId, item.id) ? [...curr.sizeId] : [item.id, ...curr.sizeId],
            page: 1
          }
        )
      })
    } else {
      setPayloadOption((curr) => {
        if (checkSizeExist(curr.sizeId, item.id)) {
          let index = curr.sizeId.findIndex(i => i === item.id)
          let newSizes = curr.sizeId
          newSizes.splice(index, 1)
          return { ...curr, sizeId: [...newSizes], page: 1 }
        } else {
          return { ...curr, page: 1 }
        }
      })
    }
  }

  const onChangeCategoryOption = (value) => {
    setPayloadOption(
      {
        ...payloadOption,
        categoryId: value,
        page: 1
      }
    )
  }

  const onChangeSortOption = (value) => {
    setPayloadOption(
      {
        ...payloadOption,
        sortId: value,
        page: 1
      }
    )
  }

  const onChangePage = (value) => {
    setPayloadOption({
      ...payloadOption,
      page: value
    })
  }

  const onClickClearPayloadOption = () => {
    if (!searchText) {
      setPayloadOption({
        categoryId: 0,
        page: 1,
        sortId: 1,
        sizeId: [],
        name: ''
      })
    } else {
      setPayloadOption({
        categoryId: 0,
        page: 1,
        sortId: 1,
        sizeId: [],
        name: ''
      })
      navigate('/products')
    }
  }

  useEffect(() => {
    const payloadFilter = {
      categoryId: payloadOption.categoryId,
      sizes: payloadOption.sizeId,
      sortId: payloadOption.sortId,
      name: ''
    }
    if (searchText) {
      if (searchText.trim() !== '') {
        payloadFilter.name = searchText
      }
    }
    console.log(payloadFilter)
    setIsLoading(true)
    productAPI.testFilter(payloadFilter, payloadOption.page)
      .then(res => {
        if (!res.status) {
          console.log(res)
          setShowProducts(res.list)
          setFilterSize(res.totalItem)
          setIsLoading(false)
          document.documentElement.scrollTop = 0
        } else {
          console.log(res)
        }
      })
      .catch(err => console.log(err))
  }, [payloadOption, searchText])

  // useEffect(() => {
  //   if (searchText) {
  //     if (searchText.trim() !== '') {
  //       setPayloadOption({
  //         ...payloadOption,
  //         name: searchText
  //       })
  //     } else {
  //       setPayloadOption({
  //         ...payloadOption,
  //         name: ''
  //       })
  //     }
  //   } else {
  //     setPayloadOption({
  //       ...payloadOption,
  //       name: ''
  //     })
  //   }
  // }, [searchText])

  useEffect(() => {
    // productAPI.getAll()
    //   .then(res => {
    //     if (!res.status) {
    //       setFilterSize(res.length)
    //     } else {
    //       console.log(res)
    //     }
    //   })
    //   .catch(err => console.log(err))
    productAPI.getFilterInfo()
      .then(res => {
        if (!res.status) {
          console.log(res)
          setCategories(res.categories)
          setSizes([...res.sizes])
        } else {
          console.log(res);
        }
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <Helmet
      title="Sản Phẩm"
    >
      <Container>
        <Wrapper>
          <FiltersContainer>
            <FilterItem>
              {
                searchText &&
                <>
                  <Typography.Title level={5}>Tìm Kiếm: </Typography.Title>
                  <Typography.Text>{searchText}</Typography.Text>
                </>
              }
            </FilterItem>

            <FilterItem>
              <FilterItemTitle>
                <Typography.Title level={3}>Thể loại</Typography.Title>
              </FilterItemTitle>
              <Select style={{ width: '100%' }} defaultValue={0} value={payloadOption.categoryId} onChange={onChangeCategoryOption}>
                <Select.Option value={0}>
                  Tất Cả
                </Select.Option>
                {
                  categories.map(item => (
                    <Select.Option value={item.id} key={item.id}>
                      {item.title}
                    </Select.Option>
                  ))
                }
              </Select>
            </FilterItem>
            <FilterItem>
              <FilterItemTitle>
                <Typography.Title level={3}>Sắp xếp theo</Typography.Title>
              </FilterItemTitle>
              <Select style={{ width: '100%' }} defaultValue={1} value={payloadOption.sortId} onChange={onChangeSortOption}>
                {
                  sortOption.map(item => (
                    <Select.Option value={item.id} key={item.id}>
                      {item.title}
                    </Select.Option>
                  ))
                }
              </Select>
            </FilterItem>
            <FilterItem>
              <FilterItemTitle>
                <Typography.Title level={3}>Size</Typography.Title>
                <SizesWrapper>
                  {
                    sizes.map((item, index) => {
                      return (
                        <SizeItem key={item.id}>
                          <Checkbox onChange={(e) => onChangeSizesOption(e, item)} checked={checkSizeExist(payloadOption?.sizeId, item.id)}>
                            {item.title}
                          </Checkbox>
                        </SizeItem>
                      )
                    })
                  }
                </SizesWrapper>
              </FilterItemTitle>
            </FilterItem>
            <FilterItem>
              <Button
                onClick={onClickClearPayloadOption}
              >
                Xóa Bộ Lọc
              </Button>
            </FilterItem>
          </FiltersContainer>
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
                  <ProductListWrrapper>
                    {/* <ProductFilterContainer>
                      <ProductFilerItem>
                        <Select style={{ width: 120 }} defaultValue={0} value={payloadOption.categoryId} onChange={onChangeCategoryOption}>
                          <Select.Option value={0}>
                            Tất Cả
                          </Select.Option>
                          {
                            categories.map(item => (
                              <Select.Option value={item.id} key={item.id}>
                                {item.title}
                              </Select.Option>
                            ))
                          }
                        </Select>
                      </ProductFilerItem>
                      <ProductFilerItem>
                        <Select style={{ width: 120 }} defaultValue={1} value={payloadOption.sortId} onChange={onChangeSortOption}>
                          {
                            sortOption.map(item => (
                              <Select.Option value={item.id} key={item.id}>
                                {item.title}
                              </Select.Option>
                            ))
                          }
                        </Select>
                      </ProductFilerItem>
                      <ProductFilerItem>
                        <Button
                          onClick={onClickClearPayloadOption}
                        >
                          Xóa Bộ Lọc
                        </Button>
                      </ProductFilerItem>
                    </ProductFilterContainer> */}
                    {
                      showProducts.length > 0 ?
                        (
                          <>
                            <Products items={showProducts} />
                            <Pagination current={payloadOption.page} total={filterSize} showSizeChanger={false} onChange={onChangePage} pageSize={15} />
                          </>
                        )
                        :
                        (
                          <Empty description="Không có sản phẩm" />
                        )
                    }
                  </ProductListWrrapper>
                )
            }
          </ProductListContainer>
        </Wrapper>
      </Container>
    </Helmet>
  )
};

export default WebProductList;
