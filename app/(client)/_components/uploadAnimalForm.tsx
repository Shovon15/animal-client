"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
// import { QueryObserverResult } from "@tanstack/react-query";


import { useRouter } from "next/navigation";
import { InputFieldWrapper } from "@/components/formFieldWrapper/inputFieldWrapper";
import Spinner from "@/components/spinner";
import { AnimalSchema } from "@/schemas";
import { SelectFieldWrapper } from "@/components/formFieldWrapper/selectFieldWrapper";
import { ImageFieldWrapper } from "@/components/formFieldWrapper/imageFieldWrapper";
import { post } from "@/utils/fetchApi";
import { useToast } from "@/components/ui/use-toast";
import { toBase64 } from "@/utils/toBase64";
import cloudinaryImageUploader from "@/utils/cloudinaryImageUploader";
import { useAnimalContext } from "@/context/animalProvider";



type Props = {
    setModalOpen: (modalOpen: boolean) => void;
    // refetch: () => Promise<QueryObserverResult<any, unknown>>;
}


export const UploadAnimalForm = ({ setModalOpen }: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const { animalDataReretch } = useAnimalContext();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof AnimalSchema>>({
        resolver: zodResolver(AnimalSchema),
        defaultValues: {
            animalName: "",
            categoryName: "",
            image: [],
        },
    });


    const onSubmit = async (values: z.infer<typeof AnimalSchema>) => {
        if (!values.image || values.image.length === 0) {
            toast({ title: "at least one Image is required" });
            return;
        }
        try {
            setLoading(true)
            const selectedImage = values.image[0];

            const imageData = await cloudinaryImageUploader(selectedImage);
            if (!imageData) {
                toast({ title: "error uploading image" })
                return;
            }

            const { animalName, categoryName } = values;

            const formData = {
                animalName: animalName,
                categoryName: categoryName,
                image: imageData.url,
            };


            const res = await post("/animal", formData);
            const successMessage = res.data.message || "New animal created"
            toast({ title: successMessage });
            animalDataReretch();
            setModalOpen(false)

        } catch (error: any) {
            console.log(error, "error")
            const errorMessage = error.response.data.message || "An error occurred while updating animal"
            toast({ title: errorMessage });
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-56 p-5">
            <p className="text-xl font-semibold py-3">Add Animal</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
                    <div className="space-y-6  h-full w-full flex flex-col items-center justify-center min-h-28 max-w-96 pb-3">
                        <InputFieldWrapper
                            control={form.control}
                            name="animalName"
                            placeholder="name"
                            required={true}
                        />
                        <SelectFieldWrapper
                            control={form.control}
                            name="categoryName"
                            formLabel="Category"
                            required={true}
                        />
                        <ImageFieldWrapper
                            control={form.control}
                            name="image"
                            formLabel="Images"
                            required={true}
                        />
                        {/* {
                            imageError !== "" && (
                                <p>{imageError}</p>
                            )
                        } */}
                    </div>
                    <Button
                        type="submit"
                        className="mx-auto w-full max-w-96"
                    >
                        {loading ? <Spinner /> : "Save"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};


