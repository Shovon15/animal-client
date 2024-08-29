'use client'
import { InputModal } from "@/components/customModal/inputModal";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { UploadCategoryForm } from "./_components/uploadCategoryForm";
import { UploadAnimalForm } from "./_components/uploadAnimalForm";
import { useCategoryContext } from "@/context/categoryProvider";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/utils/fetchApi";
import Spinner from "@/components/spinner";
import Image from "next/image";
import { useAnimalContext } from "@/context/animalProvider";




const ClientPage = () => {
  const [animalModalOpen, setAnimalModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { categoryData } = useCategoryContext();
  const { animalData, activeCategory, setActiveCategory, isAnimalDataLoading } = useAnimalContext();

  return (
    <div className="max-w-screen-2xl mx-auto p-5 md:p-10 w-full justify-between items-center flex flex-col">
      <div className="w-full flex flex-col-reverse gap-2 md:flex-row justify-between">
        <div className="flex gap-2">
          {
            categoryData.length > 0 &&
            <div className="flex flex-wrap gap-2">
              {categoryData.map((category, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="lg"
                  className={`rounded-full border-2 ${activeCategory === category.value ? 'border-green-500 text-green-500' : 'border-red-500'
                    }`}
                  onClick={() => setActiveCategory(category.value)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          }
        </div>

        <div className="flex gap-2">
          {
            categoryData.length > 0 &&
            <InputModal
              button={
                <Button variant="outline" size="lg" className="rounded-full">Add Animals</Button>
              }
              modalOpen={animalModalOpen}
              setModalOpen={setAnimalModalOpen}
              handleOpen={() => setAnimalModalOpen(true)}
              formComponent={<UploadAnimalForm setModalOpen={setAnimalModalOpen} />}
            />
          }
          <InputModal
            button={
              <Button variant="outline" size="lg" className="rounded-full">Add Category</Button>
            }
            modalOpen={categoryModalOpen}
            setModalOpen={setCategoryModalOpen}
            handleOpen={() => setCategoryModalOpen(true)}
            formComponent={<UploadCategoryForm setModalOpen={setCategoryModalOpen} />}
          />
        </div>
      </div>
      <div>
        {
          isAnimalDataLoading ? (
            <div className="h-44 flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            animalData.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-4 p-5 md:p-10">
                {animalData.map((animal, i) => (
                  <div key={i} className="p-2 border border-gray-600 rounded-lg">
                    <div className="w-32 h-32">
                      <Image src={animal.image} width={150} height={150} alt="image" className="rounded-md" />
                    </div>
                    <p className="text-white text-center">{animal.animalName}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-44 w-full flex justify-center items-center">

                <p className="text-white">No Data found</p>
              </div>
            )
          )
        }
      </div>

    </div>
  );
};

export default ClientPage;
