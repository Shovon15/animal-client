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



type Props = {
    setModalOpen: (modalOpen: boolean) => void;
    // refetch: () => Promise<QueryObserverResult<any, unknown>>;
}


export const UploadAnimalForm = ({ setModalOpen }: Props) => {

    const [loading, setLoading] = useState<boolean>(false)

    // const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof AnimalSchema>>({
        resolver: zodResolver(AnimalSchema),
        defaultValues: {
            animalName: "",
            categoryName: "",
            image: [],
        },
    });

    const onSubmit = async (values: z.infer<typeof AnimalSchema>) => {

        const formData = {
            animalName: values.animalName,
            categoryName: values.categoryName,
            image: values.image
        };

        try {
            setLoading(true)
            // const res = await post("/category", formData);
            // const successMessage = res.data.message || "category create succssfully"
            // toast({ title: successMessage });
            // router.push("/dashboard/category");
            console.log(formData, "formData")
            setModalOpen(false)

        } catch (error: any) {
            console.log(error, "error")
            // const errorMessage = error.response.data.message || "An error occurred while updating category"
            // toast({ title: errorMessage });
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


