import { Copy, RotateCw } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Markdown from "react-markdown";
import ClipLoader from "react-spinners/ClipLoader";

interface Prop {
  isLoading: boolean;
  response: string;
}

const Result: React.FC<Prop> = ({ isLoading, response }) => {
  const responseRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState(response);

  useEffect(() => {
    setData(response);
  }, [response]);

  const handleCopy = () => {
    if (responseRef.current) {
      const range = document.createRange();
      range.selectNodeContents(responseRef.current);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }

      navigator.clipboard
        .writeText(response)
        .then(() => {
          toast.success("Copied to clipboard");
        })
        .catch((err) => {
          toast.error(`Failed to copy: ${err}`);
        });

      setTimeout(() => {
        if (selection) {
          selection.removeAllRanges();
        }
      }, 2000);
    }
  };

  const handleClear = () => {
    setData("");
  };

  return (
    <>
      <div className="border w-full mt-4 h-72 p-4 overflow-y-auto relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <ClipLoader color="#333" />
          </div>
        ) : (
          <div className="p-2" ref={responseRef}>
            {data ? (
              <section className="prose">
                <Markdown>{data}</Markdown>
              </section>
            ) : (
              <p className="flex items-center justify-center my-20 h-full">
                No Response Available
              </p>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 justify-start cursor-pointer mt-2 w-full">
        <Copy onClick={handleCopy} />
        <RotateCw onClick={handleClear} />
        <Toaster position="top-center" />
      </div>
    </>
  );
};

export default Result;
