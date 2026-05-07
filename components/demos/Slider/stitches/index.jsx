import * as Slider from '@radix-ui/react-slider';
import { styled } from '@stitches/react';
import { blackA } from '@radix-ui/colors';

const SliderDemo = () => (
  <form>
    <StyledRoot defaultValue={[50]} max={100} step={1}>
      <StyledTrack><StyledRange /></StyledTrack>
      <StyledThumb aria-label="Volume" />
    </StyledRoot>
  </form>
);

const StyledRoot = styled(Slider.Root, {
  position: 'relative', display: 'flex', alignItems: 'center', userSelect: 'none',
  touchAction: 'none', width: 200, height: 20,
});
const StyledTrack = styled(Slider.Track, {
  backgroundColor: blackA.blackA9, position: 'relative', flexGrow: 1, borderRadius: 9999, height: 3,
});
const StyledRange = styled(Slider.Range, {
  position: 'absolute', backgroundColor: 'white', borderRadius: 9999, height: '100%',
});
const StyledThumb = styled(Slider.Thumb, {
  all: 'unset', display: 'block', width: 20, height: 20, backgroundColor: 'white',
  boxShadow: `0 2px 10px ${blackA.blackA7}`, borderRadius: 10,
  '&:hover': { backgroundColor: '#f8fafc' },
  '&:focus': { boxShadow: `0 0 0 5px ${blackA.blackA8}` },
});

export default SliderDemo;
