import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

const Exercises = ({ exercises, setExercises, bodyPart }) => { // Ejercicios recomendados, y parte del cuerpo seleccionada

  const [currentPage, setCurrentPage] = useState(1);  // Estados para la paginación
  const [exercisesPerPage] = useState(6);

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === 'all') {                                                                               // Si la parte del cuerpo seleccionada='all'
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);      // Petición a api de todos los ejercicios disp
      } else {                                                                                                // Sino, es decir, bodyPart es otra cosa    
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);// petición a api de los 
      }                                                                                                       // ejercicios efectivos para ese bodypart

      setExercises(exercisesData); // Se establece el estado de exercises con la respuesta
    };

    fetchExercisesData();
  }, [bodyPart]);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;                           // 1 * 6 = al índice del último ejercicio
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;                  // 6 - 6 = al índice del primer ejercicio
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);  // de exercises[] seleccionamos los elementos entre index 1º y final

  const paginate = (event, value) => {                            // Paginate determina que grupo de páginas que se esta visualizando. Al iniciar es= 1
    setCurrentPage(value);                                        // El value es generado por el componente de MUI Pagination
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  if (!currentExercises.length) return <Loader />;

  return (
    <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
      
      <Typography 
        variant="h4" 
        fontWeight="bold" 
        sx={{ fontSize: { lg: '44px', xs: '30px' } }} 
        mb="46px">
          Showing Results
      </Typography>

      <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
        {currentExercises.map((exercise, idx) => (        // Los ejercicios que se muestran según la paginación se mapean y se
          <ExerciseCard key={idx} exercise={exercise} />  // envian a ExerciseCard
        ))}
      </Stack>

      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {exercises.length > 9 && (
          <Pagination           // Este elemento de MUI muestra la paginación de todos los exercisesData. Onchange -> Paginate -> setCurrentPage -> currentExercises -> map
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)} // Redondeamos el número de rdos a mostrar por página
            page={currentPage}  // page es grupo de páginas que se esta mostrando. Al iniciar la app = 1
            onChange={paginate} // Cuando se cambia de grupo de páginas se llama a la función paginate -> setCurrentPage con el value generado en este evento
            size="large"
          />
        )}
      </Stack>

    </Box>
  );
};

export default Exercises;