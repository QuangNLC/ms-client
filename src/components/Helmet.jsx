import React, { useEffect } from 'react'



const Helmet = ({children, title}) => {

    if(title){
        document.title = "ManShop - " + title
    }

    useEffect(()=> {
        document.documentElement.scrollTop = 0
    },[])

    return (
        <>
            {children}
        </>
    )
}

export default Helmet