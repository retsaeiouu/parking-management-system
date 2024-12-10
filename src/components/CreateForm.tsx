"use client";

import { createPrivateEntry, createPublicEntry } from "@/actions/createEntries";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function CreateForm({ setOpen }) {
  const path = usePathname();
  const action =
    path === "/dashboard/private" ? createPrivateEntry : createPublicEntry;
  const [type, setType] = useState("Motor");

  return (
    <form action={action} onSubmit={() => setOpen(false)}>
      <div className="space-y-12">
        <div className="pb-8">
          <p className="mt-1 text-base text-secondaryforeground">
            Create a new parking entry, Unsaved changes cannot be undo.
          </p>

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
                    placeholder="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-foreground placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                    required
                  />
                </div>
              </div>
            </div>

            <div
              className={`sm:col-span-4 ${type === "Bike" || type === "E-Bike" ? "opacity-20" : ""}`}
            >
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
                    placeholder="1XX AXX"
                    disabled={type === "Bike" || type === "E-Bike"}
                    className={`block flex-1 border-0 bg-transparent py-1.5 pl-3 text-foreground placeholder:text-gray-400 focus:ring-0 sm:text-sm/6`}
                    required={type !== "Bike" && type !== "E-Bike"}
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
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="block w-full rounded-3xl border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm/6"
                >
                  <option value="Bike">Bike</option>
                  <option value="E-Bike">E-Bike</option>
                  <option value="Motor">Motor</option>
                  <option value="Tricycle">Tricycle</option>
                  <option value="Car">Car</option>
                  <option value="Van">Van</option>
                  <option value="Truck">Truck</option>
                </select>
              </div>
            </div>

            {path === "/dashboard/private" ? (
              <div className="sm:col-span-3">
                <label
                  htmlFor="status"
                  className="block text-sm/6 font-medium text-foreground"
                >
                  Entry Type
                </label>
                <div className="mt-2">
                  <select
                    id="status"
                    name="status"
                    className="block w-full rounded-3xl border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm/6"
                  >
                    <option>Parking</option>
                    <option>Reserved</option>
                  </select>
                </div>
              </div>
            ) : (
              <input
                name="status"
                className="hidden"
                readOnly
                value="Parking"
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={() => setOpen(false)}
          type="button"
          className="text-base font-bold text-foreground hover:opacity-70"
        >
          cancel
        </button>
        <CreateButton />
      </div>
    </form>
  );
}

const CreateButton = () => {
  const status = useFormStatus();
  return (
    <>
      {status.pending ? (
        <button
          className="rounded-3xl bg-primary opacity-60 hover:bg-[#59639c] px-3 py-2 text-base font-montserrat font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          disabled
        >
          creating..
        </button>
      ) : (
        <button
          type="submit"
          className="transition-all duration-200 ease-out active:scale-90 rounded-3xl bg-primary hover:bg-[#59639c] px-3 py-2 text-base font-montserrat font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          create
        </button>
      )}
    </>
  );
};
