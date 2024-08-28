"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";


type DialogProp = {
    button: React.ReactNode;
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
    handleOpen: () => void;
    formComponent?: React.ReactNode;
};

export const InputModal = ({ modalOpen, setModalOpen, handleOpen, button, formComponent }: DialogProp) => {

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen} >
            <DialogTrigger asChild>
                <div onClick={handleOpen}>
                    {button}
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] p-5 bg-secondary mx-auto">
                <DialogTitle className="hidden"></DialogTitle>
                <DialogDescription className="hidden"></DialogDescription>
                {formComponent}
            </DialogContent>
        </Dialog>
    );
};
