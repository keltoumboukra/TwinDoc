import { LightningBoltIcon } from "@radix-ui/react-icons";
import { Card, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, Outlet, redirect } from "@remix-run/react";
import * as stylex from "@stylexjs/stylex";

import Sound from "~/assets/sound.svg";
import ChatCard from "~/components/chat-card";

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();
  const username = body.get("name")
  return redirect(`./${username}`)
};

export default function Collaborate(){
  return (<div {...stylex.props(styles.body)}>
    <h2>Training Studio</h2>
    <Outlet />

    <Card>
          <Flex p="5" gap="6" align={"center"} direction="column" justify={"between"}>
            <Heading>Training your Digital Twin</Heading>
            <Text align={"center"}>
            We'll now go through a 5 minute onboarding process to get to you know and shape your digital twin. 
            </Text>

            <Text align={"center"}>In our conversation we'll get to know you, understanding your unique tone and speaking style. 
            </Text>

            <Flex>
              <img src={Sound} alt="Speaking..." style={{height: "40px"}}/>
            </Flex>

            <TextField.Root>
              <TextField.Slot>
                <LightningBoltIcon height="16" width="16" />
              </TextField.Slot>
              <TextField.Input size="3" radius="large" name="question" type="text" placeholder="" width={200} />
            </TextField.Root>
            
          </Flex>
        </Card>
  </div>);
}

const styles = stylex.create({
  body: {
    display: 'flex',
    flexDirection: 'column',
  },
});
