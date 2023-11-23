import React, { useState } from "react";

import { DogCard } from "./DogCard";
import { Grid } from "@mui/material";
import { DogModal } from "./DogModal";

export const DogList = ({ dogs }) => {
  // return Dogs.map((dog) => <DogCard key={dog.id} {...dog} />);

  const [selectedDog, setSelectedDog] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (dog) => {
    setSelectedDog(dog);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        {dogs?.map((dog) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={dog.id}>
            <DogCard {...dog} handleOpenModal={handleOpenModal} />
          </Grid>
        ))}
      </Grid>
      {openModal && (
        <DogModal
          dog={selectedDog}
          isOpen={openModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
