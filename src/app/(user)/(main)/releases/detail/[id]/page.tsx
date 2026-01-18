"use client";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Modal,
  Skeleton,
} from "@mui/material";
import ReactImageGallery from "react-image-gallery";
const ImageGallery = ReactImageGallery as unknown as React.ComponentType<any>;
import "react-image-gallery/styles/css/image-gallery.css";
import { AppDispatch, RootState } from "@/store/store";
import { fetchReleaseDetail } from "@/store/thunks/user/releaseThunk";
import { useDispatch, useSelector } from "react-redux";
import YouTubeIcon from "@mui/icons-material/YouTube";
import React, { useEffect, useState } from "react";
import "@/styles/user/user.scss";
type PageParams = {
  id: string;
};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


const UserReleaseDetail = ({ params }: { params: PageParams }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { releaseDetail, loading } = useSelector(
    (state: RootState) => state.userRelease
  );
  const id = parseInt(params.id);
  useEffect(() => {
    dispatch(fetchReleaseDetail(id));
  }, []);
  const [checkedImage, setCheckedImage] = useState<any[]>([]);
  // For Image
  const myStructure: any[] | any = releaseDetail.images;
  useEffect(() => {
    if (myStructure !== undefined) {
      const images =
        myStructure &&
        myStructure.map((item: any) => ({
          original: item,
          thumbnail: item,
        }));
      setCheckedImage(images);
    }
  }, [releaseDetail]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div style={{ width: "100%" }}>
      <Box className="subtitle-container">
        <Typography variant="h6" sx={{ pt: 4, mx: { xs: 2, md: 10 }, mb: 6 }}>
          Internal Releases
        </Typography>
      </Box>
      {loading ? (
        <Box sx={{ px: 5, py: 2 }}>
          <Skeleton variant="text" sx={{ fontSize: "1rem", mb: 4 }} />
          <Skeleton variant="circular" width={40} height={40} sx={{ mb: 4 }} />
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="rounded" height={300} />
        </Box>
      ) : (
        <>
          <Box
            sx={{ mt: 6, mx: { xs: 2, md: 10 }, mb: 8, position: "relative" }}
          >
            <Typography variant="h1" sx={{ fontSize: 22, pb: 2 }}>
              {releaseDetail.name}
            </Typography>
            <Stack direction="row" sx={{ pt: 2, pb: 2 }}>
              <Typography variant="h4" sx={{ fontSize: 14 }}>
                Internal Release by
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontSize: 14, color: "#91A5FF", pl: 0.5 }}
              >
                {releaseDetail.created_by}
              </Typography>
            </Stack>
            {(() => {
              if (releaseDetail && releaseDetail.video_url !== null) {
                return (
                  <IconButton onClick={handleOpen}>
                    <YouTubeIcon style={{ fontSize: 40, color: "#ff0000" }} />
                  </IconButton>
                );
              } else {
                return <></>;
              }
            })()}
            <ImageGallery showPlayButton={false} items={checkedImage}/>
            <Typography
              variant="h4"
              sx={{ fontSize: 18, pt: 4 }}
              dangerouslySetInnerHTML={{ __html: releaseDetail.description }}
            ></Typography>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <iframe
                  width="100%"
                  height={600}
                  src={releaseDetail.video_url}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </Box>
            </Modal>
          </Box>
        </>
      )}
    </div>
  );
};

export default UserReleaseDetail;
