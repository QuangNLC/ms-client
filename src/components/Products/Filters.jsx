import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

const Filters = (props) => {
  const [value, setValue] = React.useState(2);
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <br />

      <Typography mt={2} textAlign="center" marginBottom={3}>
        LỌC SẢN PHẨM
      </Typography>

      <div>
        <Divider textAlign="left">Size</Divider>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel value="S" control={<Radio />} label="S" />
            <FormControlLabel value="M" control={<Radio />} label="M" />
            <FormControlLabel value="L" control={<Radio />} label="L" />
            <FormControlLabel value="XL" control={<Radio />} label="XL" />
            <FormControlLabel value="XXL" control={<Radio />} label="XXL" />
          </RadioGroup>
        </FormControl>
      </div>
      <Divider textAlign="left">Sắp xếp</Divider>
      <div>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Gần nhất"
          />
          <FormControlLabel control={<Checkbox />} label="Yêu thích" />
        </FormGroup>
      </div>
      <div>
        <Divider textAlign="left">Đánh giá</Divider>

        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </div>
    </Box>
  );
};
export default Filters;
