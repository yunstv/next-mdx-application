import * as React from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

const SelectItem = React.forwardRef(({ children, className = '', ...props }, ref) => (
  <Select.Item
    ref={ref}
    className={`text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 ${className}`}
    {...props}
  >
    <Select.ItemText>{children}</Select.ItemText>
    <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
      <CheckIcon />
    </Select.ItemIndicator>
  </Select.Item>
));
SelectItem.displayName = 'SelectItem';

const SelectDemo = () => (
  <Select.Root>
    <Select.Trigger className="inline-flex items-center justify-center gap-1 px-[15px] text-[13px] leading-none h-[35px] bg-white text-violet11 rounded shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 outline-none" aria-label="Food">
      <Select.Value placeholder="Select a fruit…" />
      <Select.Icon className="text-violet11"><ChevronDownIcon /></Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35)] z-50">
        <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11"><ChevronUpIcon /></Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          <Select.Group>
            <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">Fruits</Select.Label>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11"><ChevronDownIcon /></Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

export default SelectDemo;
