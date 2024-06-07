"use client";

import { EntityForm } from "@/components/entity-form";
import { Typography } from "@/components/typography";
import { ENTITY_TYPES } from "@/constants/entity";
import { GET_ENTITIES, GET_ENTITY_BY_ID, UPDATE_ENTITY } from "@/graphql/entities";
import { updateEntitySchema } from "@/schemas/entity";
import type { Entity, UpdateEntityData } from "@/types/entity";
import type { GetEntityQuery, UpdateEntityMutation } from "@/types/generated/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditEntityForm = ({ entity }: { entity: Entity }) => {
  const router = useRouter();
  const [updateEntityMutation, { loading, error }] = useMutation<UpdateEntityMutation>(UPDATE_ENTITY, {
    refetchQueries: [{ query: GET_ENTITIES }],
    onCompleted: () => {
      toast.success("Connection updated!", {
        duration: 5000,
        style: {
          fontWeight: 600,
        },
      });
      router.push("/");
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const methods = useForm<UpdateEntityData>({
    resolver: zodResolver(updateEntitySchema),
    defaultValues: {
      entityType: entity.__typename === "Contact" ? ENTITY_TYPES.CONTACT : ENTITY_TYPES.COMPANY,
      id: entity.id,
      name: entity.name,
      ...(entity.__typename === "Contact" && {
        email: entity?.email ?? "",
        phone: entity?.phone ?? "",
      }),
      ...(entity.__typename === "Company" && {
        industry: entity.industry ?? "",
        contactEmail: entity.contactEmail ?? "",
      }),
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
    <EntityForm
      methods={methods}
      onSubmit={onSubmit}
      loading={loading}
      error={!!error ? "Something went wrong, please try again!" : undefined}
    />
  );
};

export default function Edit() {
  const { id } = useParams<{ id: string }>();
  const {
    loading,
    error,
    data: getEntityByIdQuery,
  } = useQuery<GetEntityQuery>(GET_ENTITY_BY_ID, {
    variables: { id },
  });

  if (loading) return <Typography.body className="text-center pt-24">Loading...</Typography.body>;
  if (error) return <Typography.error className="text-center pt-24">Something went wrong, please try again!</Typography.error>;

  const entity = getEntityByIdQuery?.getEntity;
  if (!entity) return <Typography.error className="text-center pt-24">No connection found</Typography.error>;

  return (
    <div className="flex justify-center w-full">
      <EditEntityForm entity={entity} />
    </div>
  );
}
