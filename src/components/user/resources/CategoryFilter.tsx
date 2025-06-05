import {
  Box,
  ListItemButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchResourceCategories } from "@/store/thunks/user/resourceThunk";
import { updateParams } from "@/store/slices/user/resourceSlice";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const UserCategoryFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { resourceParams, categoryList } = useSelector(
    (state: RootState) => state.userResource
  );
  const [subcategory_id, setSubCategoryId] = useState<number>(
    resourceParams.subcategory_id
  );

  useEffect(() => {
    dispatch(fetchResourceCategories());
  }, []);

  useEffect(() => {
    dispatch(updateParams({ subcategory_id }));
  }, [subcategory_id]);

  return (
    <>
      {categoryList.map((item, index) => (
        <Box sx={{ mb: 2 }} key={index}>
          {item.subcategories.length != 0 && (
            <Accordion sx={{ backgroundColor: '#EFEFEF', }}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>{item.name}</Typography>
              </AccordionSummary>
              {item.subcategories.map((sub, index) => (
                <AccordionDetails>
                  <ListItemButton
                    key={index}
                    className={
                      subcategory_id == sub.id ? "cat-filter-active" : ""
                    }
                    onClick={() => setSubCategoryId(sub.id)}
                  >
                    <CircleIcon sx={{ fontSize: 10, mr: 1 }} />
                    <Typography variant="body2">{sub.name}</Typography>
                  </ListItemButton>
                </AccordionDetails>
              ))}
            </Accordion>
          )}
        </Box>
      ))}
    </>
  );
};

export default UserCategoryFilter;
