import { ENTITY_TYPES } from "@/constants/entity";
import { MAX_CHAR_TEXT_INPUT } from "@/constants/inputs";
import { z } from "zod";

const createEntityCommonSchema = z.object({
  name: z
    .string({ message: "Please enter a name" })
    .min(1, { message: "Please enter a name" })
    .max(MAX_CHAR_TEXT_INPUT, {
      message: `The text cannot have more than ${MAX_CHAR_TEXT_INPUT} characters.`,
    })
    .trim(),
});

const createContactSchema = createEntityCommonSchema.extend({
  entityType: z.literal(ENTITY_TYPES.CONTACT, { message: "Please select an entity type" }),
  email: z
    .string({ message: "Please enter an email address" })
    .email({ message: "Please enter a valid email address" })
    .max(MAX_CHAR_TEXT_INPUT, {
      message: `The text cannot have more than ${MAX_CHAR_TEXT_INPUT} characters.`,
    })
    .trim(),
  phone: z
    .string()
    .max(MAX_CHAR_TEXT_INPUT, {
      message: `The text cannot have more than ${MAX_CHAR_TEXT_INPUT} characters.`,
    })
    .trim()
    .optional()
    .nullable(),
});
const createCompanySchema = createEntityCommonSchema.extend({
  entityType: z.literal(ENTITY_TYPES.COMPANY, { message: "Please select an entity type" }),
  contactEmail: z
    .string()
    .max(MAX_CHAR_TEXT_INPUT, {
      message: `The text cannot have more than ${MAX_CHAR_TEXT_INPUT} characters.`,
    })
    .email({ message: "Please enter a valid email address" })
    .trim()
    .or(z.literal(""))
    .optional()
    .nullable(),
  industry: z
    .string({ message: "Please enter an industry" })
    .min(1, { message: "Please enter an industry" })
    .max(MAX_CHAR_TEXT_INPUT, {
      message: `The text cannot have more than ${MAX_CHAR_TEXT_INPUT} characters.`,
    })
    .trim(),
});

const idSchema = z.string().uuid({ message: "Please enter a valid id" });

export const createEntitySchema = z.union([createContactSchema, createCompanySchema]);
export const updateEntitySchema = z.union([createContactSchema.extend({ id: idSchema }), createCompanySchema.extend({ id: idSchema })]);
