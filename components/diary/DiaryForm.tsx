"use client";

import { useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TipTap from "@/components/Tiptap";
import { saveDiary } from "@/app/actions";
import Datepicker from "tailwind-datepicker-react";

interface IOptions {
  inputDateFormatProp?: {
    year?: "numeric" | "2-digit";
    month?: "numeric" | "2-digit";
    day?: "numeric" | "2-digit";
  };
}

const options = {
  title: "Demo Title",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date(new Date().setDate(new Date().getDate() - 1)),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-gray-700 dark:bg-gray-800",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "bg-red-500",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-12",
  language: "en",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
};

export default function DiaryForm() {
  const [content, setContent] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [errors, setErrors] = useState({
    date: false,
    title: false,
    content: false,
  });

  const [show, setShow] = useState(false);
  const handleChange = (selectedDate: Date) => {
    setDate(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;

    const newErrors = {
      date: !date,
      title: !title.trim(),
      content: !content.trim(),
    };

    setErrors(newErrors);
    console.log(date);
    console.log(errors);
    if (Object.values(newErrors).some((hasError) => hasError)) {
      return;
    }

    await saveDiary({ title, content, date });
  };
  return (
    <form className="flex-1 flex flex-col min-w-64" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-medium">Write your dream</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Datepicker
          options={options as IOptions}
          onChange={handleChange}
          show={show}
          setShow={handleClose}
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">Please select a date.</p>
        )}
        <Label htmlFor="content">Dream</Label>
        <Input name="title" placeholder="Title" />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">Title is required.</p>
        )}
        <TipTap
          description={"Write your dream description"}
          onChange={setContent}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">
            Dream description is required.
          </p>
        )}

        <SubmitButton pendingText="Saving...">Submit</SubmitButton>
      </div>
    </form>
  );
}
