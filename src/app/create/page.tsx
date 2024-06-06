"use client";

import { ENTITY_TYPES } from "../../constants/entity";
import { EntityForm } from "@/components/entity-form";
import { CREATE_ENTITY, GET_ENTITIES } from "@/graphql/entities";
import { createEntitySchema } from "@/schemas/entity";
import type { CreateEntityData } from "@/types/entity";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateEntityForm = () => {
  const router = useRouter();
  // const [createEntityMutation, { loading, error }] = useMutation<{ createEntity: Entity }, MutationCreateEntityArgs>(CREATE_ENTITY, {
  const [createEntityMutation, { loading, error }] = useMutation(CREATE_ENTITY, {
    refetchQueries: [{ query: GET_ENTITIES }],
    onCompleted: () => {
      toast.success("New connection created!", {
        duration: 5000,
        style: {
          fontWeight: 600,
        },
      });
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

  function onSubmit(data: CreateEntityData) {
    createEntityMutation({
      variables: {
        input: data,
      },
    });
  }

  // const entityType = useWatch({
  //   name: "entityType",
  //   control: methods.control,
  // });

  // useEffect(() => {
  //   if (entityType === ENTITY_TYPES.CONTACT) {
  //     methods.setValue("contactEmail", methods.getValues("email"));
  //     methods.setValue("industry", undefined);
  //   } else if (entityType === ENTITY_TYPES.COMPANY) {
  //     methods.setValue("email", methods.getValues("contactEmail"));
  //     methods.setValue("phone", undefined);
  //   }
  // }, [entityType, methods]);

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

export default function Create() {
  return (
    <div className="flex justify-center">
      <CreateEntityForm />
    </div>
  );
}
