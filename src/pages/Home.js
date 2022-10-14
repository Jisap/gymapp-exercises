import React, { useState } from 'react';
import { Box } from '@mui/material';
import HeroBanner from '../components/HeroBanner';
import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';

const Home = () => {

  const [exercises, setExercises] = useState([]);  // Estado para los ejercicios que entrenan las distintas partes del cuerpo 
  const [bodyPart, setBodyPart] = useState('all'); // Estado para la parte del cuerpo a entrenar (seleccionada)

  return (
    <Box>
      <HeroBanner />
      <SearchExercises 
        setExercises={setExercises} 
        bodyPart={bodyPart} 
        setBodyPart={setBodyPart} 
      />
      <Exercises 
        setExercises={setExercises} 
        exercises={exercises} 
        bodyPart={bodyPart} 
      />
    </Box>
  )
}

export default Home