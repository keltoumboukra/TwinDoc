import { Flex, Text } from "@radix-ui/themes";
import { Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <>
      <Flex justify="start" align="center" height="100%" direction="column">
        <Outlet />
      </Flex>
    </>
  );
}