import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';

import { FeaturedCard3 } from '@app/_components/cards';
import { ASSET_IMAGES } from '@app/_utilities/constants/paths';
import { Div } from '@jumbo/shared';

const activeStyle = {
  bgcolor: '#F5F7FA',
  color: 'primary.main',

  '&:hover': {
    bgcolor: '#F5F5F5',
  },
};
const defaultStyle = { color: 'common.white', bgcolor: 'transparent' };

const UpgradePlan = () => {
  const [isMonthlyPlan, setIsMonthlyPlan] = useState(true);
  return (
    <FeaturedCard3
      bgcolor={['-135deg', '#E44A77', '#7352C7']}
      textColor='common.white'
      avatar={
        <Stack alignItems={'center'}>
          <Stack
            direction={'row'}
            spacing={1}
            sx={{ justifyContent: 'center', mb: 3 }}
          >
            <Button
              disableElevation
              variant={'contained'}
              size={'small'}
              onClick={() => setIsMonthlyPlan(true)}
              sx={isMonthlyPlan ? activeStyle : defaultStyle}
            >
              Monthly
            </Button>
            <Button
              disableElevation
              color={'primary'}
              variant={'contained'}
              size={'small'}
              sx={!isMonthlyPlan ? activeStyle : defaultStyle}
              onClick={() => setIsMonthlyPlan(false)}
            >
              Yearly
            </Button>
          </Stack>
          <Div sx={{ mb: 3 }}>
            <img
              src={`${ASSET_IMAGES}/pet-insurance.png`}
              alt={'Pet Insurance'}
              width={102}
              height={102}
            />
          </Div>
        </Stack>
      }
      title={isMonthlyPlan ? '$25/Month' : '$250/Year'}
      subheader={'Upgrade today'}
    />
  );
};

export { UpgradePlan };
