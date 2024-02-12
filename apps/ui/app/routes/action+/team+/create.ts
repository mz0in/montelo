import { TeamDto } from "@montelo/browser-client";
import { ActionFunction, json } from "@remix-run/node";
import { withAuth } from "../../../common/auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, request }) => {
  const formData = await request.formData();
  const name = formData.get("name")!;
  const team = await api.team().teamControllerCreate({
    createTeamInput: {
      name: name.toString(),
    },
  });
  return json<TeamDto>(team);
});
