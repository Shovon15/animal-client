"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Custom } from "@/components/customLoader";
import { CategoryProvider } from "@/context/categoryProvider";
import { Toaster } from "@/components/ui/toaster";
import { AnimalProvider } from "@/context/animalProvider";



interface ProviderProps {
	children: React.ReactNode;
}

const queryClient = new QueryClient();


export const RootProviders = ({ children }: ProviderProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<CategoryProvider>
				<AnimalProvider>
					<Custom>
						{children}
						<Toaster />
					</Custom>
				</AnimalProvider>
			</CategoryProvider>
		</QueryClientProvider>
	);
};
