"use client";

import { createPrivateEntry } from "@/actions/createEntries";
import { useFormStatus } from "react-dom";

export const ReservationForm = () => {
  return (
    <div className="overflow-auto h-[80%] lg:h-[34rem] w-[90%] lg:w-[50%] bg-secondary rounded-3xl drop-shadow-2xl">
      <form
        className="flex flex-col h-full p-8 gap-3 text-2xl font-montserrat"
        action={createPrivateEntry}
      >
        <input readOnly className="hidden" name="status" value="Pending" />
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-4xl mb-4">Parking Reservation</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="sm:col-span-4">
            <label
              htmlFor="owner"
              className="block text-lg font-medium text-secondaryforeground"
            >
              Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-3xl shadow-sm ring-1 ring-inset ring-background focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary w-full">
                <input
                  id="owner"
                  name="owner"
                  type="text"
                  placeholder="name"
                  required
                  className="text-lg block flex-1 border-0 bg-transparent py-1.5 pl-4 text-foreground placeholder:text-gray-400 focus:ring-0"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="plate"
              className="block text-lg font-medium text-secondaryforeground"
            >
              Plate Number
            </label>
            <div className="mt-2">
              <div className="flex rounded-3xl shadow-sm ring-1 ring-inset ring-background focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary w-full">
                <input
                  id="plate"
                  name="plate"
                  placeholder="1XX AXX"
                  required
                  className="text-lg block flex-1 border-0 bg-transparent py-1.5 pl-4 text-foreground placeholder:text-gray-400 focus:ring-0"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="contact"
              className="block text-lg font-medium text-secondaryforeground"
            >
              Contact
            </label>
            <div className="mt-2">
              <div className="flex rounded-3xl shadow-sm ring-1 ring-inset ring-background focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary w-full">
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  placeholder="09XXXXXXXXX"
                  required
                  className="text-lg block flex-1 border-0 bg-transparent py-1.5 pl-4 text-foreground placeholder:text-gray-400 focus:ring-0"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="type"
              className="block text-lg font-medium text-secondaryforeground"
            >
              Vehicle Type
            </label>
            <div className="mt-2">
              <select
                id="type"
                name="type"
                className="bg-secondary block w-full rounded-3xl border-0 p-2 px-4 text-foreground text-lg shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm/6"
              >
                <option>Motor</option>
                <option>Car</option>
                <option>Van</option>
              </select>
            </div>
          </div>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
};

const SubmitButton = () => {
  const status = useFormStatus();
  return (
    <>
      {status.pending ? (
        <button
          className="mt-auto bg-primary text-secondary font-semibold w-full rounded-3xl p-2 opacity-60 hover:bg-[#59639c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          disabled
        >
          Submitting...
        </button>
      ) : (
        <button
          type="submit"
          className="transition-all duration-200 ease-out active:scale-90 lg:active:scale-95 mt-auto bg-primary text-secondary font-semibold w-full rounded-3xl p-2 hover:bg-[#59639c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Submit
        </button>
      )}
    </>
  );
};
