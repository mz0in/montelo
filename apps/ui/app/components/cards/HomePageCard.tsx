import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { EnvironmentDto, FullMembershipDto, ProjectWithEnvironmentsDto } from "@montelo/browser-client";
import { Delete, MoreHorizontal } from "lucide-react";
import _ from "lodash";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Link, useNavigate } from "@remix-run/react";
import { Routes } from "~/routes";
import { NewProjectDialog } from "~/components/dialogs/NewProjectDialog";
import { useState } from "react";
import { DeleteTeamConfirmDialog } from "~/components/dialogs/DeleteTeamConfirmDialog";
import { sortEnvironmentsByName } from "~/utils/sortEnvironmentsByName";

type HomePageCardProps = {
  membership: FullMembershipDto;
}
export const HomePageCard = ({ membership }: HomePageCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const projects = membership.team.projects;
  const teamName = membership.team.name;
  const role = membership.role;

  const EnvironmentsView = ({ env }: { env: EnvironmentDto }) => {
    const params = {
      envId: env.id,
      projectId: env.projectId,
    };

    return (
      <Link to={Routes.app.project.env.dashboard(params)} prefetch={"intent"} className={"hover:underline font-light"}>
        {env.name}
      </Link>
    );
  };

  const ProjectView = ({ name, environments }: ProjectWithEnvironmentsDto) => {
    const sortedEnvironments = sortEnvironmentsByName(environments);

    return (
      <div className={"mb-4"}>
        <div className={"flex justify-between items-center"}>
          <Label className={"text-xl"}>{name}</Label>
        </div>
        <div className={"mt-2 space-x-4"}>
          {sortedEnvironments.map((environment) => (
            <EnvironmentsView key={environment.id} env={environment} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className={"text-2xl"}>
            {teamName}
          </CardTitle>
          <CardDescription className={"text-sm font-light"}>{_.capitalize(role)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col">
              {projects.map((project) => (
                <ProjectView key={project.id} {...project} />
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <NewProjectDialog teamName={teamName} teamId={membership.teamId} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
              {/*<DropdownMenuItem>*/}
              {/*  <Pencil size={16} />&nbsp;*/}
              {/*  Edit*/}
              {/*</DropdownMenuItem>*/}
              {/*<DropdownMenuItem>*/}
              {/*  <LogOut size={16} />&nbsp;*/}
              {/*  Leave*/}
              {/*</DropdownMenuItem>*/}
              {/*<DropdownMenuSeparator />*/}
              <DropdownMenuItem className={"text-red-600"} onClick={() => setIsDialogOpen(true)}>
                <Delete size={16} className={"text-red-600"} />&nbsp;
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
      <DeleteTeamConfirmDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        teamName={teamName}
        teamId={membership.teamId}
      />
    </div>
  );
};