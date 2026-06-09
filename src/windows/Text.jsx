import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";
import { Copy, Share } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows?.txtfile?.data;
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  if (!data) return null;

  const fullText = data.description?.join("\n") || "";
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
      setCopied(false);
    }
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{data.name}</h2>
        <div className="flex items-center gap-3 ml-auto mr-4">
          <button
            onClick={copyToClipboard}
            className="p-1 hover:bg-gray-200 rounded transition"
            title="Copy all text"
          >
            <Copy className="icon w-4" />
          </button>
          <button
            className="p-1 hover:bg-gray-200 rounded transition"
            title="Share"
          >
            <Share className="icon w-4" />
          </button>
        </div>
      </div>

      <div className="text-file-content overflow-auto h-full p-6 space-y-4">
        {data.image && (
          <div className="mb-6 flex items-center justify-center">
            <img 
              src={data.image} 
              alt={data.name} 
              className="w-full max-h-[70vh] h-auto object-contain rounded-lg shadow-md"
            />
          </div>
        )}
        
        {data.subtitle && (
          <p className="text-lg font-semibold text-gray-700 mb-4">
            {data.subtitle}
          </p>
        )}

        <div className="description space-y-4">
          {data.description && data.description.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed text-sm">
              {paragraph}
            </p>
          ))}
        </div>

        {copied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
            ✓ Copied to clipboard
          </div>
        )}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
