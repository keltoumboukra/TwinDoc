import { Heading } from "@radix-ui/themes"
import { Outlet } from "@remix-run/react";
export default function Profile() {
  
  return (
    <>
      <Heading size="6">My Profile</Heading>
      <Outlet />
    </>
  )
}
