import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  
  const [search, setSearch] = useState('');         // Estado para la busqueda
  const [bodyParts, setBodyParts] = useState([]);   // Estado para los distintos músculos que se entrenan en cada parte del cuerpo

  useEffect(() => {
    const fetchExercisesData = async () => {                                          // Cada vez que se cargue la app
      const bodyPartsData = await fetchData(                                          // Pediremos a la api la lista de las partes  
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions); // del cuerpo que se pueden entrenar

      setBodyParts(['all', ...bodyPartsData]);                                        // Establecemos el estado de esa lista de partes
      
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {                                                  // Función de busqueda
    if (search) {                                                                     // Si existe la busqueda
      const exercisesData = await fetchData(                                          // Pedimos a la api la lista de ejercicios   
        'https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

      
      const searchedExercises = exercisesData.filter(                                 // Esta lista la filtramos para que la busqueda 
        (item) => item.name.toLowerCase().includes(search)                            // coincida con el nombre del ejercicio
        || item.target.toLowerCase().includes(search)                                 // o para que coincida con el target del ejercicio
        || item.equipment.toLowerCase().includes(search)                              // o para que contenga el equipo necesario para realizarlo
        || item.bodyPart.toLowerCase().includes(search),                              // o para coincida con la parte del cuerpo a entrenar
      );
        
      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
      
      setSearch('');                                                                  // Limpiamos la caja de busqueda
      setExercises(searchedExercises);                                                // Establecemos el estado de los ejercicios recomendados
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
        Awesome Exercises You <br /> Should Know
      </Typography>
      
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
                width: { lg: '1170px', xs: '350px' }, 
                backgroundColor: '#fff', 
                borderRadius: '40px' 
              }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button 
          className="search-btn" 
          sx={{ bgcolor: '#FF2625', 
                color: '#fff', 
                textTransform: 'none', 
                width: { lg: '173px', xs: '80px' }, 
                height: '56px', 
                position: 'absolute', 
                right: '0px', 
                fontSize: { lg: '20px', xs: '14px' } 
              }} 
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
      
        <HorizontalScrollbar 
          data={bodyParts}                        // Lista de las partes del cuerpo
          bodyParts                               // Estado para las partes del cuerpo
          bodyPart={bodyPart}                     // Estado para la parte del cuerpo que se va a entrenan (seleccionada)('all' por defecto)
          setBodyPart={setBodyPart}               // Función que modifica el estado de la parte del cuerpo a entrenar 
        />

      </Box>

    </Stack>
  );
};

export default SearchExercises;