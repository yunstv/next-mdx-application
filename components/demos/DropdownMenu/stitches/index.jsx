import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { styled } from '@stitches/react';
import { blackA, mauve, violet } from '@radix-ui/colors';

const DropdownMenuDemo = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <IconButton aria-label="Customise options"><HamburgerMenuIcon /></IconButton>
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <Content sideOffset={5}>
        <Item>New Tab <RightSlot>⌘+T</RightSlot></Item>
        <Item>New Window <RightSlot>⌘+N</RightSlot></Item>
        <Item disabled>New Private Window <RightSlot>⇧+⌘+N</RightSlot></Item>
        <Separator />
        <Item>Print… <RightSlot>⌘+P</RightSlot></Item>
        <Arrow />
      </Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

const IconButton = styled('button', {
  all: 'unset', width: 35, height: 35, display: 'inline-flex',
  alignItems: 'center', justifyContent: 'center', borderRadius: '100%',
  backgroundColor: 'white', color: violet.violet11,
  boxShadow: `0 2px 10px ${blackA.blackA7}`, cursor: 'pointer',
  '&:hover': { backgroundColor: violet.violet3 },
});
const Content = styled(DropdownMenu.Content, {
  minWidth: 220, backgroundColor: 'white', borderRadius: 6, padding: 5,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px', zIndex: 50,
});
const Item = styled(DropdownMenu.Item, {
  fontSize: 13, lineHeight: 1, color: violet.violet11,
  display: 'flex', alignItems: 'center', height: 25, padding: '0 5px 0 25px',
  position: 'relative', userSelect: 'none', borderRadius: 3,
  '&[data-disabled]': { color: mauve.mauve8, pointerEvents: 'none' },
  '&[data-highlighted]': { backgroundColor: violet.violet9, color: violet.violet1 },
});
const Separator = styled(DropdownMenu.Separator, { height: 1, backgroundColor: violet.violet6, margin: 5 });
const Arrow = styled(DropdownMenu.Arrow, { fill: 'white' });
const RightSlot = styled('div', {
  marginLeft: 'auto', paddingLeft: 20, color: mauve.mauve11,
  '[data-highlighted] > &': { color: 'white' },
  '[data-disabled] &': { color: mauve.mauve8 },
});

export default DropdownMenuDemo;
