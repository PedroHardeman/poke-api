import { Card, CardContent, CardMedia, Dialog } from "@mui/material";
import React from "react";

interface IPokeModal {
  open: boolean,
  details: any,
  handleClose: () => void,
}

export const PokeModal = ({ open, handleClose, details }: IPokeModal) => {
  return (
	<Dialog open={open} onClose={handleClose}>
		<Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              width="194"
              image={details?.sprites?.other['official-artwork']?.front_default}
              alt="favorite pokemon"
            />
            <CardContent>
              {details?.name}
            </CardContent>
          </Card>
	</Dialog>
    
  )
};
