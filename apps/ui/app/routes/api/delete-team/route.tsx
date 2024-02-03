import { ActionFunction, json } from "@remix-run/node";
import { withAuth } from "~/routes/_common/withAuth";

export const action: ActionFunction = withAuth(async ({ api, request }) => {
  const formData = await request.formData();
  const id = formData.get("id")!.toString();
  const success = await api.team().teamControllerDelete({
    id,
  });
  console.log("success: ", success);
  return json(success);
});
