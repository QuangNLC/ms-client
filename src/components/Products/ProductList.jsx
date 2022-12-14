import React from "react";
import CardItem from "./CardItem";
import Grid from "@mui/material/Grid";

const ProductList = (data) => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {data.data.map((item, index) => {
          return (
            <div key={index}>
              <CardItem item={item} />
            </div>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default ProductList;
