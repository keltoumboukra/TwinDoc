import * as stylex from "@stylexjs/stylex";
import Link from "~/components/styled-link";
import Logo from "~/assets/logo.svg";
import UserMenu from "../components/user-menu";
import { Button, Flex, Text } from "@radix-ui/themes";

type HeaderTypes = {
  hasAuth: boolean,
}

const Header = ({ hasAuth }: HeaderTypes) => {
  return (
    <div {...stylex.props(styles.header)}>
      <Link to="">
       <img src={Logo} alt="Twindoc" width={150} style={{display: 'block'}} />
      </Link>
      {hasAuth ? <AuthenticatedNav /> : <NotAuthenticatedNav /> }
    </div>
  )
}

const NotAuthenticatedNav = () => {
  return (
    <ul {...stylex.props(styles.nav)}>
      <li>
        <Link to="/login">Sign In</Link>
      </li>
      <li>
        {/* <Button radius="full"> */}
          <Link to="/register">Join for Free</Link>
        {/* </Button> */}
      </li>
    </ul>
  )
}

const AuthenticatedNav = () => {
 return (
    <Flex gap="6" align="center">
      <Flex gap="5">
        <Link to="/dashboard" unstable_viewTransition>My Dashboard</Link>
        <Link to="/training" unstable_viewTransition>Training Studio</Link>
        {/* <Link to="/data-explorer" unstable_viewTransition>Data Explorer</Link> */}
      </Flex>
      <UserMenu />
    </Flex>
 )
}

export default Header;

const styles = stylex.create({
  header: {
    display: 'flex',
    position: 'sticky',
    top: 0,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.10)',
  },
  nav: {
    listStyle: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 15,
    fontWeight: 600,
  },
});
