import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";
import PublicIcon from "@mui/icons-material/Public";

const UserFooter = () => {
  return (
    <Grid container className="footer-container" sx={{ px: 2, pt: 3 }}>
      <Grid item xs={12} md={4} mb={5}>
        <Grid item mx={3}>
          <Box>
            <Image
              src="/images/logo.png"
              width={250}
              height={250}
              priority
              alt="Logo"
              className="logo"
            />
          </Box>
          <Box mt={3} sx={{ fontSize: 16 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PlaceIcon style={{ fontSize: 20 }} />
              <p>
                456 Imaginary Lane, Fictional Town, Makebelieve State, Dreamland
              </p>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
              <PhoneIcon style={{ fontSize: 20 }} />
              <p>555-123-4567, 555-987-6543</p>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
              <MailIcon style={{ fontSize: 20 }} />
              <p>fake.email@example.com</p>
            </Box>
            <Box mt={5}>
              <p>Connect with Us</p>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Link href={`#`} className="social-icon facebook">
                  <FacebookIcon style={{ fontSize: 20 }} />
                </Link>
                <Link href={`#`} className="social-icon youtube">
                  <YouTubeIcon style={{ fontSize: 20 }} />
                </Link>
                <Link
                  href={`mailto:fake.email@example.com`}
                  className="social-icon mail"
                >
                  <EmailIcon style={{ fontSize: 20 }} />
                </Link>
                <Link href={`#`} className="social-icon web">
                  <PublicIcon style={{ fontSize: 20 }} />
                </Link>
                <Link href={`#`} className="social-icon viber">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#ffffff"
                      d="M11.4 0C9.473.028 5.333.344 3.02 2.467C1.302 4.187.696 6.7.633 9.817S.488 18.776 6.12 20.36h.003l-.004 2.416s-.037.977.61 1.177c.777.242 1.234-.5 1.98-1.302c.407-.44.972-1.084 1.397-1.58c3.85.326 6.812-.416 7.15-.525c.776-.252 5.176-.816 5.892-6.657c.74-6.02-.36-9.83-2.34-11.546c-.596-.55-3.006-2.3-8.375-2.323c0 0-.395-.025-1.037-.017zm.058 1.693c.545-.004.88.017.88.017c4.542.02 6.717 1.388 7.222 1.846c1.675 1.435 2.53 4.868 1.906 9.897v.002c-.604 4.878-4.174 5.184-4.832 5.395c-.28.09-2.882.737-6.153.524c0 0-2.436 2.94-3.197 3.704c-.12.12-.26.167-.352.144c-.13-.033-.166-.188-.165-.414l.02-4.018c-4.762-1.32-4.485-6.292-4.43-8.895c.054-2.604.543-4.738 1.996-6.173c1.96-1.773 5.474-2.018 7.11-2.03zm.38 2.602a.304.304 0 0 0-.004.607c1.624.01 2.946.537 4.028 1.592c1.073 1.046 1.62 2.468 1.633 4.334c.002.167.14.3.307.3a.304.304 0 0 0 .3-.304c-.014-1.984-.618-3.596-1.816-4.764c-1.19-1.16-2.692-1.753-4.447-1.765zm-3.96.695a.98.98 0 0 0-.616.117l-.01.002c-.43.247-.816.562-1.146.932l-.008.008q-.4.484-.46.948a.6.6 0 0 0-.007.14q0 .205.065.4l.013.01c.135.48.473 1.276 1.205 2.604c.42.768.903 1.5 1.446 2.186q.405.517.87.984l.132.132q.466.463.984.87a15.5 15.5 0 0 0 2.186 1.447c1.328.733 2.126 1.07 2.604 1.206l.01.014a1.3 1.3 0 0 0 .54.055q.466-.055.948-.46c.004 0 .003-.002.008-.005c.37-.33.683-.72.93-1.148l.003-.01c.225-.432.15-.842-.18-1.12c-.004 0-.698-.58-1.037-.83q-.54-.383-1.113-.71c-.51-.285-1.032-.106-1.248.174l-.447.564c-.23.283-.657.246-.657.246c-3.12-.796-3.955-3.955-3.955-3.955s-.037-.426.248-.656l.563-.448c.277-.215.456-.737.17-1.248a13 13 0 0 0-.71-1.115a28 28 0 0 0-.83-1.035a.82.82 0 0 0-.502-.297zm4.49.88a.303.303 0 0 0-.018.606c1.16.085 2.017.466 2.645 1.15c.63.688.93 1.524.906 2.57a.306.306 0 0 0 .61.013c.025-1.175-.334-2.193-1.067-2.994c-.74-.81-1.777-1.253-3.05-1.346h-.024zm.463 1.63a.305.305 0 0 0-.3.287c-.008.167.12.31.288.32c.523.028.875.175 1.113.422c.24.245.388.62.416 1.164a.304.304 0 0 0 .605-.03c-.03-.644-.215-1.178-.58-1.557c-.367-.378-.893-.574-1.52-.607h-.018z"
                    />
                  </svg>
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4} mb={5} sx={{ textAlign: "center" }}>
        <Grid item mx={3}>
          <Typography variant="h6" color="white">
            About Us
          </Typography>
          <Box mt={3} sx={{ fontSize: 16 }}>
            <Box mt={2}>
              <Link href={`/about/policy_and_mission`}>
                Company Policy & Mission
              </Link>
            </Box>
            <Box mt={2}>
              <Link href={`/about/our_commitments`}>Our Five Commitments</Link>
            </Box>
            <Box mt={2}>
              <Link href={`/about/company_profile_video`}>
                Company Profile, Video
              </Link>
            </Box>
            <Box mt={2}>
              <Link href={`/about/company_organization_structure`}>
                Company Organization Structure
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid item mx={3}>
          <Typography variant="h6" color="white">
            Our Apps
          </Typography>
          <Box mt={3} sx={{ fontSize: 16 }}>
            <Box mb={3}>
              <p>Download Fake App One! </p>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Link href={`#`}>
                  <Image
                    src="/images/google-play-badge.png"
                    width={120}
                    height={120}
                    priority
                    alt="Logo"
                    className="footerlogo"
                  />
                </Link>
                <Link href={`#`}>
                  <Image
                    src="/images/app-store-badge2.png"
                    width={120}
                    height={120}
                    priority
                    alt="Logo"
                    className="footerlogo"
                  />
                </Link>
              </Box>
            </Box>
            <Box mb={3}>
              <p>Download Fake App Two! </p>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Link href={`#`}>
                  <Image
                    src="/images/google-play-badge.png"
                    width={120}
                    height={120}
                    priority
                    alt="Logo"
                    className="footerlogo"
                  />
                </Link>
                <Link href={`#`}>
                  <Image
                    src="/images/app-store-badge2.png"
                    width={120}
                    height={120}
                    priority
                    alt="Logo"
                    className="footerlogo"
                  />
                </Link>
              </Box>
            </Box>
            <Box mb={3}>
              <p>Download Fake App Three! </p>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Link href={`#`}>
                  <Image
                    src="/images/google-play-badge.png"
                    width={120}
                    height={120}
                    priority
                    alt="Logo"
                    className="footerlogo"
                  />
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserFooter;
