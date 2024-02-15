import {AIFunction} from "montelo";
import {z} from "zod";

const FunctionInput = z.object({
    name: z.string().describe("The user's name."),
    phoneNumber: z.string().describe("The user's phone number."),
});
type TFunctionInput = z.infer<typeof FunctionInput>;

const findUser = async (params: TFunctionInput): Promise<""> => {
    return ""
};

export default new AIFunction({
    name: "findUser",
    function: findUser,
    description: "Finds a user. Useful when you need a user's id.",
    schema: FunctionInput,
});
