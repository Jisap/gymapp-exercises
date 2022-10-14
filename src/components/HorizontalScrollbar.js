import React, { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Box, Typography } from '@mui/material';

import ExerciseCard from './ExerciseCard';
import BodyPart from './BodyPart';
import RightArrowIcon from '../assets/icons/right-arrow.png';
import LeftArrowIcon from '../assets/icons/left-arrow.png';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);
  
  return (
    <Typography 
      onClick={() => scrollPrev()} 
      className="right-arrow"
    >
      <img src={LeftArrowIcon} alt="left-arrow" />
    </Typography>
  );
};


const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography  
      onClick={() => {scrollNext()}} 
      className="left-arrow"
    >
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};


const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => ( // 
 
  <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
    {data.map((item) => (                                                     // La lista de partes del cuerpo se mapea
      <Box                                                                    // por cada parte generaremos un box
        key={item.id || item}                                                 // que contendrá su nombre y un mismo icono (GYM)
        itemId={item.id || item}
        title={item.id || item}
        m="0 40px"
      >
        {bodyParts                                                                    // Si las partes del cuerpo existen
            ?    //item renderizado // Estado para la parte del cuerpo seleccionada
              <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />  // mostramos <BodyPart />
            : <ExerciseCard exercise={item} />                                        // Sino <exerciseCard />
        }
      </Box>
    ))}
  </ScrollMenu>
  
);

export default HorizontalScrollbar;