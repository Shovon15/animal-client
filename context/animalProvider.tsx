"use client";

import { get } from "@/utils/fetchApi";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useCategoryContext } from "./categoryProvider";


interface DataProviderProps {
    children: ReactNode;
}

export interface Animal {
    _id: string;
    animalName: string;
    image: string;
}

type AnimalContextType = {
    animalData: Animal[];
    isAnimalDataLoading: boolean;
    animalDataReretch: (options?: RefetchOptions) => Promise<QueryObserverResult<Animal[], Error>>;
    activeCategory: string;
    setActiveCategory: (activeCategory: string) => void;
};

const initialAuthContext: AnimalContextType = {
    animalData: [],
    isAnimalDataLoading: true,
    animalDataReretch: async () => {
        return {} as QueryObserverResult<Animal[], Error>;
    },
    activeCategory: "",
    setActiveCategory: () => { },
};

export const AnimalContext = createContext<AnimalContextType>(initialAuthContext);

export const AnimalProvider = ({ children }: DataProviderProps) => {
    const [activeCategory, setActiveCategory] = useState<string>("")
    const { categoryData } = useCategoryContext();

    const {
        data: animalData = [] as Animal[],
        refetch: animalDataReretch,
        isLoading: isAnimalDataLoading,
    } = useQuery({
        queryKey: ["animalData"],
        queryFn: async () => {
            const res = await get(`/animal/${activeCategory}`);
            const data = res.data.payload?.data;

            return data as Animal[];
        },
    });

    useEffect(() => {
        if (categoryData && categoryData.length > 0) {
            setActiveCategory(categoryData[0].value); 
        }
    }, [categoryData]);

    useEffect(() => {
        if (activeCategory) {
            animalDataReretch(); 
        }
    }, [activeCategory, animalDataReretch]);

    const dataInfo = {
        animalData,
        isAnimalDataLoading,
        animalDataReretch,
        activeCategory,
        setActiveCategory
    };
    return <AnimalContext.Provider value={dataInfo}>{children}</AnimalContext.Provider>;
};

export function useAnimalContext() {
    return useContext(AnimalContext);
}
