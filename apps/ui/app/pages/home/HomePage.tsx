import { useLoaderData } from "@remix-run/react";
import { HomePageLoaderData } from "./HomePage.types";
import { ProfileDropdown } from "../../components/nav/header/ProfileDropdown";
import { CreateTeamDialog } from "../../components/dialogs/CreateTeamDialog";
import { HomePageCard } from "../../components/cards/HomePageCard";

export const HomePage = () => {
  const { user, memberships } = useLoaderData<HomePageLoaderData>();

  return (
    <div className="flex flex-col h-screen">
      <header className="mx-32">
        <nav className="mx-auto flex w-full items-center justify-between py-6 pl-4 pr-8" aria-label="Global">
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
};