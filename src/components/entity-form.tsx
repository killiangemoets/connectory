import { Form } from "./rhf/form";
import { RHFRadioInput } from "./rhf/inputs/radio";
import { RHFTextInput } from "./rhf/inputs/text";
import { Typography } from "./typography";
import { Button } from "./ui/button";
import { ENTITY_TYPES } from "@/constants/entity";
import { MAX_CHAR_TEXT_INPUT } from "@/constants/inputs";
import type { CreateEntityData, UpdateEntityData } from "@/types/entity";
import type { Path, SubmitHandler, UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";

type EntityFormProps<T extends CreateEntityData | UpdateEntityData> = {
  loading: boolean;
  error?: string | undefined;
  methods: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
};

export const EntityForm = <T extends CreateEntityData | UpdateEntityData>({ methods, onSubmit, loading, error }: EntityFormProps<T>) => {
  const entityType = useWatch<T>({
    name: "entityType" as Path<T>,
    control: methods.control,
  });

  const id = useWatch<T>({
    name: "id" as Path<T>,
    control: methods.control,
  });

  return (
    <Form className="flex flex-col gap-6 w-full max-w-96" methods={methods} onSubmit={onSubmit}>
      <RHFRadioInput
        readOnly={!!id}
        hideError
        className="flex space-x-4"
        required
        name="entityType"
        label="Entity Type"
        items={[
          {
            label: "Contact",
            value: "CONTACT",
          },
          {
            label: "Company",
            value: "COMPANY",
          },
        ]}
      />
      <RHFTextInput maxLength={MAX_CHAR_TEXT_INPUT} required name="name" label="Name" placeholder="Enter the name" />
      {entityType === ENTITY_TYPES.CONTACT && (
        <>
          <RHFTextInput maxLength={MAX_CHAR_TEXT_INPUT} required name="email" label="Email" placeholder="Enter your email" />
          <RHFTextInput required name="phone" label="Phone Number" placeholder="Enter your phone number" />
        </>
      )}
      {entityType === ENTITY_TYPES.COMPANY && (
        <>
          <RHFTextInput maxLength={MAX_CHAR_TEXT_INPUT} required name="contactEmail" label="Contact Email" placeholder="Enter your email" />
          <RHFTextInput maxLength={MAX_CHAR_TEXT_INPUT} required name="industry" label="Industy" placeholder="Enter your industry" />
        </>
      )}
      <div className="mt-6 flex items-center gap-8">
        <Button disabled={loading} variant="outline" className="w-[50%]" type="button" href="/">
          Cancel
        </Button>
        <Button disabled={loading} type="submit" className="w-full">
          Submit
        </Button>
      </div>
      {!!error && <Typography.error className="text-center">Something went wrong, please try again!</Typography.error>}
    </Form>
  );
};
