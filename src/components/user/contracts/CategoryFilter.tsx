import { Box, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchContractTypes } from "@/store/thunks/user/contractThunk";
import { updateParams } from "@/store/slices/user/contractSlice";

const ContractCategoryFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {contractParams, contractTypeList} = useSelector((state: RootState) => state.userContract);
  const [contract_type_id, setContractTypeId] = useState<number>(contractParams.contract_type_id);

  useEffect(() => {
    dispatch(fetchContractTypes());
  }, [])

  useEffect(() => {
    dispatch(updateParams({contract_type_id}));
  }, [contract_type_id])

  return (
    <Box sx={{ p: 3, maxHeight: 500, overflow: 'auto' }}>
      {contractTypeList.map((type, index) => (
        <Box sx={{ mb: 1 }} key={index}>
          <ListItemButton className={contract_type_id == type.id ? 'cat-filter-active' : ''} onClick={() => setContractTypeId(type.id)}>
            <CircleIcon sx={{fontSize: 10, mr: 1}}/>
            <Typography variant="body2">{type.name}</Typography>
          </ListItemButton>
        </Box>
        
      ))}
    </Box>
  )
}

export default ContractCategoryFilter;