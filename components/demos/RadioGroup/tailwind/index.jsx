import * as RadioGroup from '@radix-ui/react-radio-group';

const Item = ({ value, id, label }) => (
  <div className="flex items-center">
    <RadioGroup.Item
      className="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 outline-none cursor-pointer"
      value={value} id={id}
    >
      <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
    </RadioGroup.Item>
    <label className="text-white text-[15px] leading-none pl-[15px]" htmlFor={id}>{label}</label>
  </div>
);

const RadioGroupDemo = () => (
  <form>
    <RadioGroup.Root className="flex flex-col gap-2.5" defaultValue="default" aria-label="View density">
      <Item value="default" id="r1" label="Default" />
      <Item value="comfortable" id="r2" label="Comfortable" />
      <Item value="compact" id="r3" label="Compact" />
    </RadioGroup.Root>
  </form>
);

export default RadioGroupDemo;
