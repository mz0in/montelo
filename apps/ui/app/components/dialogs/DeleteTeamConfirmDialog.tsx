import { useFetcher } from "@remix-run/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Routes } from "../../routes";

type NewProjectDialogProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  teamName: string;
  teamId: string;
}

export const DeleteTeamConfirmDialog = ({ teamName, teamId, isDialogOpen, setIsDialogOpen }: NewProjectDialogProps) => {
  const fetcher = useFetcher();

  const handleDelete = () => {
    fetcher.submit({ id: teamId }, { method: "post", action: Routes.actions.team.delete });
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Team {teamName}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the {teamName} team?<br />
            <span className={"font-bold"}>This is an irreversible action.</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleDelete} variant={"destructive"}>Delete {teamName}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};