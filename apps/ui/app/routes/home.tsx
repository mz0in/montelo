import { json, LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "~/routes/_common/withAuth";
import { ProfileDropdown } from "~/components/nav/header/ProfileDropdown";
import { HomePageCard } from "~/components/cards/HomePageCard";
import { CreateTeamDialog } from "~/components/dialogs/CreateTeamDialog";
import { AuthUserDto, FullMembershipDto } from "@montelo/browser-client";

export const meta: MetaFunction = () => {
  return [
    { title: "Montelo" },
    { name: "description", content: "Montelo" },
  ];
};

type LoaderType = {
  user: AuthUserDto;
  memberships: FullMembershipDto[];
}

export const loader: LoaderFunction = withAuth(async ({ api, user }) => {
  const memberships = await api.membership().membershipControllerGetAll();
  const returnObj = {
    user,
    memberships,
  };
  return json<LoaderType>(returnObj);
});

export default function HomePage() {
  const { user, memberships } = useLoaderData<LoaderType>();

  return (
    <div className="flex flex-col h-screen">
      <header className="mx-32">
        <nav className="mx-auto flex w-full items-center justify-between p-6 lg:px-4" aria-label="Global">
          <div className="flex flex-row items-center p-4 gap-2">
            <img className="h-8 w-auto" src={"/logo.png"} alt="Logo" />
            <p className={"text-xl"}>MonteloAI</p>
          </div>
          <div className="lg:flex lg:flex-1 lg:justify-end gap-4">
            <ProfileDropdown user={user} />
          </div>
        </nav>
      </header>
      <main className="flex-1 overflow-x-hidden overflow-y-auto pb-4 px-8 mx-32">
        <div className="flex mb-4">
          <h1 className="text-4xl font-medium">
            Welcome back, {user.firstName}!
          </h1>
        </div>
        <div className={"flex justify-between"}>
          <h2 className={"text-2xl text-muted-foreground font-light mb-8"}>
            Teams
          </h2>
          <CreateTeamDialog />
        </div>
        <div className="grid grid-cols-2 gap-8">
          {memberships.map((membership) => (
            <HomePageCard key={membership.id} membership={membership} />
          ))}
        </div>
      </main>
    </div>
  );
}
