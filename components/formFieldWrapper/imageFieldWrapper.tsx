import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface ImageUploaderProps {
    control: any;
    name: string;
    formLabel: string;
    required?: boolean;
}

export const ImageFieldWrapper: React.FC<ImageUploaderProps> = ({
    control,
    name,
    formLabel,
    required,
}) => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const inputImageRef = useRef<HTMLInputElement>(null);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="relative w-full h-full ">
                    <FormLabel>
                        {formLabel}
                        {required && <span className="text-red-500"> *</span>}
                    </FormLabel>
                    <FormControl>
                        <>
                            <div className="flex gap-2 flex-wrap justify-center">
                                {selectedImages.length > 0 ?
                                    selectedImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col justify-center items-center hover:ring-2 p-1"
                                        >
                                            <Image
                                                src={URL.createObjectURL(image)}
                                                className="w-44 h-34 "
                                                alt={`img-${index}`}
                                                width={200}
                                                height={200}
                                                priority={true}
                                            />
                                            <Button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedImages((prevImages) =>
                                                        prevImages.filter((image, i) => i !== index)
                                                    );
                                                    const newValue = [...field.value];
                                                    newValue.splice(index, 1);
                                                    field.onChange(newValue);
                                                }}
                                                variant="ghost"
                                                className="text-red-500 rounded-full"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    )) :
                                    <div className="flex justify-center w-full">
                                        <div
                                            className="w-full max-w-96 h-10 cursor-pointer flex justify-center items-center border  border-gray-500 rounded-md"
                                            onClick={() => inputImageRef?.current?.click()}
                                        >
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="input-field"
                                                hidden
                                                onChange={(e) => {
                                                    const files = e.target.files;
                                                    if (!files) return;
                                                    const imagesArray = Array.from(files);
                                                    setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
                                                    const newValue = [...field.value, ...imagesArray];
                                                    field.onChange(newValue);
                                                }}
                                                ref={inputImageRef}
                                                multiple
                                            />
                                            <div className="flex flex-col items-center gap-2 text-color-primary">
                                                <p className="">Browse file to upload</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

