import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { PokeList } from '../components/pokeList'
import { PokeModal } from '../components/pokeModal'
import { Grid, Stack, Pagination } from "@mui/material"

interface IPokemon {
  name: string,
  url: string,
};

// interface IResponse {
//   count: number,
//   next: string,
//   previous: any,
//   results: Array<IPokemon>
// }

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  // const [apiResponse, setApiResponse] = useState<Array<IResponse>>();
  const [allPokemon, setAllPokemon] = useState<Array<IPokemon>>([]);
  const [countPokemon, setCountPokemon] = useState<number>(0);
  // const [favPokemon, setFavPokemon] = useState<any>();
  const [pokeDetails, setPokeDetails] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then((response: any) => {
        // setApiResponse(response);
        setAllPokemon(response?.data.results);
        setCountPokemon(Math.ceil(response?.data.count / 20));
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  const openDetails = (url: string) => {
    axios
      .get(url)
      .then((response: any) => setPokeDetails(response.data) )
      .finally(() => setOpen(true) )
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handlePagination = (event: React.ChangeEvent<unknown>, page: number) => {
    const limit = 20;
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${(page-1)*limit}&limit=${limit}`)
      .then((response: any) => setAllPokemon(response?.data.results) )
  }

  return (
    <>
      {loading
        ? <span>loading!</span>
        : <div className='wrapper'>
          <Grid container rowSpacing={8} columnSpacing={4}>
            {allPokemon?.map(poke => <PokeList key={poke.name} name={poke.name} onClick={() => openDetails(poke.url)} />)}
          </Grid>
          <Stack spacing={2}>
            <Pagination count={countPokemon} onChange={handlePagination} />
          </Stack>
          
          <PokeModal open={open} handleClose={handleClose} details={pokeDetails} />
        </div>
      }
    </>
  )
}

export default Home;