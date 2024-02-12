import { User } from "@clerk/remix/api.server";

export type HomeLoader = {
  user: User;
};
