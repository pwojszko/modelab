import { z } from "zod";

export const addSchema = z.object({
  a: z.number().min(-Infinity, "Number a is required"),
  b: z.number().min(-Infinity, "Number b is required"),
});

export const multiplySchema = z.object({
  a: z.number().min(-Infinity, "Number a is required"),
  b: z.number().min(-Infinity, "Number b is required"),
});

export const factorialSchema = z.object({
  n: z
    .number()
    .int("Must be an integer")
    .min(0, "Must be between 0 and 20")
    .max(20, "Must be between 0 and 20"),
});

export const processStringSchema = z.object({
  text: z.string().min(1, "Text is required"),
});

export const sumArraySchema = z.object({
  numbers: z.string().min(1, "Numbers are required"),
});

export const pumpParametersSchema = z.object({
  pressure: z
    .number()
    .min(0, "Pressure must be at least 0")
    .max(10, "Pressure must be at most 10"),
  flowRate: z
    .number()
    .int("Flow rate must be an integer")
    .min(0, "Flow rate must be at least 0")
    .max(500, "Flow rate must be at most 500"),
  mode: z.enum(["auto", "manual", "scheduled"], {
    required_error: "Mode is required",
  }),
  speed: z
    .number()
    .int("Speed must be an integer")
    .min(0, "Speed must be between 0 and 100")
    .max(100, "Speed must be between 0 and 100"),
});

export type AddFormData = z.infer<typeof addSchema>;
export type MultiplyFormData = z.infer<typeof multiplySchema>;
export type FactorialFormData = z.infer<typeof factorialSchema>;
export type ProcessStringFormData = z.infer<typeof processStringSchema>;
export type SumArrayFormData = z.infer<typeof sumArraySchema>;
export type PumpParametersFormData = z.infer<typeof pumpParametersSchema>;

