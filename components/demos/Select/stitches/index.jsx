import * as React from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { styled } from '@stitches/react';
import { blackA, mauve, violet } from '@radix-ui/colors';

const SelectDemo = () => (
  <Select.Root>
    <Trigger aria-label="Food">
      <Select.Value placeholder="Select a fruit…" />
      <Icon><ChevronDownIcon /></Icon>
    </Trigger>
    <Select.Portal>
      <Content>
        <ScrollButton as={Select.ScrollUpButton}><ChevronUpIcon /></ScrollButton>
        <Viewport>
          <Select.Group>
            <Label>Fruits</Label>
            <Item value="apple">Apple</Item>
            <Item value="banana">Banana</Item>
            <Item value="blueberry">Blueberry</Item>
            <Item value="grapes">Grapes</Item>
          </Select.Group>
        </Viewport>
        <ScrollButton as={Select.ScrollDownButton}><ChevronDownIcon /></ScrollButton>
      </Content>
    </Select.Portal>
  </Select.Root>
);

const Item = React.forwardRef(({ children, ...props }, ref) => (
  <StyledItem {...props} ref={ref}>
    <Select.ItemText>{children}</Select.ItemText>
    <Indicator><CheckIcon /></Indicator>
  </StyledItem>
));
Item.displayName = 'Item';

const Trigger = styled(Select.Trigger, {
  all: 'unset', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  gap: 5, padding: '0 15px', fontSize: 13, lineHeight: 1, height: 35,
  backgroundColor: 'white', color: violet.violet11, borderRadius: 4,
  boxShadow: `0 2px 10px ${blackA.blackA7}`, cursor: 'pointer',
  '&:hover': { backgroundColor: mauve.mauve3 },
});
const Icon = styled(Select.Icon, { color: violet.violet11 });
const Content = styled(Select.Content, {
  overflow: 'hidden', backgroundColor: 'white', borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px', zIndex: 50,
});
const Viewport = styled(Select.Viewport, { padding: 5 });
const StyledItem = styled(Select.Item, {
  fontSize: 13, lineHeight: 1, color: violet.violet11, borderRadius: 3,
  display: 'flex', alignItems: 'center', height: 25, padding: '0 35px 0 25px',
  position: 'relative', userSelect: 'none',
  '&[data-highlighted]': { backgroundColor: violet.violet9, color: violet.violet1 },
});
const Indicator = styled(Select.ItemIndicator, {
  position: 'absolute', left: 0, width: 25,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
});
const Label = styled(Select.Label, { padding: '0 25px', fontSize: 12, lineHeight: '25px', color: mauve.mauve11 });
const ScrollButton = styled('div', {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  height: 25, background: 'white', color: violet.violet11,
});

export default SelectDemo;
