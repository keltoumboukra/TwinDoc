// import { LinksFunction } from "@remix-run/node";
import { createId } from "@paralleldrive/cuid2"
import * as stylex from "@stylexjs/stylex";
import { useLoaderData } from "@remix-run/react";
import {Button, Card, Flex, Grid, Heading, Table, Text, TextField } from "@radix-ui/themes";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import ChatCard from "~/components/chat-card";

export const loader = () => {
  return {API_KEY: "pk.eyJ1IjoibmhpdCIsImEiOiJjbHN2amt4eXAwNjY3MmpqenR6cGU0MDlzIn0.7LSH6AzHLDsBrQw_9lf3eA"}
}

export default function Project() {
  // const {API_KEY} = useLoaderData<typeof loader>()
  return (
    <>
      <Flex mb="2" justify="between" align="center">
        <Flex direction="column">
          <Heading size="2" color="iris">Kaiser ER</Heading>
          <Flex gap="4" direction={"row"} align={"center"}>
            <Heading>GI Bleed</Heading>
            <Text>55 / Male</Text>
          </Flex>
        </Flex>
        <Button>+ Add More Experts</Button>
      </Flex>
      <Grid columns="2" gap="4" style={{height: 500 }}>

        <Card style={{backgroundColor: '#E7F1FE'}}>
          <Flex p="2" direction={'column'}>
              <Table.Root variant="surface">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>BP</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>BUN</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>INR</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Platelets</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Creatinine</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Hematocrit</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.RowHeaderCell>80/40</Table.RowHeaderCell>
                    <Table.Cell>42</Table.Cell>
                    <Table.Cell>1.3</Table.Cell>
                    <Table.Cell>72</Table.Cell>
                    <Table.Cell>1.2</Table.Cell>
                    <Table.Cell>32 / B40</Table.Cell>
                  </Table.Row>

                </Table.Body>
              </Table.Root>
          </Flex>
          <Flex p="2">
            <Card size={"3"}>
              <Heading size="3">Indication Summary</Heading>
              Hematemesis with red clots (large / small), no Hematochezia for 1 day with Syncope
              <br/><br/>
              <Heading size="3">Last Bowel Movement</Heading>
              6 hr ago, Red blood (Tarry Black/Brown stool)
              <br /><br />
              <Heading size="3">Rectal Exam</Heading>
              Reveals Ongoing red blood (No melena)
            </Card>
          </Flex>
          <Flex p="2">
            <Card size={"3"}>
              <Heading size="3">Prior History</Heading>
                Patient denies prior history CAD, COPD, CRF risk for stress ulcer, cirrhosis. Patient is on aspirin, PPI
            </Card>
          </Flex>
        </Card>
        
        <Card>
          <Flex p="5" gap="2" direction="column" justify={"between"}>
            <Heading>Conversation with Dr. Reza</Heading>

            {chatData.map(data => {
              return <ChatCard
                key={createId()}
                image={data.image}
                name={data.name}
                text={data.text}
                />
            })}
            
            <Flex style={{height: '100px'}}></Flex>
            
              <TextField.Root>
                <TextField.Slot>
                  <LightningBoltIcon height="16" width="16" />
                </TextField.Slot>
                <TextField.Input size="3" radius="large" name="question" type="text" placeholder="Ask Dr. Reza anything..."/>
              </TextField.Root>
            
          </Flex>
        </Card>

      </Grid>

    </>
  );
}

const chatData = [
  {
    name: 'RM',
    image: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1494',
    text: 'Well I am noticing the BUN/Creatinine Ratio is quite high, over 30.'
  },
  {
    name: 'RM',
    image: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1494',
    text: 'Thinking upper vireceal bleed. What do you think?'
  },
  {
    name: 'AK',
    image: 'https://doximity-res.cloudinary.com/images/c_crop,f_auto,h_263,q_auto,t_profile_photo_320x320,w_263,x_34,y_39/u1rmsitytvtuckc1zwxc/atul-kumar-md-atlanta-ga.jpg',
    text: 'Excellent points, I would schedule an endoscopy to verify.'
  },
  {
    name: 'AK',
    image: 'https://doximity-res.cloudinary.com/images/c_crop,f_auto,h_263,q_auto,t_profile_photo_320x320,w_263,x_34,y_39/u1rmsitytvtuckc1zwxc/atul-kumar-md-atlanta-ga.jpg',
    text: 'I am scheduling a scope immediately. How should we use to stabilize?'
  },
  
]


const styles = stylex.create({
  projects: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: 20,
    padding: 10,
  },
  data: {
    width: 600,
    backgroundColor: '#fff',
  },
});
