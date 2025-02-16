
import type { ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, Form, Link, useActionData, } from "@remix-run/react";
import * as stylex from "@stylexjs/stylex";
import { Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { authCookie, authenticateAccount } from "~/auth";

export const loader: LoaderFunction = async ({request}: LoaderFunctionArgs) => {
  const userId = await authCookie.parse(request.headers.get("Cookie"));
  if (userId) throw redirect('/dashboard')
  return null
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();
  const email = String(body.get("email"))
  const password = String(body.get("password"))
  const user = await authenticateAccount(email, password)
  if (user.error) return user.error
  return redirect(`/dashboard`, {
    headers: {
      "Set-Cookie": await authCookie.serialize(user.userId),
    },
  })
};

export default function Login() {
  const errors = useActionData<typeof action>();

  return (
    <Flex direction="column" justify="center" align="center">
      <h1>Sign In</h1>
      {errors ? <Text color="tomato">{errors}</Text> : null}
      <Form method="post">
        <Card {...stylex.props(styles.login)}>
          <label htmlFor="email">Email Address</label>
          <TextField.Input size="3" radius="large" name="email" type="email" />
          <br/>
          <Flex justify="between">
            <label htmlFor="password">Password</label>
            <Link to="/forgot">Forgot Password?</Link>
          </Flex>
          <TextField.Root size="3" radius="large">
            <TextField.Input name="password" type="password" />
            <TextField.Slot>
              <EyeClosedIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          <br/>
          <Button size="3" type="submit">Login</Button>
        </Card>
      </Form>
      <Flex m="4" gap="3">
        <Text>Dont have an account yet?</Text>
        <Link to="/register">Register</Link>
      </Flex>
    </Flex>
  );
}

const styles = stylex.create({
  login: {
    width: 350,
    padding: 25,
    backgroundColor: '#e2e8f0',
    borderRadius: 15,
    color: 'black',
  },
});