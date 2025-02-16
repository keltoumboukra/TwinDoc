import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { LinksFunction, LoaderFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import Footer from "~/ui/footer";
import Header from "~/ui/header";

// Styling
import * as stylex from "@stylexjs/stylex";
import {Theme} from '@radix-ui/themes';

import stylexStyles from "./index.css?url";
import radixStyles from "@radix-ui/themes/styles.css?url";
import { authCookie } from "./auth";

export const meta: MetaFunction = () => {
  return [
    { title: "Twindoc | Healthcare Digital Twins" },
    { name: "description", content: "Welcome to the future of healthcare" },
  ];
};

export const links: LinksFunction = () => [
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?v=10' },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png?v=10' },
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png?v=10' },
  { rel: 'icon', href: '/favicon.ico?v=10' },
  { rel: "stylesheet", href: stylexStyles },
  { rel: "stylesheet", href: radixStyles },
];

export const loader: LoaderFunction = async ({request}: LoaderFunctionArgs) => {
  const userId = await authCookie.parse(request.headers.get("Cookie"));
  return userId ?? null;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>  
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
      
  );
}

export default function App() {
  const userId = useLoaderData()
  return (
    <Theme accentColor="iris">
      <div {...stylex.props(styles.grid)}>
        <Header hasAuth={!!userId} />
        <div {...stylex.props(styles.main)}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </Theme>
  )
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.dir(error, { depth: null });

  return (
    <html lang="en">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="root-error">
        <h1>
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText || error.data}`
            : error instanceof Error
            ? error.message
            : "Unknown Error"}
        </h1>
        <Scripts />
      </body>
    </html>
  );
}


const styles = stylex.create({
  grid: {
    display: 'grid',
    height: '100vh',
    width: '100wh',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '70px 1fr 50px',
    gridTemplateAreas: `"header" "main" "footer"`,
    gridGap: 5,
  },
  main: {
    gridArea: 'main',
    paddingVertical: 25,
    paddingHorizontal: 25,
  },
  projects: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: 20,
    padding: 10,
  },
});
