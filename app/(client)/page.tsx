'use client'
import { InputModal } from "@/components/customModal/inputModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UploadCategoryForm } from "./_components/uploadCategoryForm";
import { UploadAnimalForm } from "./_components/uploadAnimalForm";


const ClientPage = () => {
  const [animalModalOpen, setAnimalModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  
  return (
    <div className="max-w-screen-2xl mx-auto p-5 md:p-10 flex justify-between items-center">
      <div className="flex gap-2">
        <Button variant="outline" size="lg" className="rounded-full border-green-500">Add Animals</Button>
        <Button variant="outline" size="lg" className="rounded-full border-red-500">Horse</Button>
        <Button variant="outline" size="lg" className="rounded-full border-red-500">Bird</Button>
      </div>

      <div className="flex gap-2">
        <InputModal
          button={
            <Button variant="outline" size="lg" className="rounded-full">Add Animals</Button>
          }
          modalOpen={animalModalOpen}
          setModalOpen={setAnimalModalOpen}
          handleOpen={() => setAnimalModalOpen(true)}
          formComponent={<UploadAnimalForm setModalOpen={setAnimalModalOpen} />}
        />

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
  );
};

export default ClientPage;
