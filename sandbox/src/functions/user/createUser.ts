import {AIFunction} from "montelo";
import {z} from "zod";

const FunctionInput = z.object({
    name: z.string().describe("The user's name."),
    phoneNumber: z.string().describe("The user's phone number."),
});
type TFunctionInput = z.infer<typeof FunctionInput>;

const createUser = async (params: TFunctionInput): Promise<string> => {
    return ""
};

export default new AIFunction({
    name: "createUser",
    function: createUser,
    description: "Create a user.",
    schema: FunctionInput,
});
