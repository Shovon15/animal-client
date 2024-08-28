import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

// import { Control } from 'react-hook-form';

type InputWrapperProsp = {
    control: any;
    name: string;
    formLabel?: string;
    placeholder: string;
    disabled?: boolean;
    required?: boolean;
    passwordShowButton?: boolean;
};
export const InputFieldWrapper = ({
    control,
    name,
    formLabel,
    placeholder,
    disabled,
    required,
    passwordShowButton,
}: InputWrapperProsp) => {
    const [passwordToggle, setPasswordToggle] = React.useState(false);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="relative w-full h-full">
                    {formLabel &&
                        <FormLabel>
                            {formLabel}
                            {required && <span className="text-red-500"> *</span>}
                        </FormLabel>
                    }
                    {passwordShowButton ? (
                        <>
                            <div onClick={() => setPasswordToggle(!passwordToggle)} className="absolute right-5 top-9">
                                {passwordToggle ? <EyeOff className="w-5 h-5 cursor-pointer" /> : <Eye className="w-5 h-5 cursor-pointer" />}
                            </div>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={disabled}
                                    placeholder={placeholder}
                                    type={passwordToggle ? "text" : "password"}
                                />
                            </FormControl>
                        </>
                    ) : (
                        <FormControl>
                            <Input
                                {...field}
                                disabled={disabled}
                                placeholder={placeholder}
                            />
                        </FormControl>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
