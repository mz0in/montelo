import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { FormEventHandler, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { Routes } from "~/routes";

type NewProjectDialogProps = {
  teamId: string;
  teamName: string;
}

export const NewProjectDialog = ({ teamName, teamId }: NewProjectDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isCollapseOpen, setIsCollapseOpen] = useState<boolean>(false);
  const fetcher = useFetcher();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const nameInput = event.currentTarget.elements.namedItem("name") as HTMLInputElement;
    if (!nameInput.value.trim()) {
      return;
    }

    fetcher.submit(event.currentTarget);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Add Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <fetcher.Form method="post" action={Routes.api.addProject} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>
              Add a project to the <span className={"font-bold"}>{teamName}</span> team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex-row items-center space-y-1">
              <input type="hidden" name="teamId" value={teamId} />
              <Label htmlFor="name" className="text-right font-bold text-base">
                Project Name *
              </Label>
              <Input id="name" name={"name"} placeholder={"Project X"} />
            </div>

            <Collapsible
              open={isCollapseOpen}
              onOpenChange={setIsCollapseOpen}
            >
              <div className="flex items-center gap-1">
                <Label htmlFor="environmentName" className="text-right font-bold text-base">
                  Environments
                </Label>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <CaretSortIcon />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="flex-row items-center">
                  <p className={"text-sm font-light"}>
                    By default, each project is created with a <span
                    className={"font-medium"}>Development</span> and <span
                    className={"font-medium"}>Production</span> environment.
                  </p>
                  <p className={"text-sm font-light mb-4 mt-2"}>
                    Specify an additional environment here.
                  </p>
                  <Input id="environment" name={"environment"} placeholder={"Staging"} />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <DialogFooter>
            <Button type="submit">Add to {teamName}</Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
};