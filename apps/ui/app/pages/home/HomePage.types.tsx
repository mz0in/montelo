import { AuthUserDto, FullMembershipDto } from "@montelo/browser-client";

export type HomePageLoaderData = {
  user: AuthUserDto;
  memberships: FullMembershipDto[];
};
