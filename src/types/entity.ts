import type { createEntitySchema, updateEntitySchema } from "@/schemas/entity";
import type { z } from "zod";

export type CreateEntityData = z.infer<typeof createEntitySchema>;
export type UpdateEntityData = z.infer<typeof updateEntitySchema>;
