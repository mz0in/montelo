import {AIFunction} from "montelo";
import {z} from "zod";

const FunctionInput = z.object({
    userId: z.number().describe("The user's id."),
});
type TFunctionInput = z.infer<typeof FunctionInput>;

const getAppointmentsForUser = async (params: TFunctionInput): Promise<string> => {
    return ""
};

export default new AIFunction({
    name: "getAppointmentsForUser",
    function: getAppointmentsForUser,
    description: "Get existing appointments for a user.",
    schema: FunctionInput,
});
