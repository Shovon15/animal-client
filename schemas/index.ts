import * as z from "zod";

export const CategorySchema = z.object({
	categoryName: z.string().min(1, {
		message: "Category Name is required",
	}),
});

export const AnimalSchema = z.object({
	animalName: z.string().min(1, {
		message: "Animal Name is required",
	}),
	categoryName: z.string().min(1, {
		message: "Category Name is required",
	}),
	image: z.array(z.instanceof(File)),
});



