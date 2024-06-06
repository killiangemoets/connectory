"use client";

import { EntityForm } from "@/components/entity-form";
import { ENTITY_TYPES } from "@/constants/entity";
import { GET_ENTITIES, UPDATE_ENTITY } from "@/graphql/entities";
import { updateEntitySchema } from "@/schemas/entity";
import type { UpdateEntityData } from "@/types/entity";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const EditEntityForm = () => {
  const router = useRouter();
  // const [updateEntityMutation, { loading, error }] = useMutation<{ createEntity: Entity }, MutationUpdateEntityArgs>(UPDATE_ENTITY, {
  const [updateEntityMutation, { loading, error }] = useMutation(UPDATE_ENTITY, {
    refetchQueries: [{ query: GET_ENTITIES }],
    onCompleted: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const methods = useForm<UpdateEntityData>({
    resolver: zodResolver(updateEntitySchema),
    defaultValues: {
      entityType: ENTITY_TYPES.CONTACT,
    },
  });

  function onSubmit(data: UpdateEntityData) {
    updateEntityMutation({
      variables: {
        input: data,
      },
    });
  }

  return (
    <div className="flex justify-center">
      <EntityForm
        methods={methods}
        onSubmit={onSubmit}
        loading={loading}
        error={!!error ? "Something went wrong, please try again!" : undefined}
      />
    </div>
  );
};

export default function Edit() {
  return (
    <div className="flex justify-center">
      <EditEntityForm />
    </div>
  );
}
