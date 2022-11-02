import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { getOptionsForVote } from "../utils/getRandomPokemon";
import { trpc } from "../utils/trpc";

const btn =
  "px-2.5 py-1.5 border border-gray-500 shadow-sm text-xs font-medium bg-blue-400 rounded-lg text-gray-800";

const Home: NextPage = () => {
  const [ids, setIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;
  const pokemon1 = trpc.getPokemonById.useQuery({ id: first });
  const pokemon2 = trpc.getPokemonById.useQuery({ id: second });

  if (pokemon1.isLoading || pokemon2.isLoading) return null;

  const voteForRoundest = (selected: number) => {
    setIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl">Which Pokemon is rounded</div>
      <div className="p-3"></div>
      <div className="border rounded p-10 flex justify-between items-center max-w-2xl">
        {!pokemon1.isLoading &&
          pokemon1.data &&
          !pokemon2.isLoading &&
          pokemon2.data && (
            <>
              <PokemonListing
                pokemon={pokemon1}
                vote={() => voteForRoundest(first)}
              />
              <div className="p-8">Vs</div>
              <PokemonListing
                pokemon={pokemon2}
                vote={() => voteForRoundest(second)}
              />
            </>
          )}
      </div>
    </div>
  );
};

export default Home;

const PokemonListing: React.FC<{ pokemon:any ; vote: () => void }> = ({
  pokemon,
  vote,
}) => {
  return (
    <div className="h-48 w-48 flex flex-col items-center">
      <img
        src={pokemon.data?.sprites.front_default as string}
        alt=""
        className="w-full"
      />
      <div className="text-xl capitalize mt-[-2rem] pb-2">
        {pokemon.data?.name}
      </div>
      <button className={btn} onClick={() => vote()}>
        Rounder
      </button>
    </div>
  );
};
