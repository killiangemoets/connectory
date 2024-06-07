import type { createEntitySchema, updateEntitySchema } from "@/schemas/entity";
import type { Company, Contact } from "@/types/generated/graphql";
import type { z } from "zod";

export type CreateEntityData = z.infer<typeof createEntitySchema>;
export type UpdateEntityData = z.infer<typeof updateEntitySchema>;

export type Entity = Contact | Company;
