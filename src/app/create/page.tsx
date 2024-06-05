"use client";

import { ENTITY_TYPES } from "../../constants/entity";
import { Form } from "@/components/rhf/form";
import { RHFRadioInput } from "@/components/rhf/inputs/radio";
import { RHFTextInput } from "@/components/rhf/inputs/text";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { CREATE_ENTITY, GET_ENTITIES } from "@/graphql/entities";
import { createEntitySchema } from "@/schemas/entity";
import type { CreateEntityData } from "@/types/entity";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

export default function Create() {
  const router = useRouter();
  const [mutateFunction, { loading, error }] = useMutation(CREATE_ENTITY, {
    refetchQueries: [{ query: GET_ENTITIES }],
    onCompleted: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const methods = useForm<CreateEntityData>({
    resolver: zodResolver(createEntitySchema),
    defaultValues: {
      entityType: ENTITY_TYPES.CONTACT,
    },
  });

  function onSubmit(values: CreateEntityData) {
    mutateFunction({
      variables: {
        input: values,
      },
    });
  }

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
    <div className="flex justify-center">
      <Form className="space-y-8 w-full max-w-96" methods={methods} onSubmit={onSubmit}>
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
        <Button disabled={loading} type="submit">
          Submit
        </Button>
        {!!error && <Typography.note>{error.message}</Typography.note>}
      </Form>
    </div>
  );
}
