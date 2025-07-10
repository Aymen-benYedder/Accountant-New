import { ASSET_IMAGES } from '@app/_utilities/constants/paths';
import { Share } from '@mui/icons-material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, ButtonGroup, Card, CardMedia } from '@mui/material';
import { useState } from 'react';

const ProductImage = ({ height }: { height: number }) => {
  const [isFavorite, setIsFavorite] = useState(true);
  const [inCart, setInCart] = useState(false);
  return (
    <Card>
      <CardMedia
        component='img'
        height={height ? height : 310}
        image={`${ASSET_IMAGES}/products/footwear.jpg`}
        alt='Footwear'
      />
      <ButtonGroup
        fullWidth
        size='large'
        variant={'text'}
        sx={{
          height: 80,
          '& .MuiButtonGroup-grouped:not(:last-of-type)': {
            border: 'none',
          },
        }}
      >
        <Button onClick={() => setIsFavorite(!isFavorite)}>
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Button>
        <Button startIcon={<Share />} />
        <Button onClick={() => setInCart(!inCart)}>
          {inCart ? <DeleteSweepIcon /> : <ShoppingCartIcon />}
        </Button>
      </ButtonGroup>
    </Card>
  );
};

export { ProductImage };
