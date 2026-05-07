import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { styled } from '@stitches/react';
import { blackA, violet } from '@radix-ui/colors';

const CheckboxDemo = () => (
  <form>
    <Flex>
      <StyledCheckbox defaultChecked id="c1">
        <StyledIndicator><CheckIcon /></StyledIndicator>
      </StyledCheckbox>
      <Label htmlFor="c1">Accept terms and conditions.</Label>
    </Flex>
  </form>
);

const Flex = styled('div', { display: 'flex', alignItems: 'center' });
const StyledCheckbox = styled(Checkbox.Root, {
  all: 'unset', backgroundColor: 'white', width: 25, height: 25, borderRadius: 4,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  boxShadow: `0 2px 10px ${blackA.blackA7}`, cursor: 'pointer',
  '&:hover': { backgroundColor: violet.violet3 },
});
const StyledIndicator = styled(Checkbox.Indicator, { color: violet.violet11 });
const Label = styled('label', { color: 'white', paddingLeft: 15, fontSize: 15, lineHeight: 1 });

export default CheckboxDemo;
