"use client";
import { AppDispatch, RootState } from "@/store/store";
import { fetchResourceDetail } from "@/store/thunks/user/resourceThunk";
import { Box, IconButton, Modal, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
const ResourceDetail = ({ params }: { params: PageParams }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, resourceDetail } = useSelector(
    (state: RootState) => state.userResource
  );
  const [checkedFile, setCheckedFile] = useState<string>();
  // For File
  const file: any[] | any = resourceDetail;
  useEffect(() => {
    if (!file.length) {
      setCheckedFile(file.file);
    }
  }, [resourceDetail]);
  const id = parseInt(params.id);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1); // start on first page
  const [loadingPDF, setLoadingPDF] = useState(true);
  const [pageWidth, setPageWidth] = useState(0);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) {
    setNumPages(nextNumPages);
  }

  function onPageLoadSuccess() {
    setPageWidth(window.innerWidth);
    setLoadingPDF(false);
  }

  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
  };

  // Go to next page
  function goToNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }

  useEffect(() => {
    dispatch(fetchResourceDetail(id));
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Box className="subtitle-container">
        <Typography variant="h6" sx={{ pt: 4, mx: { xs: 2, md: 10 }, mb: 6 }}>
          Resource
        </Typography>
      </Box>
      {loading ? (
        <Box sx={{ px: 5, py: 2 }}>
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="rounded" height={300} />
        </Box>
      ) : (
        <>
          <iframe
            width="100%"
            height={1000}
            src={checkedFile}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            className="pdf-viewer"
          />
        </>
      )}
    </div>
  );
};
function Nav({
  pageNumber,
  numPages,
}: {
  pageNumber: number;
  numPages: number;
}) {
  return (
    <nav className="bg-blue-900">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <p className="text-2xl font-bold tracking-tighter text-white">
                Reader
              </p>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
              <span>{pageNumber}</span>
              <span className="text-gray-400"> / {numPages}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default ResourceDetail;
