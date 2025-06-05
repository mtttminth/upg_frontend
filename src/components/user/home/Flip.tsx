import { Box, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";

const UserFlipComponent = () => {
  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ mt: 6, mx: {xs: 2, md: 10}, mb: 10}}>
        <Grid container rowSpacing={3} columnSpacing={4}>
          <Grid item xs={12} md={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Box className="flip-card quality">
              <Box className="flip-card-inner">
                <Box className="flip-card-front">
                  <Typography variant="h6" sx={{color:"#000000"}}>Quality</Typography>
                </Box>
                <Box className="flip-card-back">
                  <Typography variant="body2">Quality is Everyting</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Box className="flip-card environment">
              <Box className="flip-card-inner">
                <Box className="flip-card-front">
                  <Typography variant="h6" sx={{color:"#000000"}}>Environment</Typography>
                </Box>
                <Box className="flip-card-back">
                  <Typography variant="body2">Protecting nature, ensuring future!</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Box className="flip-card sustainability">
              <Box className="flip-card-inner">
                <Box className="flip-card-front">
                  <Typography variant="h6" sx={{color:"#000000"}}>Sustainability</Typography>
                </Box>
                <Box className="flip-card-back">
                  <Typography variant="body2">Paint a sustainable future together!</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Box className="flip-card occupation">
              <Box className="flip-card-inner">
                <Box className="flip-card-front">
                  <Typography variant="h6" sx={{color:"#000000"}}>Occupational Health & Safety</Typography>
                </Box>
                <Box className="flip-card-back">
                  <Typography variant="body2">Your safety comes first</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default UserFlipComponent;