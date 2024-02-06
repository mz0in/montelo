import { DeleteSuccessDto } from "@montelo/browser-client";
import { ActionFunction, json } from "@remix-run/node";
import { withAuth } from "~/common/auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, request }) => {
  const formData = await request.formData();
  const id = formData.get("id")!.toString();
  const success = await api.team().teamControllerDelete({
    id,
  });
  return json<DeleteSuccessDto>(success);
});
