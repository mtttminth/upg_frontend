'use client';

import { AppDispatch, RootState } from "@/store/store";
import { fetchOrganization } from "@/store/thunks/user/aboutThunk";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton, Box } from "@mui/material";

const UserOrganization = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading, company_organization_structure, success, aboutErrors, aboutMessage} = useSelector((state: RootState) => state.userAbout);

  useEffect(() => {
    dispatch(fetchOrganization());
  }, [])
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
  return (
    <div style={{ width: '100%'}}>
      {
        loading ?
        <Box sx={{ px: 5, py: 2 }}>
          <Skeleton variant="rectangular" height={"100vh"} />
        </Box> :
        <>
          <iframe
            width="100%"
            height={1000}
            src={company_organization_structure}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            className="pdf-viewer"
          />
        </>
      }
    </div>
  )
}
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
export default UserOrganization;