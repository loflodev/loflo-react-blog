import { useEffect, useState } from "react";

type Props = number[]

export const useResponsive = (breakpoints:Props) => {
 const [index, setIndex] = useState(0);

 useEffect(() => {
   const updateIndex = () => {
    const width = window.innerWidth;
    const newIndex = breakpoints.findIndex((bp) => width <= bp);
    setIndex(newIndex  === -1 ? breakpoints.length : newIndex)
   }
   updateIndex();
   window.addEventListener("resize", updateIndex);
   return () => window.addEventListener("resize", updateIndex);
 }, [breakpoints]);
  return index ;
};

