import { Grid, Paper } from "@mui/material";
import React from "react";

interface IPokeList {
  name: string,
  onClick: () => void,
}

export const PokeList = ({ name, onClick }: IPokeList) => {
  return (
    <>
      <Grid item xs={2.3} onClick={onClick} className='pokemon'>
        <Paper>{name}</Paper>
      </Grid>
    </>
  )
};
