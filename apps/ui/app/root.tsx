import styles from "./tailwind.css";
import clsx from "clsx";
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { themeSessionResolver } from "./services/session.server";
import { Routes } from "./routes";
import { useRevalidateOnFocus, useRevalidateOnReconnect, useWindowSize } from "./hooks";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const meta: MetaFunction = () => {
  return [{ title: "Montelo" }, { name: "description", content: "Montelo" }];
};

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

  const MobilePage = () => (
    <div className={"w-screen h-screen flex justify-center items-center"}>
      <p>MonteloAI is best viewed on a larger screen.</p>
    </div>
  );

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
