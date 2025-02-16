import { type LoaderFunctionArgs } from "@remix-run/node";
import * as stylex from "@stylexjs/stylex";
import { Heading, Text } from "@radix-ui/themes"
import ProjectCard from "~/components/project-card";

// Data
import { projectData } from "~/data/projects";
import { requireAuthCookie } from "~/auth";

export const loader = async ({request}: LoaderFunctionArgs) => {
   const userId = await requireAuthCookie(request)
   return userId
}

export default function Dashboard() {
   return (
    <>
      <Heading>Welcome back Dr. Andrews 👋</Heading>
      <div {...stylex.props(styles.projects)}>
        {projectData.map(project => {
          return <ProjectCard
            key={project.id} 
            id={project.id}
            name={project.name}
            team={project.team}
            tags={project.tags}
            color={project.color}
            logo={project.logo}
          />
        })}
      </div>
    </>
   )
}

const styles = stylex.create({
   projects: {
     display: 'grid',
     gridTemplateColumns: 'repeat(3, 1fr)',
     gridGap: 20,
     padding: 10,
   },
 });
 
