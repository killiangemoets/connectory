import { ENTITY_TYPES } from "@/constants/entity";
import { MAX_CHAR_TEXT_INPUT } from "@/constants/inputs";
import { z } from "zod";

export const createEntitySchema = z
  .object({
    entityType: z.nativeEnum(ENTITY_TYPES, { required_error: "Please select an entity type" }),
    name: z
      .string({ message: "Please enter a name" })
      .max(MAX_CHAR_TEXT_INPUT, {
        message: `The text cannot have more than ${MAX_CHAR_TEXT_INPUT} characters.`,
      })
      .trim()
      .optional(),
    email: z
      .string({ message: "Please enter an email address" })
      .email({ message: "Please enter a valid email address" })
      .max(MAX_CHAR_TEXT_INPUT, {
        message: `The text cannot have more than ${MAX_CHAR_TEXT_INPUT} characters.`,
      })
      .trim()
      .optional(),
    phone: z
      .string({ message: "Please enter a phone number" })
      .max(MAX_CHAR_TEXT_INPUT, {
        message: `The text cannot have more than ${MAX_CHAR_TEXT_INPUT} characters.`,
      })
      .trim()
      .optional(),
    contactEmail: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .max(MAX_CHAR_TEXT_INPUT, {
        message: `The text cannot have more than ${MAX_CHAR_TEXT_INPUT} characters.`,
      })
      .trim()
      .optional(),
    industry: z
      .string()
      .max(MAX_CHAR_TEXT_INPUT, {
        message: `The text cannot have more than ${MAX_CHAR_TEXT_INPUT} characters.`,
      })
      .trim()
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.name || data.name.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["name"],
        message: "Please enter a name",
      });
    }
    if (data.entityType === ENTITY_TYPES.CONTACT) {
      if (!data.email || data.email.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "Please enter an email address",
        });
      }
      if (!data.phone || data.phone.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: "Please enter a phone number",
        });
      }
    }
    if (data.entityType === ENTITY_TYPES.COMPANY) {
      if (!data.contactEmail || data.contactEmail.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["contactEmail"],
          message: "Please enter an email address",
        });
      }
      if (!data.industry || data.industry.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["industry"],
          message: "Please enter an industry",
        });
      }
    }
  });

export const updateEntitySchema = z
  .object({
    entityType: z.nativeEnum(ENTITY_TYPES, { required_error: "Please select an entity type" }),
    id: z.string().uuid({ message: "Please enter a valid id" }),
    name: z
      .string({ message: "Please enter a name" })
      .max(MAX_CHAR_TEXT_INPUT, {
        message: `The text cannot have more than ${MAX_CHAR_TEXT_INPUT} characters.`,
      })
      .trim()
      .optional(),
    email: z
      .string({ message: "Please enter an email address" })
      .email({ message: "Please enter a valid email address" })
      .max(MAX_CHAR_TEXT_INPUT, {
        message: `The text cannot have more than ${MAX_CHAR_TEXT_INPUT} characters.`,
      })
      .trim()
      .optional(),
    phone: z
      .string({ message: "Please enter a phone number" })
      .max(MAX_CHAR_TEXT_INPUT, {
        message: `The text cannot have more than ${MAX_CHAR_TEXT_INPUT} characters.`,
      })
      .trim()
      .optional(),
    contactEmail: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .max(MAX_CHAR_TEXT_INPUT, {
        message: `The text cannot have more than ${MAX_CHAR_TEXT_INPUT} characters.`,
      })
      .trim()
      .optional(),
    industry: z
      .string()
      .max(MAX_CHAR_TEXT_INPUT, {
        message: `The text cannot have more than ${MAX_CHAR_TEXT_INPUT} characters.`,
      })
      .trim()
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.name || data.name.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["name"],
        message: "Please enter a name",
      });
    }
    if (data.entityType === ENTITY_TYPES.CONTACT) {
      if (!data.email || data.email.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "Please enter an email address",
        });
      }
      if (!data.phone || data.phone.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: "Please enter a phone number",
        });
      }
    }
    if (data.entityType === ENTITY_TYPES.COMPANY) {
      if (!data.contactEmail || data.contactEmail.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["contactEmail"],
          message: "Please enter an email address",
        });
      }
      if (!data.industry || data.industry.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["industry"],
          message: "Please enter an industry",
        });
      }
    }
  });
