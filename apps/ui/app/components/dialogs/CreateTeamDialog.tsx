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
import { useFetcher } from "@remix-run/react";
import { Routes } from "~/routes";
import { FormEventHandler, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export function CreateTeamDialog() {
  const [open, setIsOpen] = useState<boolean>(false);
  const fetcher = useFetcher();

  const isSubmitting = fetcher.state === "submitting";

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const nameInput = event.currentTarget.elements.namedItem("name") as HTMLInputElement;
    if (!nameInput.value.trim()) {
      return;
    }

    fetcher.submit(event.currentTarget);
    setIsOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button disabled={isSubmitting}>Create Team</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Team</DialogTitle>
          <DialogDescription>
            Invites coming soon!
          </DialogDescription>
        </DialogHeader>
        <fetcher.Form method="post" action={Routes.actions.team.create} onSubmit={handleSubmit}>
          <fieldset disabled={isSubmitting} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" className="col-span-3" disabled={isSubmitting} />
            </div>
          </fieldset>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Create Team"}
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
