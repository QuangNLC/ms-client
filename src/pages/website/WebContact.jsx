import React from 'react'
import styled from 'styled-components'

const RowFlex = styled.div`
    display: flex;
    gap: 40px;
    flex-direction: row;
`

const ChildFlex = styled.div`
    width: 50%;
`

const Title = styled.h3`
    padding: 20px 0;
`

const Content = styled.p`
    padding-bottom: 10px;
`

const WebContact = () => {
    return (
        <div style={{ paddingLeft: "100px", paddingRight: "100px", paddingTop: "50px" }}>
            <div className="main-content">
                <div className="page-title">
                    <h1>Liên hệ</h1>
                </div>
                <Title>Hỗ trợ Khách hàng mua online</Title>
                <RowFlex>
                    <ChildFlex>
                        <Content>Tổng đài: 1800 8888</Content>
                        <Content>9-17h thứ 2 - 6</Content>
                    </ChildFlex>
                    <ChildFlex>
                        <Content>Email: s21manshop@gmail.com</Content>
                        <Content>Địa chỉ: Tòa nhà FPT Polytechnic, P.Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội</Content>
                    </ChildFlex>
                </RowFlex>
                <hr />
                <RowFlex>
                    <ChildFlex>
                        <Title>Chăm sóc khách hàng:</Title>
                        <Content>Điện thoại: 1800.6061</Content>
                        <Content>Email: chamsockhachhang@gmail.com</Content>
                    </ChildFlex>
                    <ChildFlex>
                        <Title>Đặt số lượng lớn</Title>
                        <Content>Mss. Cúc</Content>
                        <Content>Điện thoại: 0949.604.941</Content>
                        <Content>Email: cucmanshop@gmail.com</Content>
                    </ChildFlex>
                </RowFlex>
                <RowFlex>
                    <ChildFlex>
                        <Title>Văn phòng miền Bắc</Title>
                        <Content>Tòa nhà FPT Polytechnic, P.Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội</Content>
                        <Content>Điện thoại: +8424-7303.8888</Content>
                        <Content>Fax: +8424 - 6277.9999 </Content>
                        <Content>Email: s21manshop@gmail.com</Content>
                        <Content>Website: www.manshop.com</Content>
                    </ChildFlex>
                    <ChildFlex>
                        <Title>Văn phòng miền Nam</Title>
                        <Content>Địa chỉ:  Tòa nhà FPT Polytechnic, P.Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội</Content>
                        <Content>Điện thoại: +8424-7303.8888</Content>
                        <Content>Email: s21manshop@gmail.com</Content>
                    </ChildFlex>
                </RowFlex>
                <hr />
                {/* <RowFlex>
                    <ChildFlex>
                        <Title>Liên hệ làm đại lý <br /><small>(KV miền Bắc)</small><br /></Title>
                        <Content>Điện thoại: +8424-7303.0222 (Ext:629)</Content>
                        <Content>Mr. Nguyễn Đức Bằng</Content>
                        <Content>Điện thoại: 0904.530.833</Content>
                        <Content>Email: bangnd@canifa.com</Content>
                    </ChildFlex>
                    <ChildFlex>
                        <Title>Liên hệ làm đại lý <br /><small>(KV miền Nam)</small><br /></Title>
                        <Content>Điện thoại: +8428-3824.7141</Content>
                        <Content>Mr. Nguyễn Đức Bằng</Content>
                        <Content>Điện thoại: 0904.530.833</Content>
                        <Content>Email: bangnd@canifa.com</Content>
                    </ChildFlex>
                </RowFlex> */}
                {/* <RowFlex>
                    <div>
                        <Title>Nhà máy</Title>
                        <Content>Đường Nguyễn Văn Linh, Phường Bần Yên Nhân, T.X Mỹ Hào, Hưng Yên</Content>
                        <Content>Điện thoại: +84-221- 394 2234</Content>
                        <Content>Fax: +84 - 221-394 2235</Content>
                    </div>
                </RowFlex> */}
            </div>
        </div>

    )
}

export default WebContact