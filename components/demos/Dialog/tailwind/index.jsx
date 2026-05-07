import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const DialogDemo = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="inline-flex h-[35px] items-center justify-center rounded bg-white px-4 text-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3">
        Edit profile
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-blackA6" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-[51] max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px]">
        <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">Edit profile</Dialog.Title>
        <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
          Make changes to your profile here.
        </Dialog.Description>
        <fieldset className="mb-[15px] flex items-center gap-5 border-0 p-0">
          <label className="w-[90px] text-right text-[15px] text-violet11" htmlFor="name">Name</label>
          <input className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none" id="name" defaultValue="Pedro Duarte" />
        </fieldset>
        <fieldset className="mb-[15px] flex items-center gap-5 border-0 p-0">
          <label className="w-[90px] text-right text-[15px] text-violet11" htmlFor="username">Username</label>
          <input className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none" id="username" defaultValue="@peduarte" />
        </fieldset>
        <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <button className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-4 text-[15px] font-medium leading-none text-green11 hover:bg-green5">
              Save changes
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] items-center justify-center rounded-full text-violet11 hover:bg-violet4 outline-none" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;
