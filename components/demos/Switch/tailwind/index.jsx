import * as Switch from '@radix-ui/react-switch';

const SwitchDemo = () => (
  <form>
    <div className="flex items-center">
      <label className="pr-[15px] text-[15px] leading-none text-white" htmlFor="airplane-mode">
        Airplane mode
      </label>
      <Switch.Root
        className="relative h-[25px] w-[42px] cursor-default rounded-full bg-blackA6 outline-none data-[state=checked]:bg-black"
        id="airplane-mode"
        defaultChecked
      >
        <Switch.Thumb className="block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </Switch.Root>
    </div>
  </form>
);

export default SwitchDemo;
