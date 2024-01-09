import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation.pipe";

export const pageQueryParamSchema =  z.string().optional().default('1').transform(Number).pipe(z.number().min(1))
export type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>