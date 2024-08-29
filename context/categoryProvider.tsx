"use client";

import { get } from "@/utils/fetchApi";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";


interface DataProviderProps {
    children: ReactNode;
}

export interface Category {
    _id: string;
    name: string;
    value: string;
}

type CategoryContextType = {
    categoryData: Category[];
    isCategoryDataLoading: boolean;
    refetchCategoryData: (options?: RefetchOptions) => Promise<QueryObserverResult<Category[], Error>>;
};

const initialAuthContext: CategoryContextType = {
    categoryData: [],
    isCategoryDataLoading: true,
    refetchCategoryData: async () => {
        return {} as QueryObserverResult<Category[], Error>;
    },
};

export const CategoryContext = createContext<CategoryContextType>(initialAuthContext);

export const CategoryProvider = ({ children }: DataProviderProps) => {
    const {
        data: categoryData = [] as Category[],
        refetch: refetchCategoryData,
        isLoading: isCategoryDataLoading,
    } = useQuery({
        queryKey: ["categoryData"],
        queryFn: async () => {
            const res = await get(`/Category`);
            const data = res.data.payload?.data;

            return data as Category[];
        },
    });

    const dataInfo = {
        categoryData,
        isCategoryDataLoading,
        refetchCategoryData,
    };
    return <CategoryContext.Provider value={dataInfo}>{children}</CategoryContext.Provider>;
};

export function useCategoryContext() {
    return useContext(CategoryContext);
}
