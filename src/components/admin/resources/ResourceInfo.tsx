import { FormControl, FormHelperText, Grid, MenuItem, Select, TextField } from "@mui/material";
import { FormikProps } from "formik";
import React, { useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import { ANNOUNCEMENT_STATUS } from "@/consts/common";
import PageFileUploader from "./ResourceFileUpload";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchSubCategoryListByCategoryId } from "@/store/thunks/admin/resourcesThunk";

type ReleaseInfoProps = {
  formik: FormikProps<{
    name: string;
    category_id: string;
    subcategory_id: string;
    video_url: string;
  }>;
};

const ResourceInfo: React.FC<ReleaseInfoProps> = ({formik}) => {
  const {allSubCategoryList, allCategoryList, pageErrors, pageDetail} = useSelector((state: RootState) => state.page);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const category_id = parseInt(formik.values.category_id)
    if(pageDetail.category) {
      pageDetail.category.id == category_id ? formik.setFieldValue('subcategory_id', pageDetail.subcategory.id) : formik.setFieldValue('subcategory_id', '')
    }
    // formik.setFieldValue('subcategory_id', '')
    dispatch(fetchSubCategoryListByCategoryId(category_id));
  }, [formik.values.category_id])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FormControl variant="standard" fullWidth>
          <p className="mb-1">
            Name <span className="text-red-600">*</span>
          </p>
          <TextField
            name="name"
            size="small"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={((pageErrors && pageErrors.errors && pageErrors.errors.name) && Boolean(pageErrors.errors.name[0])) || formik.touched.name && Boolean(formik.errors.name)}
            helperText={((pageErrors && pageErrors.errors && pageErrors.errors.name) && pageErrors.errors.name[0]) || (formik.touched.name && formik.errors.name)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl variant="standard" fullWidth>
          <p className="mb-1">Main Category <span className="text-red-600">*</span></p>
          <Select
            name="category_id"
            size="small"
            variant="outlined"
            value={formik.values.category_id}
            onChange={formik.handleChange}
            error={((pageErrors && pageErrors.errors && pageErrors.errors.category_id) && Boolean(pageErrors.errors.category_id[0])) || formik.touched.category_id && Boolean(formik.errors.category_id)}
          >
            {allCategoryList.length != 0 &&
              allCategoryList.map((cat) => (
                <MenuItem value={cat.id}>{cat.name}</MenuItem>
              ))
            }
          </Select>
          <FormHelperText error> {((pageErrors && pageErrors.errors && pageErrors.errors.category_id) && pageErrors.errors.category_id[0]) || (formik.touched.category_id && formik.errors.category_id)} </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl variant="standard" fullWidth>
          <p className="mb-1">SubCategory <span className="text-red-600">*</span></p>
          <Select
            name="subcategory_id"
            size="small"
            variant="outlined"
            value={formik.values.subcategory_id}
            onChange={formik.handleChange}
            error={((pageErrors && pageErrors.errors && pageErrors.errors.subcategory_id) && Boolean(pageErrors.errors.subcategory_id[0])) || formik.touched.subcategory_id && Boolean(formik.errors.subcategory_id)}
          >
            {allSubCategoryList.length != 0 &&
              allSubCategoryList.map((subCat) => (
                <MenuItem value={subCat.id}>{subCat.name}</MenuItem>
              ))
            }
          </Select>
          <FormHelperText error> {((pageErrors && pageErrors.errors && pageErrors.errors.subcategory_id) && pageErrors.errors.subcategory_id[0]) || (formik.touched.subcategory_id && formik.errors.subcategory_id)} </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={12}>
        <FormControl variant="standard" fullWidth>
          <p className="mb-1">Video URL</p>
          <TextField
            name="video_url"
            size="small"
            value={formik.values.video_url}
            onChange={formik.handleChange}
            error={((pageErrors && pageErrors.errors && pageErrors.errors.video_url) && Boolean(pageErrors.errors.video_url[0])) || formik.touched.video_url && Boolean(formik.errors.video_url)}
            helperText={((pageErrors && pageErrors.errors && pageErrors.errors.video_url) && pageErrors.errors.video_url[0]) || (formik.touched.video_url && formik.errors.video_url)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={12}>
        <FormControl variant="standard" fullWidth>
          <p className="mb-1">File Upload</p>
          <PageFileUploader />
        </FormControl>
      </Grid>
    </Grid>
  );
};
export default ResourceInfo;
