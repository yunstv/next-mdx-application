import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

const CheckboxDemo = () => (
  <form>
    <div className="flex items-center">
      <Checkbox.Root className="hover:bg-violet3 flex h-[25px] w-[25px] items-center justify-center rounded bg-white shadow-[0_2px_10px] shadow-blackA4 outline-none focus:shadow-[0_0_0_2px_black]" defaultChecked id="c1">
        <Checkbox.Indicator className="text-violet11">
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="pl-[15px] text-[15px] leading-none text-white" htmlFor="c1">
        Accept terms and conditions.
      </label>
    </div>
  </form>
);

export default CheckboxDemo;
