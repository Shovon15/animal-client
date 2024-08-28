"use client";

import React, { useState } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
// import { useQuery } from "@tanstack/react-query";
// import { get } from "@/utils/fetchApi";
import Spinner from "../spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Category {
    _id: string;
    name: string;
    value: string;
    isEnabled: boolean;
}

type SelectFieldProsp = {
    control: any;
    name: string;
    formLabel?: string;
    disabled?: boolean;
    required?: boolean;
};
export const SelectFieldWrapper = ({ control, name, formLabel, disabled, required }: SelectFieldProsp) => {
    // const {
    //     data: categoryData = [] as Category[],
    //     refetch,
    //     isLoading,
    //     isError,
    // } = useQuery({
    //     queryKey: ["categoryData"],
    //     queryFn: async () => {
    //         const res = await get("/category");
    //         const data = res.data.payload?.category;

    //         return data as Category[];
    //     },
    // });

    // if (isLoading) {
    //     return (
    //         <div className="p-5">
    //             <Spinner />
    //         </div>
    //     );
    // }
    // if (isError) {
    //     return (
    //         <div className="p-5">
    //             <p className="text-destructive">something went wrong</p>
    //         </div>
    //     );
    // }
    const categoryData = [
        {
            _id: "1",
            isEnabled: true,
            value: "bird",
            name: "bird"

        },
        {
            _id: "2",
            isEnabled: true,
            value: "animal",
            name: "Animal"

        },
        {
            _id: "3",
            isEnabled: true,
            value: "fish",
            name: "Fish"

        },
    ] as Category[];
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="relative w-full h-full">
                    <div className="flex flex-col gap-3 pb-3">
                        <FormControl>
                            <Select {...field} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categoryData
                                        .filter(item => item.isEnabled)
                                        .map(item => (
                                            <SelectItem key={item._id} value={item.value}>
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
    );
};
