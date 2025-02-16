import * as stylex from "@stylexjs/stylex";
import { useFetcher } from "@remix-run/react";
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Avatar, Button, Card, DropdownMenu } from '@radix-ui/themes';
import { UserData as user } from "~/data/users";
import Link from "~/components/styled-link";

function SignOutButton() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post" action="/logout">
      <Button variant="ghost" type="submit" {...stylex.props(styles.formLink)}>Sign out</Button>
    </fetcher.Form>
  );
}

const UserMenu = () => {

  return <>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Card variant="ghost">
          <Button radius="full" variant="ghost">
            <Avatar 
              size="2"
              radius="full"
              src={user.image}
              fallback={user.name}
            />
            {user?.name ? user.name : user.email!}
          <ChevronDownIcon />
          </Button>
        </Card>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>
          <Link to="/profile">
            Profile
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Link to="/admin">Admin</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="⌘ S">
          <SignOutButton />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </>
}

export default UserMenu;

const styles = stylex.create({
  formLink: {
    color: {
      ':hover': '#fff !important',
    }
  },
});
