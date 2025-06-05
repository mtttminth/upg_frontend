import { updateParams } from "@/store/slices/user/formSlice";
import { AppDispatch, RootState } from "@/store/store";
import { fetchFormList } from "@/store/thunks/user/formThunk";
import {
  Box,
  Button,
  Grid,
  Pagination,
  Typography,
  Skeleton,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const UserFormList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, formParams, formList } = useSelector(
    (state: RootState) => state.userForm
  );
  const [page, setPage] = useState<number>(formParams.page);
  const [perPage, setPerPage] = useState<number>(formParams.perPage);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchFormList(formParams));
  }, [formParams]);

  useEffect(() => {
    search();
  }, [page, perPage]);

  const search = () => {
    dispatch(updateParams({ page, perPage }));
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const detailResource = (id: number) => {
    router.push(`/forms/${id}`);
  };

  return (
    <Box>
      {loading ? (
        <Box sx={{ px: 5, py: 2 }}>
          <Skeleton variant="rectangular" height={"100vh"} />
        </Box>
      ) : (
        <>
          <Grid container rowSpacing={3}>
            {formList.data.map((item, index) => (
              <Grid item xs={12} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: 3
                  }}
                  className="resource-container"
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Image
                      src="/images/form.png"
                      width="60"
                      height="0"
                      alt="Resource"
                      className="resource-icon"
                    />
                    <Typography variant="body2" sx={{ ml: 5 }}>
                      {item.name}
                    </Typography>
                  </Box>
                  <Button
                    onClick={() => detailResource(item.id)}
                    size="small"
                    color="secondary"
                    variant="contained"
                    disableRipple
                    className="resource-detail-button"
                  >
                    View Detail
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={formList.meta ? Math.ceil(formList.meta.total / perPage) : 0}
            page={page}
            onChange={handleChangePage}
            shape="rounded"
            color="primary"
            sx={{ mt: 5, display: "flex", justifyContent: "center" }}
          />
        </>
      )}
    </Box>
  );
};

export default UserFormList;
