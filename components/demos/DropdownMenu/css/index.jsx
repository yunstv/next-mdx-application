import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import './styles.css';

const DropdownMenuDemo = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <button className="IconButton" aria-label="Customise options"><HamburgerMenuIcon /></button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
        <DropdownMenu.Item className="DropdownMenuItem">New Tab <span className="RightSlot">⌘+T</span></DropdownMenu.Item>
        <DropdownMenu.Item className="DropdownMenuItem">New Window <span className="RightSlot">⌘+N</span></DropdownMenu.Item>
        <DropdownMenu.Item className="DropdownMenuItem" disabled>New Private Window <span className="RightSlot">⇧+⌘+N</span></DropdownMenu.Item>
        <DropdownMenu.Separator className="DropdownMenuSeparator" />
        <DropdownMenu.Item className="DropdownMenuItem">Print… <span className="RightSlot">⌘+P</span></DropdownMenu.Item>
        <DropdownMenu.Arrow className="DropdownMenuArrow" />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

export default DropdownMenuDemo;
