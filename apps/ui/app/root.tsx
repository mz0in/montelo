import clsx from "clsx";
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes";
import styles from "./tailwind.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  ShouldRevalidateFunction,
  useLoaderData,
} from "@remix-run/react";
import { useRevalidateOnFocus, useRevalidateOnReconnect, useWindowSize } from "~/hooks";
import { themeSessionResolver } from "~/services/session.server";
import { Routes } from "~/routes";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const shouldRevalidate: ShouldRevalidateFunction = () => false;

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction={Routes.actions.setTheme}>
      <App />
    </ThemeProvider>
  );
}

export function App() {
  const { width } = useWindowSize();
  const [theme] = useTheme();
  const data = useLoaderData<typeof loader>();

  const isMobile = width <= 640;

  const MobilePage = () => {
    return (
      <div className={"w-screen h-screen flex justify-center items-center"}>
        <p>Montelo is best viewed on a larger screen.</p>
      </div>
    );
  };

  // revalidation hooks
  useRevalidateOnReconnect();
  useRevalidateOnFocus();

  return (
    <html lang="en" className={clsx(theme)}>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
      <Links />
    </head>
    <body>
    {isMobile ? <MobilePage /> : <Outlet />}
    <ScrollRestoration />
    <Scripts />
    <LiveReload />
    </body>
    </html>
  );
}
