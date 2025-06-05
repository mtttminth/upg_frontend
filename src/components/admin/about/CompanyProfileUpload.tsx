import React, { useEffect, useRef } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import tokenService from '@/services/tokenService';
import { ADMIN } from '@/consts/common';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { resetCompanyProfileFile, updateCompanyProfileFile } from '@/store/slices/admin/mediaSlice';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CompanyProfileUpload = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {companyProfileFile} = useSelector((state: RootState) => state.media);
  const pond = useRef<FilePond | null>(null);
  const accessToken = tokenService.getAccessToken(ADMIN);

  const handleUpdateFiles = (fileItems: any[]) => {
    dispatch(updateCompanyProfileFile(fileItems));
  };

  useEffect(() => {
    return () => {
      dispatch(resetCompanyProfileFile())
    };
  }, []);

  return (
    <div>
      <FilePond
        ref={pond}
        files={companyProfileFile}
        server={{
          process: {
            url: `${process.env.API_BASE_URL}/admin/tmp-file-store`,
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + accessToken,
            },
            onload: (response: any) => {
              return response;
            }
          },
          revert: {
            url: `${process.env.API_BASE_URL}/admin/tmp-delete`,
            method: 'DELETE',
            headers: {
              'Authorization': 'Bearer ' + accessToken,
            },
          },
          load: (src, load) => {
            fetch(src).then(res => res.blob()).then(load);
          }
        }}
        allowRevert
        forceRevert
        name="file"
        onupdatefiles={handleUpdateFiles}
      />
    </div>
  );
};

export default CompanyProfileUpload;
