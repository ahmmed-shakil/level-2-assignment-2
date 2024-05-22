import { z } from "zod";

const variantValidationSchema = z.object({
  type: z.string({
    required_error: "Product variant type is required",
    invalid_type_error: "Product variant type must be a string",
  }),
  value: z.string({
    required_error: "Product variant value is required",
    invalid_type_error: "Product variant value must be a string",
  }),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number({
      required_error: "Product inventory quantity is required",
      invalid_type_error: "Product inventory quantity must be a number",
    })
    .min(0, "Product inventory quantity can not be negative"),
  inStock: z
    .boolean()
    .default(true)
    .refine(
      (val) => typeof val === "boolean",
      "Product stock information is required",
    ),
});

const productValidationSchema = z.object({
  name: z
    .string({
      required_error: "Product name is required",
      invalid_type_error: "Product name must be a string",
    })
    .min(1, "Product name can not be empty")
    .trim(),
  description: z
    .string({
      required_error: "Product description is required",
      invalid_type_error: "Product description must be a string",
    })
    .min(10, "Product description should have at least 10 characters")
    .trim(),
  category: z
    .string({
      required_error: "Product category is required",
      invalid_type_error: "Product category must be a string",
    })
    .min(1, "Product category can not be empty")
    .trim(),
  price: z
    .number({
      required_error: "Product price is required",
      invalid_type_error: "Product price must be a number",
    })
    .nonnegative("Product price can not be negative")
    .min(1, "Product price can not be 0"),
  tags: z.array(z.string()).nonempty("Product tags are missing"),
  variants: z
    .array(variantValidationSchema)
    .nonempty("Product variant is required"),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
