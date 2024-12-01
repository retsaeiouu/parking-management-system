"use client";

import {
  editPrivateEntryAction,
  editPublicEntryAction,
} from "@/actions/editEntries";
import { usePathname } from "next/navigation";
import { useFormStatus } from "react-dom";

export default function EditForm({ setOpen, id, name, plate, type }) {
  const path = usePathname();
  const action =
    path === "/dashboard/private"
      ? editPrivateEntryAction
      : editPublicEntryAction;
  return (
    <form action={action} onSubmit={() => setOpen(false)}>
      <div className="space-y-12">
        <div className="pb-8">
          <p className="mt-1 text-base text-secondaryforeground">
            Edit the details of the selected parking entry, Unsaved changes
            cannot be undo.
          </p>

          <input readOnly className="hidden" name="id" value={id} />
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="owner"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Owner
              </label>
              <div className="mt-2">
                <div className="flex rounded-3xl shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                  <input
                    id="owner"
                    name="owner"
                    type="text"
                    defaultValue={name}
                    placeholder={name}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-foreground placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="plate"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Plate Number
              </label>
              <div className="mt-2">
                <div className="flex rounded-3xl shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                  <input
                    id="plate"
                    name="plate"
                    type="text"
                    defaultValue={plate}
                    placeholder={plate}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-foreground placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="type"
                className="block text-sm/6 font-medium text-foreground"
              >
                Vehicle Type
              </label>
              <div className="mt-2">
                <select
                  id="type"
                  name="type"
                  defaultValue={type}
                  className="block w-full rounded-3xl border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm/6"
                >
                  <option>Motor</option>
                  <option>Car</option>
                  <option>Van</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={() => setOpen(false)}
          type="button"
          className="hover:opacity-70 text-base font-bold text-foreground"
        >
          cancel
        </button>
        <EditButton />
      </div>
    </form>
  );
}

const EditButton = () => {
  const status = useFormStatus();
  return (
    <>
      {status.pending ? (
        <button
          className="rounded-3xl bg-primary opacity-60 hover:bg-[#59639c] px-3 py-2 text-base font-montserrat font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          disabled
        >
          updating..
        </button>
      ) : (
        <button
          type="submit"
          className="transition-all duration-200 ease-out active:scale-90 rounded-3xl bg-primary hover:bg-[#59639c] px-3 py-2 text-base font-montserrat font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          update
        </button>
      )}
    </>
  );
};
