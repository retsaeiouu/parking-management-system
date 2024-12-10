"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { PlusIcon, PrinterIcon } from "@heroicons/react/24/solid";
import CreateForm from "./CreateForm";
import { usePathname } from "next/navigation";
import { entry_schema } from "@/types";
import {
  convertTimeTo12HFormat,
  getCurrentDate,
} from "@/actions/convertTimeToDuration";

export default function CreateButton({
  pub,
  pri,
  pubCount,
  priCount,
}: {
  pub: entry_schema[];
  pri: entry_schema[];
  pubCount: number;
  priCount: number;
}) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const cap = path === "/dashboard" ? 50 : 30;
  const count = path === "/dashboard" ? pubCount : priCount;
  const isFull = count >= cap;
  const filename = path === "/dashboard" ? "public-entries" : "private-entries";

  const generatePDF = async () => {
    const element = document.getElementById("pdf");
    const canvas = await html2canvas(element as HTMLElement);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(`${filename}.pdf`);
  };

  const entries = path === "/dashboard" ? pub : pri;
  entries.reverse();

  const [currentDate, setCurrentDate] = useState(null);
  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <>
      {isFull ? (
        <>
          <div
            id="pdf"
            className="h-screen w-screen flex flex-col p-5 text-2xl justify-start gap-1 items-center text-center font-montserrat font-semibold"
            style={{ position: "absolute", left: "-9999px" }}
          >
            <div className="mb-12 flex flex-col gap-3">
              <div className="text-5xl">
                {path === "/dashboard" ? "Public " : "Private "}Parking Entries
              </div>
              <div className="text-xl">as of {currentDate}</div>
            </div>
            <div className="w-full grid grid-cols-5 mb-5 font-normal">
              <div className="col-span-1">Type</div>
              <div className="col-span-1">Owner</div>
              <div className="col-span-1">Plate</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Time</div>
            </div>
            {entries &&
              entries.map((entry) => (
                <div key={entry.id} className="w-full grid grid-cols-5">
                  <div className="col-span-1">{entry.type}</div>
                  <div className="col-span-1">{entry.owner}</div>
                  <div className="col-span-1">{entry.plate}</div>
                  <div className="col-span-1">{entry.status}</div>
                  <div className="col-span-1">
                    {convertTimeTo12HFormat(entry.time_parked)}
                  </div>
                </div>
              ))}
          </div>
          <button
            onClick={generatePDF}
            className="opacity-80 transition-all duration-200 ease-out hover:bg-gray-600 active:scale-90 flex items-center gap-2 bg-gray-500 text-secondary font-montserrat font-semibold p-2 px-6 rounded-3xl"
          >
            <div>print</div>
            <PrinterIcon className="h-6 w-6" />
          </button>
        </>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="transition-all duration-200 ease-out hover:bg-[--highlight] active:scale-90 flex items-center gap-2 bg-primary text-secondary font-montserrat font-semibold p-2 px-4 rounded-3xl"
        >
          create
          <PlusIcon className="h-6 w-6" />
        </button>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <TransitionChild></TransitionChild>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6 flex items-center gap-2 text-foreground">
                    <DialogTitle className="text-xl font-bold">
                      Create Entry
                    </DialogTitle>
                    <PlusIcon className="h-5 w-5" />
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <CreateForm setOpen={setOpen} />
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
