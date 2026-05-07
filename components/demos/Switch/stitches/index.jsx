import * as Switch from '@radix-ui/react-switch';
import { styled } from '@stitches/react';
import { blackA } from '@radix-ui/colors';

const SwitchDemo = () => (
  <form>
    <Flex>
      <Label htmlFor="airplane-mode">Airplane mode</Label>
      <StyledSwitch id="airplane-mode" defaultChecked>
        <StyledThumb />
      </StyledSwitch>
    </Flex>
  </form>
);

const Flex = styled('div', { display: 'flex', alignItems: 'center' });
const Label = styled('label', { color: 'white', fontSize: 15, lineHeight: 1, paddingRight: 15 });
const StyledSwitch = styled(Switch.Root, {
  all: 'unset', width: 42, height: 25, backgroundColor: blackA.blackA9,
  borderRadius: 9999, position: 'relative', cursor: 'pointer',
  '&[data-state="checked"]': { backgroundColor: 'black' },
});
const StyledThumb = styled(Switch.Thumb, {
  display: 'block', width: 21, height: 21, backgroundColor: 'white',
  borderRadius: 9999, boxShadow: `0 2px 2px ${blackA.blackA7}`,
  transition: 'transform 100ms', transform: 'translateX(2px)',
  '&[data-state="checked"]': { transform: 'translateX(19px)' },
});

export default SwitchDemo;
