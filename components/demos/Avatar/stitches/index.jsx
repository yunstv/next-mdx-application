import * as Avatar from '@radix-ui/react-avatar';
import { styled } from '@stitches/react';
import { blackA, violet } from '@radix-ui/colors';

const AvatarDemo = () => (
  <Box>
    <StyledAvatar>
      <StyledImage src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&dpr=2&q=80" alt="Colm Tuite" />
      <StyledFallback delayMs={600}>CT</StyledFallback>
    </StyledAvatar>
    <StyledAvatar>
      <StyledFallback>PD</StyledFallback>
    </StyledAvatar>
  </Box>
);

const Box = styled('div', { display: 'flex', gap: 20 });
const StyledAvatar = styled(Avatar.Root, {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  verticalAlign: 'middle', overflow: 'hidden', userSelect: 'none',
  width: 45, height: 45, borderRadius: '100%', backgroundColor: blackA.blackA3,
});
const StyledImage = styled(Avatar.Image, {
  width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit',
});
const StyledFallback = styled(Avatar.Fallback, {
  width: '100%', height: '100%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  backgroundColor: 'white', color: violet.violet11, fontSize: 15, lineHeight: 1, fontWeight: 500,
});

export default AvatarDemo;
