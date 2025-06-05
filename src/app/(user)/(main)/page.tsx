import UserBannerComponent from "@/components/user/home/Banner";
import UserDashboardComponent from "@/components/user/home/Dashboard";
import UserFlipComponent from "@/components/user/home/Flip";
import UserReleaseComponent from "@/components/user/home/Release";
import UserResourceComponent from "@/components/user/home/Resource";

const UserHome = () => {
  return (
    <div style={{ width: "100%" }}>
      <UserBannerComponent />
      <UserReleaseComponent />
      <UserResourceComponent />
      <UserDashboardComponent />
      <UserFlipComponent />
    </div>
  )
}

export default UserHome;