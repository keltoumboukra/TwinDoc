import { Button, Flex, Heading, Text } from "@radix-ui/themes"
import { useLoaderData } from "@remix-run/react";
import { getMemberProfile } from "./data-member";
import UserAvatar from "~/components/user-avatar";
import Link from "~/components/styled-link";

const memberId = 1;
export const loader = async () => {
  const profile = await getMemberProfile(memberId);
  return profile
}

export default function Profile() {
  
  const userData = useLoaderData<typeof loader>()
  
  return (
    <>
      <Flex direction="row" gap="2">
        <UserAvatar
          width={250}
          height={250}
          radius={15}
          image={userData.avatar}
          name={`${userData.firstName} ${userData.lastName}`}
          initials={userData.firstName[0] + userData.lastName[0]}
        />
        <Flex direction="column">
          <Heading size="4">{userData.firstName} {userData.lastName}</Heading>
          <Text>{userData.company}</Text>
          <Text>{userData.title}</Text>
          <Text>{userData.location}</Text>
          <Text>Twitter @{userData.twitter}</Text>
        </Flex>
      </Flex>
      <Link to="/profile/edit">
        <Button>Edit</Button>
      </Link>
    </>
  )
}
