import { useFormContext, useIsSubmitting } from "remix-validated-form";
import { Button } from "~/components/ui/button";

interface FormSubmitButtonProps {
  content: string;
}

export const FormSubmitButton = ({ content }: FormSubmitButtonProps) => {
  const isSubmitting = useIsSubmitting();
  const { isValid } = useFormContext();
  const disabled = isSubmitting || !isValid;

  return (
    <Button type="submit" disabled={disabled} className={"w-full mt-6"}>
      {content}
    </Button>
  );
};
