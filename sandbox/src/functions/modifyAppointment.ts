import {AIFunction} from "montelo";
import {z} from "zod";

const FunctionInput = z.object({
    appointmentId: z.number().describe("The appointment id."),
    startDate: z.string().describe("The start date to update. In ISO format."),
    endDate: z.string().describe("The end date to update. In ISO format."),
    serviceName: z.string().describe("The service to update.")
});
type TFunctionInput = z.infer<typeof FunctionInput>;

const modifyAppointment = async (params: TFunctionInput): Promise<string> => {
    return ""
};

export default new AIFunction({
    name: "modifyAppointment",
    function: modifyAppointment,
    description: "Modify an appointment for a user.",
    schema: FunctionInput,
});
