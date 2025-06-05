import { updateParams } from "@/store/slices/user/contractSlice";
import { AppDispatch, RootState } from "@/store/store";
import { fetchContractList } from "@/store/thunks/user/contractThunk";
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

const UserContractList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, contractParams, contractList } = useSelector(
    (state: RootState) => state.userContract
  );
  const [page, setPage] = useState<number>(contractParams.page);
  const [perPage, setPerPage] = useState<number>(contractParams.perPage);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchContractList(contractParams));
  }, [contractParams]);

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
    router.push(`/contracts/${id}`);
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
            {contractList.data.map((item, index) => (
              <Grid item xs={12} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: 4
                  }}
                  className="resource-container"
                >
                  <Box sx={{ display: "flex", alignItems: "center"}}>
                    <Image
                      src="/images/contract.png"
                      width="60"
                      height="0"
                      alt="Resource"
                      className="resource-icon"
                    />
                    <Typography variant="body2" sx={{ ml: 6 }}>
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
            count={
              contractList.meta
                ? Math.ceil(contractList.meta.total / perPage)
                : 0
            }
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

export default UserContractList;
