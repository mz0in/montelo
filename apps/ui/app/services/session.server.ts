import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

const isProduction = process.env.NODE_ENV === "production";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["s3cr3t"], // TODO change
    secure: isProduction,
  },
});

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"], // TODO change
    ...(isProduction ? { domain: "your-production-domain.com", secure: true } : {}),
  },
});

export const themeSessionResolver = createThemeSessionResolver(themeStorage);
