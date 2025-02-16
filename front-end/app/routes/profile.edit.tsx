import { Button, Flex, TextField } from "@radix-ui/themes"
import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import z from "zod";

import { getMemberProfile, updateMemberProfile } from "./data-member";
import UserAvatar from "~/components/user-avatar";


const memberId = 1;

export async function loader() {
  const profile = await getMemberProfile(memberId);
  return profile
}

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log('updates:', updates)

  const formSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    avatar: z.string().url().min(2),
    company: z.string(),
    title: z.string(),
    location: z.string(),
    twitter: z.string(),
  })

  const validatedFields = formSchema.safeParse({
    firstName: updates.firstName,
    lastName: updates.lastName,
    avatar: updates.avatar,
    company: updates.company,
    title: updates.title,
    location: updates.location,
    twitter: updates.twitter,
  })

  if (!validatedFields.success) {
    return json({
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix your input errors",
      data: null,
    })
  }

  const updateResponse = await updateMemberProfile(memberId, updates);
  
  console.log('updateResponse', updateResponse);
  
  return redirect("/profile")
}

export default function ProfileEdit() {
  const userData = useLoaderData<typeof loader>()

  const formData = useActionData<typeof action>()
  console.log('Action: formData errors', formData?.errors)

  return (
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
        <Form method="post">
          <label htmlFor="firstName">First Name</label>
          <TextField.Input size="3" radius="large" name="firstName" type="text" defaultValue={userData.firstName} />

          <label htmlFor="lastName">Last Name</label>
          <TextField.Input size="3" radius="large" name="lastName" type="text" defaultValue={userData.lastName} />

          <label htmlFor="company">Company</label>
          <TextField.Input size="3" radius="large" name="company" type="text" defaultValue={userData.company} />

          <label htmlFor="company">Title</label>
          <TextField.Input size="3" radius="large" name="title" type="text" defaultValue={userData.title} />

          <label htmlFor="location">Location</label>
          <TextField.Input size="3" radius="large" name="location" type="text" defaultValue={userData.location} />

          <label htmlFor="twitter">Twitter Handle</label>
          <TextField.Root>
            <TextField.Slot>@</TextField.Slot>
            <TextField.Input size="3" radius="large" name="twitter" type="text" defaultValue={userData.twitter} />
          </TextField.Root>

          <label htmlFor="company">Avatar</label>
          <TextField.Input size="3" radius="large" name="avatar" type="text" defaultValue={userData.avatar} />

          <Button type="submit">Update</Button>
        </Form>
      </Flex>
    </Flex>
  )
}
