import { Avatar, Card, Flex, Text } from "@radix-ui/themes"

type ChatCardTypes = {
  image: string,
  name: string,
  text: string,
}

const ChatCard = ({image, name, text}: ChatCardTypes) => {
  return <Card>
    <Flex align="center" gap="2">
      <Avatar 
        size="2"
        radius="full"
        src={image}
        fallback={name}
      /> 
      <Text>{text}</Text>
    </Flex>
  </Card>
}

export default ChatCard;