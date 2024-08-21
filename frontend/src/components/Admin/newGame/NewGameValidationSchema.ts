import { z } from "zod";
export const schema = z.object({
  gameName: z.string().min(3, {
    message: "Name is required and must be at least 3 characters long",
  }),
  publisherName: z.string().min(3, {
    message:
      "Publisher name is required and must be at least 3 characters long",
  }),
  releaseDate: z.string().min(3, { message: "Release date is required" }),
  price: z.number().min(1, { message: "Price must be at least 1" }),
  salePrice: z.number().optional(),
  gameImage: z
    .union([
      z.array(z.instanceof(File)).min(1, { message: "Image is required" }),
      z.string(),
    ])
    .refine(
      (file) =>
        (Array.isArray(file) && file.length > 0) || typeof file === "string",
      {
        message: "A valid image file is required",
      }
    ),
  platform: z
    .array(z.string())
    .nonempty({ message: "Select at least one platform" }),
  genre: z.array(z.string()).nonempty({ message: "Select at least one genre" }),
  screenshots: z
    .array(z.instanceof(File))
    .min(1, "Please upload at least one image")
    .max(20, "You can upload up to 20 images"),
  gameDescription: z.string().min(10, { message: "Description is required" }),
  // systemRequirements: z.object({
  //   recommended: z.object({
  //     OS: z.string().optional(),
  //     processor: z.string().optional(),
  //     memory: z.string().optional(),
  //     graphics: z.string().optional(),
  //     storage: z.string().optional(),
  //   }),
  //   minimum: z.object({
  //     os: z.string({ required_error: "OS is required" }),
  //     processor: z.string({ required_error: "Processor is required" }),
  //     memory: z.string({ required_error: "Memory is required" }),
  //     graphics: z.string({ required_error: "Graphics is required" }),
  //     storage: z.string({ required_error: "Storage is required" }),
  //   }),
  // }),
});

export type GameData = z.infer<typeof schema>;
