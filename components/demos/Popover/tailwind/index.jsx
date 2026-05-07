import * as Popover from '@radix-ui/react-popover';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';

const PopoverDemo = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3" aria-label="Update dimensions">
        <MixerHorizontalIcon />
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className="z-50 w-[260px] rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35)]"
        sideOffset={5}
      >
        <div className="flex flex-col gap-2.5">
          <p className="text-[15px] leading-[19px] font-medium text-mauve12 mb-2.5">Dimensions</p>
          <fieldset className="flex gap-5 items-center">
            <label className="text-[13px] text-violet11 w-[75px]" htmlFor="w">Width</label>
            <input id="w" defaultValue="100%" className="inline-flex w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none" />
          </fieldset>
          <fieldset className="flex gap-5 items-center">
            <label className="text-[13px] text-violet11 w-[75px]" htmlFor="mw">Max. width</label>
            <input id="mw" defaultValue="300px" className="inline-flex w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none" />
          </fieldset>
        </div>
        <Popover.Close className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 outline-none" aria-label="Close">
          <Cross2Icon />
        </Popover.Close>
        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default PopoverDemo;
