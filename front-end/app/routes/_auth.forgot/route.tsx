
import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import * as stylex from "@stylexjs/stylex";
import { Button, Card, Flex, TextField } from "@radix-ui/themes";

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();
  const email = String(body.get("email"))
  console.log('reset password for:', email)
  
  return email
};

export default function Login() {

  return (
    <Flex direction="column" justify="center" align="center">
      <h1>Forgot Password</h1>
      <Form method="post">
        <Card {...stylex.props(styles.login)}>
          <label htmlFor="email">Email Address</label>
          <TextField.Input size="3" radius="large" name="email" type="email" required />
          <br/>
          <Button size="3" type="submit">Reset Password</Button>
        </Card>
      </Form>
      <Flex m="4" gap="3">
        <Link to="/login">Back to Login</Link>
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