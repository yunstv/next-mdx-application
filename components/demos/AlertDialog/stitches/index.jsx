import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { styled } from '@stitches/react';
import { blackA, mauve, red, violet, slate } from '@radix-ui/colors';

const AlertDialogDemo = () => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <Button variant="violet">Delete account</Button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <Overlay />
      <Content>
        <Title>Are you absolutely sure?</Title>
        <Description>
          This action cannot be undone. This will permanently delete your account.
        </Description>
        <Actions>
          <AlertDialog.Cancel asChild><Button variant="mauve">Cancel</Button></AlertDialog.Cancel>
          <AlertDialog.Action asChild><Button variant="red">Yes, delete account</Button></AlertDialog.Action>
        </Actions>
      </Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

const Overlay = styled(AlertDialog.Overlay, {
  backgroundColor: blackA.blackA9, position: 'fixed', inset: 0, zIndex: 50,
});
const Content = styled(AlertDialog.Content, {
  backgroundColor: 'white', borderRadius: 6, position: 'fixed',
  top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: '90vw', maxWidth: 500, maxHeight: '85vh', padding: 25, zIndex: 51,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px',
});
const Title = styled(AlertDialog.Title, { margin: 0, color: slate.slate12, fontSize: 17, fontWeight: 500 });
const Description = styled(AlertDialog.Description, {
  marginTop: 15, marginBottom: 20, color: slate.slate11, fontSize: 15, lineHeight: 1.5,
});
const Actions = styled('div', { display: 'flex', gap: 25, justifyContent: 'flex-end' });
const Button = styled('button', {
  all: 'unset', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 4, padding: '0 15px', fontSize: 15, lineHeight: 1, fontWeight: 500,
  height: 35, cursor: 'pointer',
  variants: {
    variant: {
      violet: { backgroundColor: 'white', color: violet.violet11, boxShadow: `0 2px 10px ${blackA.blackA7}`, '&:hover': { backgroundColor: mauve.mauve3 } },
      mauve: { backgroundColor: mauve.mauve4, color: mauve.mauve11, '&:hover': { backgroundColor: mauve.mauve5 } },
      red: { backgroundColor: red.red4, color: red.red11, '&:hover': { backgroundColor: red.red5 } },
    },
  },
});

export default AlertDialogDemo;
