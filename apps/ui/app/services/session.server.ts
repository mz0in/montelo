import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

const isProduction = process.env.NODE_ENV === "production";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SECRET!],
    secure: isProduction,
  },
});

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [process.env.SECRET!],
    ...(isProduction ? { domain: "app.montelo.ai", secure: true } : {}),
  },
});

export const themeSessionResolver = createThemeSessionResolver(themeStorage);
