import type { createEntitySchema } from "@/schemas/entity";
import type { z } from "zod";

export type CreateEntityData = z.infer<typeof createEntitySchema>;
