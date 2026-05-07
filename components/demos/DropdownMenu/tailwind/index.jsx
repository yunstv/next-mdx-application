import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

const DropdownMenuDemo = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <button className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 outline-none" aria-label="Customise options">
        <HamburgerMenuIcon />
      </button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className="z-50 min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35)]"
        sideOffset={5}
      >
        <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pl-[25px] pr-[5px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
          New Tab <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white">⌘+T</div>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pl-[25px] pr-[5px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
          New Window <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white">⌘+N</div>
        </DropdownMenu.Item>
        <DropdownMenu.Item disabled className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pl-[25px] pr-[5px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
          New Private Window <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white">⇧+⌘+N</div>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="m-[5px] h-[1px] bg-violet6" />
        <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pl-[25px] pr-[5px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
          Print… <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white">⌘+P</div>
        </DropdownMenu.Item>
        <DropdownMenu.Arrow className="fill-white" />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

export default DropdownMenuDemo;
