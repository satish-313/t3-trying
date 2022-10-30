import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getOptionsForVote } from "../utils/getRandomPokemon";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [ids, setIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;
  const pokemon1 = trpc.getPokemonById.useQuery({ id: first });
  const pokemon2 = trpc.getPokemonById.useQuery({ id: second });

  if (pokemon1.isLoading || pokemon2.isLoading) return null;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl">Which Pokemon is rounded</div>
      <div className="p-3"></div>
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="h-48 w-48 flex flex-col items-center">
          <img src={pokemon1.data?.sprites.front_default as string} alt="" className="w-full"/>
          <div className="text-xl capitalize mt-[-2rem]">{pokemon1.data?.name}</div>
        </div>
        <div className="p-8">Vs</div>
        <div className="h-48 w-48 flex flex-col items-center">
          <img src={pokemon2.data?.sprites.front_default as string} alt="" className="w-full "/>
          <div className="text-xl capitalize mt-[-2rem]">{pokemon2.data?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
