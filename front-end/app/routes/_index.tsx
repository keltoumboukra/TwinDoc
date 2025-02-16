import { Flex, Text } from "@radix-ui/themes";
import { LoaderFunction, LoaderFunctionArgs, redirect } from "@remix-run/node";
import * as stylex from "@stylexjs/stylex";
import { authCookie } from "~/auth";

export const loader: LoaderFunction = async ({request}: LoaderFunctionArgs) => {
  const userId = await authCookie.parse(request.headers.get("Cookie"));
  if (userId) throw redirect('/dashboard')
  return null
}

export default function Index() {
  return (
    <>
      <Flex justify="center" align="center" height="100%">
        <Text>Welcome to Twindoc</Text>
      </Flex>
    </>
  );
}

const styles = stylex.create({
  projects: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: 20,
    padding: 10,
  },
});
