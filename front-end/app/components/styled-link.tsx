import { ReactElement, PropsWithChildren } from "react";
import { Link } from "@remix-run/react";
import { Link as RadixLink } from "@radix-ui/themes";

type StyledLinkTypes = {
  to: string,
  children: string | PropsWithChildren | ReactElement,
}

const StyledLink = ({children, to, ...restProps}: StyledLinkTypes) => {
  return (
    <RadixLink {...restProps} asChild>
      <Link to={to}>{children}</Link>
    </RadixLink>
  )
}

export default StyledLink;