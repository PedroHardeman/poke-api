import React from "react";

interface IPokeList {
  name: string,
  url: string,
}

export const PokeList = ({ name, url }: IPokeList) => {
  return (
    <div>{name}</div>
  )
};
