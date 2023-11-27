import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import Countries from "../countries.json";

type CharWithId = {
  char: string;
  id: string;
}

export const Playground = () => {
  const [animationParent] = useAutoAnimate();
  const [capital, setCapital] = useState("");
  const [country, setCountry] = useState("");
  const [charsArray, setCharsArray] = useState<CharWithId[]>([]);

  useEffect(() => {
    if (capital === charsArray.map(i => i.char).join("")) {
      const country = getRandomItem(Countries.filter(i => i.CapitalName.length < 9));
      setCapital(country.CapitalName);
      setCountry(country.CountryName);
      setCharsArray(shuffleArray(country.CapitalName.split("").map((char, index) => ({ char, id: index + char + index }))));
    }
  }, [capital, charsArray]);

  const renderedCards = useMemo(() => charsArray.map((char) => {
    return <div key={char.id} onClick={() => {
      setCharsArray(old => moveToFirst(old, char));
    }}><Paper elevation={4} sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }} ><Typography variant="h4">{char.char}</Typography></Paper></div>
  }), [charsArray]);

  return (
    <Box ref={animationParent}>
      {country}
      {renderedCards}
    </Box>
  );
}

// function that return random item from array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function moveToFirst(input: CharWithId[], item: CharWithId) {
  if (input.includes(item)) {
    const newArray = [...input].filter(i => i.id !== item.id);
    newArray.unshift(item);
    return newArray;
  } else {
    return [item, ...input];
  }
}

// function that return shuffled array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
