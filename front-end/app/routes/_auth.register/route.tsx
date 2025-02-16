import { Flex, Text, Card, TextField, Button } from "@radix-ui/themes";
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect, Form, Link } from "@remix-run/react";
import * as stylex from "@stylexjs/stylex";
import { authCookie, createAccount } from "~/auth";

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();
  const email = String(body.get("email"))
  const password = String(body.get("password"))
  const user = await createAccount(email, password)
  return redirect("/", {
    headers: {
      "Set-Cookie": await authCookie.serialize(user.userId),
      // "Set-Cookie": `auth=${user.userId}; Path=/; HttpOnly; Max-Age=31536000; SameSite=Strict`,
    },
  })
};

export default function Register() {
  return (

    <Flex direction="column" justify="center" align="center">
      <h1>Register</h1>
      <Form method="post">
        <Card {...stylex.props(styles.login)}>
          <label htmlFor="email">Full Name</label>
          <TextField.Input size="3" radius="large" name="name" type="name" />
          <br/>
          <label htmlFor="email">Email Address</label>
          <TextField.Input size="3" radius="large" name="email" type="email" />
          <br/>
          <label htmlFor="password">Choose Password</label>
          <TextField.Input size="3" radius="large" name="password" type="password" />
          <br/>
          <Button size="3" type="submit">Register</Button>
        </Card>
      </Form>
      <Flex m="4" gap="3">
        <Text>Have an account?</Text>
        <Link to="/login">Sign In</Link>
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
  }
});