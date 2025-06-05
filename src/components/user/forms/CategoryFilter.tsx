import { Box, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchFormTypes } from "@/store/thunks/user/formThunk";
import { updateParams } from "@/store/slices/user/formSlice";

const numbers = [1, 2, 3];

const FormCategoryFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {formParams, formTypeList} = useSelector((state: RootState) => state.userForm);
  const [form_type_id, setFormTypeId] = useState<number>(formParams.form_type_id);

  useEffect(() => {
    dispatch(fetchFormTypes());
  }, [])

  useEffect(() => {
    dispatch(updateParams({form_type_id}));
  }, [form_type_id])

  return (
    <Box sx={{ p: 3, maxHeight: 500, overflow: 'auto' }}>
      {formTypeList.map((type, index) => (
        <Box sx={{ mb: 1 }} key={index}>
          <ListItemButton className={form_type_id == type.id ? 'cat-filter-active' : ''} onClick={() => setFormTypeId(type.id)}>
            <CircleIcon sx={{fontSize: 10, mr: 1}}/>
            <Typography variant="body2">{type.name}</Typography>
          </ListItemButton>
        </Box>
        
      ))}
    </Box>
  )
}

export default FormCategoryFilter;