import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { PokeList } from '../components/pokeList'
import { Card, CardContent, CardMedia } from '@mui/material'

interface IPokemon {
  name: string,
  url: string,
};

interface IResponse {
  count: number,
  next: string,
  previous: any,
  results: Array<IPokemon>
}

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [apiResponse, setApiResponse] = useState<Array<IResponse>>();
  const [allPokemon, setAllPokemon] = useState<Array<IPokemon>>([]);
  const [favPokemon, setFavPokemon] = useState<any>();

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then((response: any) => {
        setApiResponse(response);
        setAllPokemon(response?.data.results);
      })
      .finally(() => {
        setLoading(false);
      })

    axios
      .get('https://pokeapi.co/api/v2/pokemon/scyther')
      .then((response: any) => {
        setFavPokemon(response.data);
      })
  }, [])

  return (
    <>
      {loading
        ? <span>loading!</span>
        : <>
          {/* {allPokemon?.map(poke => <PokeList key={poke.name} name={poke.name} url={poke.url} />)} */}
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              width="194"
              image={favPokemon?.sprites?.other['official-artwork']?.front_default}
              alt="favorite pokemon"
            />
            <CardContent>
              {favPokemon.name}
            </CardContent>
          </Card>
        </>
      }
    </>
  )
}

export default Home;