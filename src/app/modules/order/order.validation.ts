import { z } from "zod";

const orderValidationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required to create order",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email format")
    .trim(),
  productId: z.string({
    required_error: "Product Id is required",
    invalid_type_error: "Product Id must be a string",
  }),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .nonnegative("Price cannot be negative"),
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than zero"),
});

export default orderValidationSchema;
