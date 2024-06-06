import { Form } from "./rhf/form";
import { RHFRadioInput } from "./rhf/inputs/radio";
import { RHFTextInput } from "./rhf/inputs/text";
import { Typography } from "./typography";
import { Button } from "./ui/button";
import { ENTITY_TYPES } from "@/constants/entity";
import type { CreateEntityData, UpdateEntityData } from "@/types/entity";
import { useEffect } from "react";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";

type EntityFormProps = {
  loading: boolean;
  error?: string | undefined;
  methods: UseFormReturn<CreateEntityData | UpdateEntityData>;
  onSubmit: SubmitHandler<CreateEntityData | UpdateEntityData>;
};

export const EntityForm = ({ methods, onSubmit, loading, error }: EntityFormProps) => {
  const entityType = useWatch({
    name: "entityType",
    control: methods.control,
  });

  useEffect(() => {
    if (entityType === ENTITY_TYPES.CONTACT) {
      methods.setValue("contactEmail", methods.getValues("email"));
      methods.setValue("industry", undefined);
    } else if (entityType === ENTITY_TYPES.COMPANY) {
      methods.setValue("email", methods.getValues("contactEmail"));
      methods.setValue("phone", undefined);
    }
  }, [entityType, methods]);

  return (
    <Form className="flex flex-col gap-6 w-full max-w-96" methods={methods} onSubmit={onSubmit}>
      <RHFRadioInput
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
      <RHFTextInput required name="name" label="Name" placeholder="Enter the name" />
      {entityType === ENTITY_TYPES.CONTACT && (
        <>
          <RHFTextInput required name="email" label="Email" placeholder="Enter your email" />
          <RHFTextInput required name="phone" label="Phone Number" placeholder="Enter your phone number" />
        </>
      )}
      {entityType === ENTITY_TYPES.COMPANY && (
        <>
          <RHFTextInput required name="contactEmail" label="Contact Email" placeholder="Enter your email" />
          <RHFTextInput required name="industry" label="Industy" placeholder="Enter your industry" />
        </>
      )}
      <Button disabled={loading} type="submit" className="mt-6">
        Submit
      </Button>
      {!!error && <Typography.error className="text-center">Something went wrong, please try again!</Typography.error>}
    </Form>
  );
};
