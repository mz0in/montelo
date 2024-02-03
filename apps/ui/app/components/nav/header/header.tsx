import { EnvSelector } from "~/components/nav/header/EnvSelector";
import { ProfileDropwdown } from "~/components/nav/header/profile_dropdown";
import { useLoaderData } from "@remix-run/react";
import { EnvLayoutLoader } from "~/types/envLayout.loader.types";

export const Header = () => {
  const { user, project, environment } = useLoaderData<EnvLayoutLoader>();

  return (
    <header className="pl-52">
      <nav className="mx-auto flex w-full items-center justify-between p-6 lg:px-4" aria-label="Global">
        <div className="lg:flex lg:flex-1 lg:justify-end gap-4">
          <EnvSelector environments={project.environments} pathEnv={environment} />
          <ProfileDropwdown user={user} />
        </div>
      </nav>
    </header>
  );
};
