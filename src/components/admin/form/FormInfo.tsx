import { FormControl, FormHelperText, Grid, MenuItem, Select, TextField } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import PageFileUploader from "../resources/ResourceFileUpload";

type FormInfoProps = {
  formik: FormikProps<{
    name: string;
    form_type_id: string;
  }>;
};

const FormInfo: React.FC<FormInfoProps> = ({formik}) => {
  const {allFormType, formErrors} = useSelector((state: RootState) => state.form);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FormControl variant="standard" fullWidth>
          <p className="mb-1">
            {" "}
            Name <span className="text-red-600">*</span>
          </p>
          <TextField
            name="name"
            size="small"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={((formErrors && formErrors.errors && formErrors.errors.name) && Boolean(formErrors.errors.name[0])) || formik.touched.name && Boolean(formik.errors.name)}
            helperText={((formErrors && formErrors.errors && formErrors.errors.name) && formErrors.errors.name[0]) || (formik.touched.name && formik.errors.name)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl variant="standard" fullWidth>
          <p className="mb-1">Type <span className="text-red-600">*</span></p>
          <Select
            name="form_type_id"
            size="small"
            variant="outlined"
            value={formik.values.form_type_id}
            onChange={formik.handleChange}
            error={((formErrors && formErrors.errors && formErrors.errors.form_type_id) && Boolean(formErrors.errors.form_type_id[0])) || formik.touched.form_type_id && Boolean(formik.errors.form_type_id)}
          >
            {allFormType.length != 0 &&
              allFormType.map((formType) => (
                <MenuItem value={formType.id}>{formType.name}</MenuItem>
              ))
            }
          </Select>
          <FormHelperText error> 
            {((formErrors && formErrors.errors && formErrors.errors.form_type_id) && Boolean(formErrors.errors.form_type_id[0])) || formik.touched.form_type_id && Boolean(formik.errors.form_type_id)}
          </FormHelperText>
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
export default FormInfo;
