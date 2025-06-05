import { USER_OPTION_ID } from "@/consts/common";
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import React, { useState } from "react";

type MemberRadioProps = {
  setUserOptionId: Function;
  selected: string;
};

const MemberRadio: React.FC<MemberRadioProps> = ({ setUserOptionId, selected }) => {

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserOptionId(value);
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selected}
        onChange={handleRadioChange}
      >
        <FormControlLabel value={USER_OPTION_ID.ALL_USER} control={<Radio />} label="All User" />
        <FormControlLabel value={USER_OPTION_ID.SELECTED_USER} control={<Radio />} label="Selected User" />
        <FormControlLabel value={USER_OPTION_ID.GROUP} control={<Radio />} label="Group" />
      </RadioGroup>
    </FormControl>
  );
};

export default MemberRadio;
