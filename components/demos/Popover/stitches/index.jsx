import * as Popover from '@radix-ui/react-popover';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';
import { styled } from '@stitches/react';
import { blackA, mauve, slate, violet } from '@radix-ui/colors';

const PopoverDemo = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <IconButton aria-label="Update dimensions"><MixerHorizontalIcon /></IconButton>
    </Popover.Trigger>
    <Popover.Portal>
      <Content sideOffset={5}>
        <Flex>
          <Text>Dimensions</Text>
          <Fieldset><Label htmlFor="w">Width</Label><Input id="w" defaultValue="100%" /></Fieldset>
          <Fieldset><Label htmlFor="mw">Max. width</Label><Input id="mw" defaultValue="300px" /></Fieldset>
        </Flex>
        <Popover.Close asChild>
          <CloseButton aria-label="Close"><Cross2Icon /></CloseButton>
        </Popover.Close>
        <Arrow />
      </Content>
    </Popover.Portal>
  </Popover.Root>
);

const IconButton = styled('button', {
  all: 'unset', width: 35, height: 35, display: 'inline-flex',
  alignItems: 'center', justifyContent: 'center', borderRadius: '100%',
  backgroundColor: 'white', color: violet.violet11,
  boxShadow: `0 2px 10px ${blackA.blackA7}`, cursor: 'pointer',
  '&:hover': { backgroundColor: violet.violet3 },
});
const Content = styled(Popover.Content, {
  borderRadius: 4, padding: 20, width: 260, backgroundColor: 'white',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px',
  zIndex: 50,
});
const Arrow = styled(Popover.Arrow, { fill: 'white' });
const CloseButton = styled('button', {
  all: 'unset', position: 'absolute', top: 5, right: 5,
  width: 25, height: 25, borderRadius: '100%',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  color: violet.violet11, '&:hover': { backgroundColor: violet.violet4 },
});
const Flex = styled('div', { display: 'flex', flexDirection: 'column', gap: 10 });
const Fieldset = styled('fieldset', { display: 'flex', gap: 20, alignItems: 'center', border: 0, padding: 0 });
const Label = styled('label', { fontSize: 13, color: violet.violet11, width: 75 });
const Input = styled('input', {
  all: 'unset', width: '100%', flex: 1, padding: '0 10px', height: 25,
  borderRadius: 4, fontSize: 13, color: violet.violet11,
  boxShadow: `0 0 0 1px ${violet.violet7}`,
});
const Text = styled('p', { margin: 0, color: slate.slate12, fontSize: 15, lineHeight: '19px', fontWeight: 500 });

export default PopoverDemo;
