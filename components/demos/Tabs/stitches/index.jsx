import * as Tabs from '@radix-ui/react-tabs';
import { styled } from '@stitches/react';
import { blackA, mauve, violet } from '@radix-ui/colors';

const TabsDemo = () => (
  <StyledRoot defaultValue="tab1">
    <StyledList aria-label="Manage your account">
      <StyledTrigger value="tab1">Account</StyledTrigger>
      <StyledTrigger value="tab2">Password</StyledTrigger>
    </StyledList>
    <StyledContent value="tab1"><Text>Make changes to your account here.</Text></StyledContent>
    <StyledContent value="tab2"><Text>Change your password here.</Text></StyledContent>
  </StyledRoot>
);

const StyledRoot = styled(Tabs.Root, {
  display: 'flex', flexDirection: 'column', width: 300,
  boxShadow: `0 2px 10px ${blackA.blackA4}`, background: 'white', borderRadius: 6,
});
const StyledList = styled(Tabs.List, {
  flexShrink: 0, display: 'flex', borderBottom: `1px solid ${mauve.mauve6}`,
});
const StyledTrigger = styled(Tabs.Trigger, {
  all: 'unset', fontFamily: 'inherit', backgroundColor: 'white', padding: '0 20px',
  height: 45, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 15, lineHeight: 1, color: violet.violet11, userSelect: 'none', cursor: 'pointer',
  '&[data-state="active"]': {
    color: violet.violet11,
    boxShadow: 'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor',
  },
});
const StyledContent = styled(Tabs.Content, {
  flexGrow: 1, padding: 20, background: 'white',
  borderBottomLeftRadius: 6, borderBottomRightRadius: 6, outline: 'none',
});
const Text = styled('p', { margin: 0, color: mauve.mauve11, fontSize: 15, lineHeight: 1.5 });

export default TabsDemo;
