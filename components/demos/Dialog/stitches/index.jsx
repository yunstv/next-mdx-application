import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { styled } from '@stitches/react';
import { blackA, green, mauve, slate, violet } from '@radix-ui/colors';

const DialogDemo = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild><Button variant="violet">Edit profile</Button></Dialog.Trigger>
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Title>Edit profile</Title>
        <Description>Make changes to your profile here.</Description>
        <Fieldset>
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="Pedro Duarte" />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="@peduarte" />
        </Fieldset>
        <Actions>
          <Dialog.Close asChild><Button variant="green">Save changes</Button></Dialog.Close>
        </Actions>
        <Dialog.Close asChild>
          <IconButton aria-label="Close"><Cross2Icon /></IconButton>
        </Dialog.Close>
      </Content>
    </Dialog.Portal>
  </Dialog.Root>
);

const Overlay = styled(Dialog.Overlay, { backgroundColor: blackA.blackA9, position: 'fixed', inset: 0, zIndex: 50 });
const Content = styled(Dialog.Content, {
  backgroundColor: 'white', borderRadius: 6, position: 'fixed',
  top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: '90vw', maxWidth: 450, maxHeight: '85vh', padding: 25, zIndex: 51,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px',
});
const Title = styled(Dialog.Title, { margin: 0, fontWeight: 500, color: slate.slate12, fontSize: 17 });
const Description = styled(Dialog.Description, { margin: '10px 0 20px', color: slate.slate11, fontSize: 15, lineHeight: 1.5 });
const Fieldset = styled('fieldset', { display: 'flex', gap: 20, alignItems: 'center', marginBottom: 15, border: 0, padding: 0 });
const Label = styled('label', { fontSize: 15, color: violet.violet11, width: 90, textAlign: 'right' });
const Input = styled('input', {
  all: 'unset', width: '100%', flex: 1, padding: '0 10px', height: 35,
  borderRadius: 4, fontSize: 15, lineHeight: 1, color: violet.violet11,
  boxShadow: `0 0 0 1px ${violet.violet7}`,
});
const Actions = styled('div', { display: 'flex', justifyContent: 'flex-end', marginTop: 25 });
const Button = styled('button', {
  all: 'unset', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 4, padding: '0 15px', fontSize: 15, lineHeight: 1, fontWeight: 500,
  height: 35, cursor: 'pointer',
  variants: {
    variant: {
      violet: { backgroundColor: 'white', color: violet.violet11, boxShadow: `0 2px 10px ${blackA.blackA7}`, '&:hover': { backgroundColor: mauve.mauve3 } },
      green: { backgroundColor: green.green4, color: green.green11, '&:hover': { backgroundColor: green.green5 } },
    },
  },
});
const IconButton = styled('button', {
  all: 'unset', position: 'absolute', top: 10, right: 10,
  width: 25, height: 25, borderRadius: '100%', display: 'inline-flex',
  alignItems: 'center', justifyContent: 'center', color: violet.violet11,
  '&:hover': { backgroundColor: violet.violet4 },
});

export default DialogDemo;
