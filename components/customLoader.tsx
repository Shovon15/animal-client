"use client"

import { useCategoryContext } from "@/context/categoryProvider";
// import { useAuth } from "@/context/authProvider";
import BounceLoader from "react-spinners/BounceLoader";
import Spinner from "./spinner";
import ClipLoader from "react-spinners/ClipLoader";

type CustomPros = {
    children: React.ReactNode
}

export const Custom = ({ children }: CustomPros) => {

    const { isCategoryDataLoading } = useCategoryContext();

    return (
        <>
            {
                isCategoryDataLoading ?
                    <div className="flex justify-center items-center min-h-screen">
                        <ClipLoader
                            color="#000000"
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                    :
                    <>{children}</>

            }
        </>
    )

}
