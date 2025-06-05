import { FormControl, FormHelperText, Grid, MenuItem, Select, TextField } from "@mui/material";
import FileUploader from '@/components/admin/FileUpload';
import { FormikProps } from "formik";
import React from "react";
import { ANNOUNCEMENT_STATUS } from "@/consts/common";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

type ReleaseInfoProps = {
  formik: FormikProps<{
    name: string;
    release_status_id: string;
    video_url: string;
    description: string;
  }>;
};

const ReleaseInfo: React.FC<ReleaseInfoProps> = ({formik}) => {
  const {releaseErrors} = useSelector((state: RootState) => state.release);

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
            error={((releaseErrors && releaseErrors.errors && releaseErrors.errors.name) && Boolean(releaseErrors.errors.name[0])) || formik.touched.name && Boolean(formik.errors.name)}
            helperText={((releaseErrors && releaseErrors.errors && releaseErrors.errors.name) && releaseErrors.errors.name[0]) || (formik.touched.name && formik.errors.name)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl variant="standard" fullWidth>
          <p className="mb-1">Status <span className="text-red-600">*</span></p>
          <Select
            name="release_status_id"
            size="small"
            variant="outlined"
            value={formik.values.release_status_id}
            onChange={formik.handleChange}
            error={((releaseErrors && releaseErrors.errors && releaseErrors.errors.release_status_id) && Boolean(releaseErrors.errors.release_status_id[0])) || formik.touched.release_status_id && Boolean(formik.errors.release_status_id)}
          >
            <MenuItem value={ANNOUNCEMENT_STATUS.IMPORTANT}>Important</MenuItem>
            <MenuItem value={ANNOUNCEMENT_STATUS.WARNIND}>Warning</MenuItem>
            <MenuItem value={ANNOUNCEMENT_STATUS.NORMAL}>Normal</MenuItem>
          </Select>
          <FormHelperText error>
            {((releaseErrors && releaseErrors.errors && releaseErrors.errors.release_status_id) && Boolean(releaseErrors.errors.release_status_id[0])) || formik.touched.release_status_id && Boolean(formik.errors.release_status_id)}
          </FormHelperText>
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
            error={((releaseErrors && releaseErrors.errors && releaseErrors.errors.video_url) && Boolean(releaseErrors.errors.video_url[0])) || formik.touched.video_url && Boolean(formik.errors.video_url)}
            helperText={((releaseErrors && releaseErrors.errors && releaseErrors.errors.video_url) && releaseErrors.errors.video_url[0]) || (formik.touched.video_url && formik.errors.video_url)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={12}>
        <FormControl variant="standard" fullWidth>
          <p className="mb-1">Image</p>
          <FileUploader isMultiple={true} />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={12}>
        <FormControl variant="standard" fullWidth>
          <p className="mb-1">Description <span className="text-red-600">*</span></p>
            {/* <ReactQuill theme="snow" modules={MODULES} formats={FORMATS} value={formik.values.description} onChange={(value) => {formik.setFieldValue('description', value)}} /> */}
            <JoditEditor
              value={formik.values.description}
              onBlur={(value) => {formik.setFieldValue('description', value)}} 
            />
          <FormHelperText error> {formik.touched.description && formik.errors.description} </FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};
export default ReleaseInfo;
