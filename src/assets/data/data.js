import sliderImg1 from '../imgs/slider-img-1.jpg'
import sliderImg2 from '../imgs/slider-img-2.jpg'
import sliderImg3 from '../imgs/slider-img-3.jpg'

import prImg1 from '../imgs/product-img-1.jpg'
import prImg2 from '../imgs/product-img-2.jpg'
import prImg3 from '../imgs/product-img-3.jpg'
import prImg4 from '../imgs/product-img-4.jpg'

export const sliderData = [
    {
        id: 1,
        img:sliderImg1,
        isDefault: true,
        navLink: '/products/1',
        desc: 'Lịch lãm'
    },
    {
        id: 2,
        img:sliderImg2,
        isDefault: false,
        navLink: '/products/2',
        desc: 'năng động'
    },
    {
        id: 3,
        img:sliderImg3,
        isDefault: false,
        navLink: '/products/3',
        desc: 'cá tính'
    }
]

export const productData = [
    {
        id: 1,
        img: prImg1,
        name: "T-SHIRT WHITE",
        import_price: 300000,
        productsizes: [
            {
                "id": 1,
                "quantity": 1,
                "size": {
                    "id": 4,
                    "title": "XXL"
                }
            },
            {
                "id": 2,
                "quantity": 2,
                "size": {
                    "id": 5,
                    "title": "40"
                }
            },
            {
                "id": 3,
                "quantity": 3,
                "size": {
                    "id": 6,
                    "title": "41"
                }
            }
        ]
    },
    {
        id: 2,
        img: prImg2,
        name: "T-SHIRT WHITE",
        import_price: 300000,
        productsizes: [
            {
                "id": 1,
                "quantity": 1,
                "size": {
                    "id": 4,
                    "title": "XXL"
                }
            },
            {
                "id": 2,
                "quantity": 2,
                "size": {
                    "id": 5,
                    "title": "40"
                }
            },
            {
                "id": 3,
                "quantity": 3,
                "size": {
                    "id": 6,
                    "title": "41"
                }
            }
        ]
    },
    {
        id: 3,
        img: prImg3,
        name: "T-SHIRT WHITE",
        import_price: 300000,
        productsizes: [
            {
                "id": 1,
                "quantity": 1,
                "size": {
                    "id": 4,
                    "title": "XXL"
                }
            },
            {
                "id": 2,
                "quantity": 2,
                "size": {
                    "id": 5,
                    "title": "40"
                }
            },
            {
                "id": 3,
                "quantity": 3,
                "size": {
                    "id": 6,
                    "title": "41"
                }
            }
        ]
    },
    {
        id: 4,
        img: prImg4,
        name: "T-SHIRT WHITE",
        import_price: 300000,
        productsizes: [
            {
                "id": 1,
                "quantity": 1,
                "size": {
                    "id": 4,
                    "title": "XXL"
                }
            },
            {
                "id": 2,
                "quantity": 2,
                "size": {
                    "id": 5,
                    "title": "40"
                }
            },
            {
                "id": 3,
                "quantity": 3,
                "size": {
                    "id": 6,
                    "title": "41"
                }
            }
        ]
    }
]


export const userStatsData = [

    {
      name: 'Tháng 1',
      activeUser: 2400,
    },
    {
      name: 'Tháng 2',
      activeUser: 1398,
    },
    {
      name: 'Tháng 3',
      activeUser: 2800,
    },
    {
      name: 'Tháng 4',
      activeUser: 3908,
    },
    {
      name: 'Tháng 5',
      activeUser: 4800,
    },
    {
      name: 'Tháng 6',
      activeUser: 3800,
    },
    {
      name: 'Tháng 7',
      activeUser: 4300,
    },
    {
      name: 'Tháng 8',
      activeUser: 5208,
    },
    {
      name: 'Tháng 9',
      activeUser: 5337,
    },
    {
      name: 'Tháng 10',
      activeUser: 5340,
    },
    {
      name: 'Tháng 11',
      activeUser: 5559,
    },
    {
      name: 'Tháng 12',
      activeUser: 6110,
    }
  ];

  export const userRows = [
    {
      id: 1,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      transaction: "$120.00",
    },
    {
      id: 2,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      transaction: "$120.00",
    },
    {
      id: 3,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      transaction: "$120.00",
    },
    {
      id: 4,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      transaction: "$120.00",
    },
    {
      id: 5,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      transaction: "$120.00",
    },
    {
      id: 6,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      transaction: "$120.00",
    },
    {
      id: 7,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      transaction: "$120.00",
    },
    {
      id: 8,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      transaction: "$120.00",
    },
    {
      id: 9,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      transaction: "$120.00",
    },
    {
      id: 10,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      transaction: "$120.00",
    },
  ];