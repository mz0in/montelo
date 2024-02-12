import { useLoaderData } from "@remix-run/react";
import { EnvSelector } from "./EnvSelector";
import { ProfileDropdown } from "./ProfileDropdown";
import { EnvLayoutLoader } from "../../../types/envLayout.loader.types";

export const Header = () => {
  const { user, project, environment } = useLoaderData<EnvLayoutLoader>();

  return (
    <header className="pl-52">
      <nav className="mx-auto flex w-full items-center justify-between py-6 pl-6 pr-8" aria-label="Global">
        <div className="lg:flex lg:flex-1 lg:justify-end gap-4">
          <EnvSelector environments={project.environments} pathEnv={environment} />
          <ProfileDropdown user={user} />
        </div>
      </nav>
    </header>
  );
};
