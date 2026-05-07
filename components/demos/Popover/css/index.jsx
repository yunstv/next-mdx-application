import * as Popover from '@radix-ui/react-popover';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';
import './styles.css';

const PopoverDemo = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button className="IconButton" aria-label="Update dimensions"><MixerHorizontalIcon /></button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className="PopoverContent" sideOffset={5}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p className="Text" style={{ marginBottom: 10 }}>Dimensions</p>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="width">Width</label>
            <input className="Input" id="width" defaultValue="100%" />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="maxWidth">Max. width</label>
            <input className="Input" id="maxWidth" defaultValue="300px" />
          </fieldset>
        </div>
        <Popover.Close asChild>
          <button className="PopoverClose" aria-label="Close"><Cross2Icon /></button>
        </Popover.Close>
        <Popover.Arrow className="PopoverArrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default PopoverDemo;
