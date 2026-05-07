import * as React from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import './styles.css';

const SelectItem = React.forwardRef(({ children, className, ...props }, ref) => (
  <Select.Item className={`SelectItem ${className || ''}`} {...props} ref={ref}>
    <Select.ItemText>{children}</Select.ItemText>
    <Select.ItemIndicator className="SelectItemIndicator"><CheckIcon /></Select.ItemIndicator>
  </Select.Item>
));
SelectItem.displayName = 'SelectItem';

const SelectDemo = () => (
  <Select.Root>
    <Select.Trigger className="SelectTrigger" aria-label="Food">
      <Select.Value placeholder="Select a fruit…" />
      <Select.Icon className="SelectIcon"><ChevronDownIcon /></Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="SelectContent">
        <Select.ScrollUpButton className="SelectScrollButton"><ChevronUpIcon /></Select.ScrollUpButton>
        <Select.Viewport className="SelectViewport">
          <Select.Group>
            <Select.Label className="SelectLabel">Fruits</Select.Label>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="SelectScrollButton"><ChevronDownIcon /></Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

export default SelectDemo;
