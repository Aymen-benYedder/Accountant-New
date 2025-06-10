import { ASSET_IMAGES } from '@app/_utilities/constants/paths';
import { JumboCard } from '@jumbo/components';
import { JumboOverlay } from '@jumbo/components/JumboOverlay';
import { Div } from '@jumbo/shared';
import { CloudOutlined } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

export function CityBgCard() {
  return (
    <JumboCard bgimage={`${ASSET_IMAGES}/cities-bg.png`} sx={{ height: 125 }}>
      <JumboOverlay
        margin={24}
        opacity={0}
        vAlign={'center'}
        sx={{ color: 'common.white' }}
      >
        <Stack
          direction={'row'}
          spacing={3}
          justifyContent={'space-around'}
          alignItems={'center'}
        >
          <div className={'Stack-item'}>
            <Typography variant={'body1'} fontSize={'12px'} mb={0.25}>
              Friday, 28 Sep
            </Typography>
            <Typography
              variant={'h2'}
              fontSize={'38px'}
              color={'inherit'}
              mb={0}
            >
              01:15 PM
            </Typography>
            <Typography variant={'body1'} fontSize={'12px'}>
              San Francisco
            </Typography>
          </div>
          <Div className={'Stack-item'} sx={{ display: 'flex' }}>
            <CloudOutlined sx={{ fontSize: '80px', mr: 3 }} />
            <div>
              <Typography
                variant={'h2'}
                fontSize={'38px'}
                color={'inherit'}
                mb={0.5}
                sx={{
                  '& sup': {
                    position: 'relative',
                    fontSize: '60%',
                    top: '-10px',
                  },
                }}
              >
                23<sup>&#x26AC;</sup>
              </Typography>
              <Typography variant={'body1'} fontSize={'12px'}>
                Thunder strom
              </Typography>
            </div>
          </Div>
        </Stack>
      </JumboOverlay>
    </JumboCard>
  );
}
