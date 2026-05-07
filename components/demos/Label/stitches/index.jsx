import * as Label from '@radix-ui/react-label';
import { styled } from '@stitches/react';

const LabelDemo = () => (
  <Wrap>
    <StyledLabel htmlFor="firstName">First name</StyledLabel>
    <Input type="text" id="firstName" defaultValue="Pedro Duarte" />
  </Wrap>
);

const Wrap = styled('div', { display: 'flex', flexDirection: 'column', gap: 10 });
const StyledLabel = styled(Label.Root, {
  fontSize: 15, fontWeight: 500, lineHeight: '35px', color: 'white',
});
const Input = styled('input', {
  all: 'unset', width: 200, padding: '0 10px', height: 35, borderRadius: 4,
  fontSize: 15, lineHeight: 1, color: 'white',
  backgroundColor: 'rgba(255,255,255,0.4)',
});

export default LabelDemo;
