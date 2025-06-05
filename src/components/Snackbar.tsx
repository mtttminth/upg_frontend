import { Alert, Snackbar } from "@mui/material";

type CommonSnackbarParams = {
  success: boolean;
  message: string;
  snackbarOpen: boolean;
  handleSnackBarClose: () => void;
}

const CommonSnackbar: React.FC<CommonSnackbarParams> = ({success, message, snackbarOpen, handleSnackBarClose}) => {
  return (
    <>
    {
      message != '' ? (
        <Snackbar 
          open={snackbarOpen} 
          autoHideDuration={3000} 
          onClose={handleSnackBarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleSnackBarClose}
            severity={success ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )
    }
    </>
  )
}

export default CommonSnackbar;