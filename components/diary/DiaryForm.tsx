"use client";

import { useState, useRef, useTransition } from "react";
import type { ChangeEvent } from "react";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { saveDiary, uploadImage } from "@/app/actions";
import { TagsInput } from "react-tag-input-component";
import Datepicker from "tailwind-datepicker-react";
import { convertBlobUrlToFile } from "@/utils/converToBlob";
import ReactQuill from "react-quill-new";
import "./quill.snow.css";
import { Switch } from "@/components/ui/switch"; // Adjust the import path as needed
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface IOptions {
  inputDateFormatProp?: {
    year?: "numeric" | "2-digit";
    month?: "numeric" | "2-digit";
    day?: "numeric" | "2-digit";
  };
}

const options = {
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date(new Date().setDate(new Date().getDate() - 1)),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-purple",
    todayBtn: "bg-yellow",
    clearBtn: "bg-red",
    icons: "bg-transparent",
    text: "bg-black",
    disabledText: "opacity-50",
    input: "bg-purple w-200 rounded-md border-none",
    inputIcon: "",
    selected: "text-underline",
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

  const [isPublic, setIsPublic] = useState(false);

  const [show, setShow] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (selectedDate: Date) => {
    setDate(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));

      setImageUrls([...imageUrls, ...newImageUrls]);
    }

    const file = e.target.files?.[0];

    if (file) {
      const { name } = file;
      setFileNames([...fileNames, `${name}`]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isPending) return; // Prevent duplicate submissions

    try {
      const formData = new FormData(event.currentTarget);
      const title = formData.get("title") as string;

      const newErrors = {
        date: !date,
        title: !title.trim(),
        content: !content.trim(),
      };

      setErrors(newErrors);

      if (Object.values(newErrors).some((hasError) => hasError)) {
        return;
      }

      const diaryResponse = await saveDiary({
        title,
        content,
        date,
        imageUrls,
        tags,
        isPublic,
      });

      if (diaryResponse?.success) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false); // Error state
      }
    } catch (error) {
      console.error("Error while saving diary entry:", error);
      setIsSuccess(false); // Ensure success is reset if an error occurs
    } finally {
      setFileNames([]);
      setImageUrls([]);
      (document.getElementById("dreamForm") as HTMLFormElement)?.reset();
    }
  };

  const handleClickUploadImagesButton = async () => {
    startTransition(async () => {
      let urls = [];
      for (const url of imageUrls) {
        const imageFile = await convertBlobUrlToFile(url);

        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: "dream-images",
        });

        if (error) {
          console.error(error);
          return;
        }

        urls.push(imageUrl);
      }
      setImageUrls(urls);
    });
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <>
      {isSuccess ? (
        <div className="text-green-500 mb-4">Your dream has saved...📕</div>
      ) : (
        <form
          className="flex-1 flex flex-col min-w-64"
          onSubmit={handleSubmit}
          id="dreamForm"
        >
          <div className="">
            <div className="mb-7">
              <p className="mb-5">When did you had this dream ?</p>
              <Datepicker
                options={options as IOptions}
                onChange={handleChange}
                show={show}
                // classNames="bg-yellow"
                setShow={handleClose}
              />
              {errors.date && (
                <p className="text-yellow text-sm mt-1">
                  Please select a date.
                </p>
              )}
            </div>
            <div className="mb-7">
              <p className="mb-5">Name of this dream</p>
              <Input
                className="bg-purple border-purple placeholder-yellow text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter dream name"
                name="title"
              />
            </div>
            {errors.title && (
              <p className="text-yellow text-sm mt-1">
                Name of this dream is required.
              </p>
            )}
            <p className="mb-5">What was dream likes ?</p>
            <ReactQuill
              value={content}
              onChange={handleEditorChange}
              modules={quillModules}
              formats={quillFormats}
              className="w-full h-[70%] bg-purple"
            />
            {errors.content && (
              <p className="text-yellow text-sm mt-1">
                Dream description is required.
              </p>
            )}
            <p>{fileNames}</p>
            <input
              type="file"
              hidden
              multiple
              ref={imageInputRef}
              onChange={handleImageChange}
              disabled={isPending}
            />
            <div className="mb-7 mt-7">
              <p className="mb-5">Add tags (Optional)</p>
              <TagsInput
                value={tags}
                onChange={setTags}
                name="tags"
                placeHolder="enter new tag"
                classNames={{
                  input: "bg-purple",
                  tag: "bg-purple",
                }}
              />
            </div>

            <Label htmlFor="public-mode" className="hidden">
              Share Publicly
            </Label>
            <p className="mb-5">
              Publish Public - by enable this feature, you can interact with
              people in community and explore your dream with others
            </p>
            <Switch
              id="public-mode"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
            <div className="mb-7">
              <button
                type="button"
                className="bg-slate-600 py-2 w-40 rounded-lg hidden"
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission
                  imageInputRef.current?.click();
                }}
                disabled={isPending}
              >
                Select Images
              </button>
            </div>
            <button
              type="button"
              onClick={handleClickUploadImagesButton}
              className="bg-slate-600 py-2 w-40 rounded-lg hidden"
              disabled={isPending}
            >
              {isPending ? "Uploading..." : "Upload Images"}
            </button>

            <SubmitButton
              pendingText="Saving..."
              className="bg-yellow text-purple font-bold md:w-auto inline-flex"
            >
              Submit
            </SubmitButton>
          </div>
        </form>
      )}
    </>
  );
}
