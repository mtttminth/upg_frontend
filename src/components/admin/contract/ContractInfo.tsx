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
    contract_type_id: string;
  }>;
};

const ContractInfo: React.FC<FormInfoProps> = ({formik}) => {
  const {allContractType, contractErrors} = useSelector((state: RootState) => state.contract);
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
            error={((contractErrors && contractErrors.errors && contractErrors.errors.name) && Boolean(contractErrors.errors.name[0])) || formik.touched.name && Boolean(formik.errors.name)}
            helperText={((contractErrors && contractErrors.errors && contractErrors.errors.name) && contractErrors.errors.name[0]) || (formik.touched.name && formik.errors.name)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl variant="standard" fullWidth>
          <p className="mb-1">Type <span className="text-red-600">*</span></p>
          <Select
            name="contract_type_id"
            size="small"
            variant="outlined"
            value={formik.values.contract_type_id}
            onChange={formik.handleChange}
            error={((contractErrors && contractErrors.errors && contractErrors.errors.contract_type_id) && Boolean(contractErrors.errors.contract_type_id[0])) || formik.touched.contract_type_id && Boolean(formik.errors.contract_type_id)}
          >
            {allContractType.length != 0 &&
              allContractType.map((contractType) => (
                <MenuItem value={contractType.id}>{contractType.name}</MenuItem>
              ))
            }
          </Select>
          <FormHelperText error> 
            {((contractErrors && contractErrors.errors && contractErrors.errors.contract_type_id) && Boolean(contractErrors.errors.contract_type_id[0])) || formik.touched.contract_type_id && Boolean(formik.errors.contract_type_id)}
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
export default ContractInfo;
