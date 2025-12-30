import { ZodTypeAny} from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodTypeAny, property: "body" | "query" | "params") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[property]);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.format(),
      });
    }

    req[property] = result.data; 
    next();
  };
