import * as Label from '@radix-ui/react-label';

const LabelDemo = () => (
  <div className="flex flex-col gap-2.5">
    <Label.Root className="text-[15px] font-medium leading-[35px] text-white" htmlFor="firstName">
      First name
    </Label.Root>
    <input
      className="w-[200px] rounded bg-white/40 px-2.5 text-[15px] leading-none text-white outline-none h-[35px]"
      type="text"
      id="firstName"
      defaultValue="Pedro Duarte"
    />
  </div>
);

export default LabelDemo;
