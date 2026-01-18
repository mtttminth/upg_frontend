import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { FormikProps } from "formik";
import React, { useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import PageFileUploader from "./ResourceFileUpload";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchSubCategoryListByCategoryId } from "@/store/thunks/admin/resourcesThunk";
import { resource } from "@/consts/common";

type ReleaseInfoProps = {
  formik: FormikProps<{
    name: string;
    category_id: string;
    subcategory_id: string;
    video_url: string;
    file: string;
  }>;
  selection: string;
  setSelection: React.Dispatch<React.SetStateAction<string>>;
};

const ResourceInfo: React.FC<ReleaseInfoProps> = ({
  formik,
  selection,
  setSelection,
}) => {
  const { allSubCategoryList, allCategoryList, pageErrors, pageDetail } =
    useSelector((state: RootState) => state.page);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const category_id = parseInt(formik.values.category_id);
    if (pageDetail.category) {
      pageDetail.category.id == category_id
        ? formik.setFieldValue("subcategory_id", pageDetail.subcategory.id)
        : formik.setFieldValue("subcategory_id", "");
    }
    dispatch(fetchSubCategoryListByCategoryId(category_id));
  }, [formik.values.category_id]);

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
            error={
              (pageErrors &&
                pageErrors.errors &&
                pageErrors.errors.name &&
                Boolean(pageErrors.errors.name[0])) ||
              (formik.touched.name && Boolean(formik.errors.name))
            }
            helperText={
              (pageErrors &&
                pageErrors.errors &&
                pageErrors.errors.name &&
                pageErrors.errors.name[0]) ||
              (formik.touched.name && formik.errors.name)
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl variant="standard" fullWidth>
          <p className="mb-1">
            Main Category <span className="text-red-600">*</span>
          </p>
          <Select
            name="category_id"
            size="small"
            variant="outlined"
            value={formik.values.category_id}
            onChange={formik.handleChange}
            error={
              (pageErrors &&
                pageErrors.errors &&
                pageErrors.errors.category_id &&
                Boolean(pageErrors.errors.category_id[0])) ||
              (formik.touched.category_id && Boolean(formik.errors.category_id))
            }
          >
            {allCategoryList.length != 0 &&
              allCategoryList.map((cat) => (
                <MenuItem value={cat.id}>{cat.name}</MenuItem>
              ))}
          </Select>
          <FormHelperText error>
            {(pageErrors &&
              pageErrors.errors &&
              pageErrors.errors.category_id &&
              pageErrors.errors.category_id[0]) ||
              (formik.touched.category_id && formik.errors.category_id)}{" "}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl variant="standard" fullWidth>
          <p className="mb-1">
            SubCategory <span className="text-red-600">*</span>
          </p>
          <Select
            name="subcategory_id"
            size="small"
            variant="outlined"
            value={formik.values.subcategory_id}
            onChange={formik.handleChange}
            error={
              (pageErrors &&
                pageErrors.errors &&
                pageErrors.errors.subcategory_id &&
                Boolean(pageErrors.errors.subcategory_id[0])) ||
              (formik.touched.subcategory_id &&
                Boolean(formik.errors.subcategory_id))
            }
          >
            {allSubCategoryList.length != 0 &&
              allSubCategoryList.map((subCat) => (
                <MenuItem value={subCat.id}>{subCat.name}</MenuItem>
              ))}
          </Select>
          <FormHelperText error>
            {(pageErrors &&
              pageErrors.errors &&
              pageErrors.errors.subcategory_id &&
              pageErrors.errors.subcategory_id[0]) ||
              (formik.touched.subcategory_id &&
                formik.errors.subcategory_id)}{" "}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="file-type"
            name="file-type"
            value={selection}
            onChange={(e) => {
              const value = e.target.value;
              setSelection(value);
              if (value === "video_url") {
                formik.setFieldValue("file", "");
              } else {
                formik.setFieldValue("video_url", "");
              }
            }}
          >
            <FormControlLabel
              value="video_url"
              control={<Radio />}
              label="Video URL"
            />
            <FormControlLabel
              value="file"
              control={<Radio />}
              label="File Upload"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      {selection === "video_url" ? (
        <Grid item xs={12}>
          <FormControl variant="standard" fullWidth>
            <p className="mb-1">Video URL</p>
            <TextField
              name="video_url"
              size="small"
              value={formik.values.video_url}
              onChange={formik.handleChange}
              error={
                (pageErrors &&
                  pageErrors.errors &&
                  pageErrors.errors.video_url &&
                  Boolean(pageErrors.errors.video_url[0])) ||
                (formik.touched.video_url && Boolean(formik.errors.video_url))
              }
              helperText={
                (pageErrors &&
                  pageErrors.errors &&
                  pageErrors.errors.video_url &&
                  pageErrors.errors.video_url[0]) ||
                (formik.touched.video_url && formik.errors.video_url)
              }
            />
          </FormControl>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <FormControl variant="standard" fullWidth>
            <p className="mb-1">File Upload</p>
            <PageFileUploader />
            <FormHelperText error>
              {(pageErrors &&
                pageErrors.errors &&
                pageErrors.errors.file &&
                pageErrors.errors.file[0]) ||
                (formik.touched.file && formik.errors.file)}
            </FormHelperText>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
};
export default ResourceInfo;
