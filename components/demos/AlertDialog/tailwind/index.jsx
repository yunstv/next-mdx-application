import * as AlertDialog from '@radix-ui/react-alert-dialog';

const AlertDialogDemo = () => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <button className="inline-flex h-[35px] items-center justify-center rounded bg-white px-4 text-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3">
        Delete account
      </button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 z-50 bg-blackA6" />
      <AlertDialog.Content className="fixed left-1/2 top-1/2 z-[51] max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
        <AlertDialog.Title className="m-0 text-[17px] font-medium text-mauve12">Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description className="mb-5 mt-[15px] text-[15px] leading-normal text-mauve11">
          This action cannot be undone. This will permanently delete your account.
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="inline-flex h-[35px] items-center justify-center rounded bg-mauve4 px-4 text-[15px] font-medium leading-none text-mauve11 hover:bg-mauve5">
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button className="inline-flex h-[35px] items-center justify-center rounded bg-red4 px-4 text-[15px] font-medium leading-none text-red11 hover:bg-red5">
              Yes, delete account
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default AlertDialogDemo;
