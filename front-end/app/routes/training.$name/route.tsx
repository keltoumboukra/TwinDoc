import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return {name: params.name}
};

export default function Project(){
  const {name} = useLoaderData<typeof loader>()
  return (
    <div>
      <h1>Projects in {name}</h1>
    </div>
  );
}