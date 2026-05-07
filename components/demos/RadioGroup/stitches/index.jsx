import * as RadioGroup from '@radix-ui/react-radio-group';
import { styled } from '@stitches/react';
import { blackA, violet } from '@radix-ui/colors';

const RadioGroupDemo = () => (
  <form>
    <StyledRoot defaultValue="default" aria-label="View density">
      {[
        { id: 'r1', value: 'default', label: 'Default' },
        { id: 'r2', value: 'comfortable', label: 'Comfortable' },
        { id: 'r3', value: 'compact', label: 'Compact' },
      ].map((o) => (
        <Flex key={o.id}>
          <StyledItem value={o.value} id={o.id}>
            <StyledIndicator />
          </StyledItem>
          <Label htmlFor={o.id}>{o.label}</Label>
        </Flex>
      ))}
    </StyledRoot>
  </form>
);

const StyledRoot = styled(RadioGroup.Root, { display: 'flex', flexDirection: 'column', gap: 10 });
const Flex = styled('div', { display: 'flex', alignItems: 'center' });
const StyledItem = styled(RadioGroup.Item, {
  all: 'unset', backgroundColor: 'white', width: 25, height: 25, borderRadius: '100%',
  boxShadow: `0 2px 10px ${blackA.blackA4}`, cursor: 'pointer',
  '&:hover': { backgroundColor: violet.violet3 },
});
const StyledIndicator = styled(RadioGroup.Indicator, {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: '100%', height: '100%', position: 'relative',
  '&::after': { content: '""', display: 'block', width: 11, height: 11, borderRadius: '50%', backgroundColor: violet.violet11 },
});
const Label = styled('label', { color: 'white', fontSize: 15, lineHeight: 1, paddingLeft: 15 });

export default RadioGroupDemo;
