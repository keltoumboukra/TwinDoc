import * as stylex from "@stylexjs/stylex";
import { Card, Badge, Flex, Avatar, Text } from "@radix-ui/themes";
import { Link } from "@remix-run/react";

type ProjectCardTypes = {
  id: string,
  name: string,
  team: [string],
  color: string,
  logo: string,
  tags: [string],
}

const ProjectCard = ({id, name, team, color, logo, tags}: ProjectCardTypes) => {
  return (
    <Link to={`/cases/${id}`} {...stylex.props(styles.cardLink)} unstable_viewTransition>
    <Card size="2" variant="classic" {...stylex.props(styles.projectCard)}>
      <Flex direction="row">
      <div {...stylex.props(styles.projectColor(color))} />
      <div {...stylex.props(styles.content)}>
        <Text size="4" weight="bold">
          {name}
        </Text>
        <Flex gap="1">
          {tags?.map(tag => <Badge key={tag}>{tag}</Badge>)}
        </Flex>
        <Flex direction="row" justify="between">
          <div>
            <Text size="1" weight="bold">Team</Text>
            <Flex gap="1">
              {team?.map(person => {
                return <Avatar key={person.id} fallback={person.initials} src={person.image} radius="full" />
              })}
            </Flex>
          </div>
          <Flex align="end">
            <img
              alt="logo"
              width={50}
              src={logo}
            />
          </Flex>
        </Flex>
        
      </div>
      </Flex>
    </Card>
    </Link>
  )
}

export default ProjectCard;

const styles = stylex.create({
  cardLink: {
    textDecoration: 'none !important',
  },
  projectCard: {
    scale: {
      ':hover': '101%', 
    },
    backgroundColor: {
      ':hover': '#F9F9FB !important'
    },
    boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.05)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: 4,
  },
  projectColor: (color) => ({
    backgroundColor: color,
    width: 5,
    borderRadius: 10,
    marginRight: 15,
  }),
});
