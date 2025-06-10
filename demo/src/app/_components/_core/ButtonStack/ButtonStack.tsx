import { Stack } from '@mui/material';

type ButtonStackProps = {
  direction?: 'horizontal' | 'vertical';
  children: React.ReactNode;
};

function ButtonStack({ direction, children }: ButtonStackProps) {
  const dir = direction === 'vertical' ? 'column' : 'row';

  return (
    <Stack direction={dir} spacing={1}>
      {children}
    </Stack>
  );
}

export { ButtonStack };
