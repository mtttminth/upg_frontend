import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import React from "react";

type DateRangePickerParams = {
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  setFromDate: Function;
  setToDate: Function;
}

const DateRangePicker: React.FC<DateRangePickerParams> = ({fromDate, toDate, setFromDate, setToDate}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <DatePicker 
        value={fromDate} 
        onChange={(newValue) => setFromDate(newValue)} 
        slotProps={{
          textField: { size: 'small' }, 
          actionBar: {
            actions: ['clear'],
          },
        }}
      />
      <p className='mx-2'>~</p>
      <DatePicker
        value={toDate}
        onChange={(newValue) => setToDate(newValue)}
        slotProps={{
          textField: { size: 'small' }, 
          actionBar: {
            actions: ['clear'],
          },
        }}
      />
    </Box>
  );
}

export default DateRangePicker;