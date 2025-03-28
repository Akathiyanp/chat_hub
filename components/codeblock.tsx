import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import { Button } from "./ui/button";
import { useClipboard } from "@/app/hooks/use-clipboard";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

export type CodeBlockProps = {
  lang?: string;
  code?: string;
};

export const CodeBlock = ({ lang, code }: CodeBlockProps) => {
  const ref = useRef<HTMLElement>(null);
  const { copiedText, copy, showCopied } = useClipboard();

  const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";

  useEffect(() => {
    if (ref?.current && code) {
      const highlightedCode = hljs.highlight(language, code).value;
      ref.current.innerHTML = highlightedCode;
    }
  }, [code, language]);

  return (
    <div className="bg-black/20 rounded-2xl p-4">
      <div className="pl-4 pr-2 py-2 w-full flex justify-between items-center">
        <p>{language}</p>
        <Button 
          size="icon" 
          className={`button-copy ${showCopied ? "copied" : ""}`} 
          onClick={() => code && copy(code)}
        >
          {showCopied ? <CheckIcon /> : <CopyIcon />}
          {showCopied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="hljs-pre">
        <code className={`hljs language-${language} `} ref={ref} />
      </pre>
    </div>
  );
};

// import { useEffect, useRef } from "react";
// import hljs from "highlight.js";
// import { Button } from "./ui/button";
// import { useClipboard } from "@/app/hooks/use-clipboard";
// import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

// export type CodeBlockProps = {
//   lang?: string;
//   code?: string;
// };

// export const CodeBlock = ({ lang, code }: CodeBlockProps) => {
//   const ref = useRef<HTMLElement>(null);
//   const { copiedText, copy, showCopied } = useClipboard();

//   const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";

//   // Function to highlight specific keywords like "useQuery"
//   const highlightKeywords = (text: string) => {
//     return text.replace(
//       /\b(useQuery|react-query)\b/g,
//       '<span class="keyword-highlight">$1</span>'
//     );
//   };

//   useEffect(() => {
//     if (ref?.current && code) {
//       let highlightedCode = hljs.highlight(language, code).value;
//       highlightedCode = highlightKeywords(highlightedCode); // Apply keyword highlighting
//       ref.current.innerHTML = highlightedCode;
//     }
//   }, [code, language]);

//   return (
//     <div className="hljs-wrapper">
//       <div className="pl-4 pr-2 py-2 w-full flex justify-between items-center">
//         <p>{language}</p>
//         <Button
//           size="icon"
//           className={`button-copy ${showCopied ? "copied" : ""}`}
//           onClick={() => code && copy(code)}
//         >
//           {showCopied ? <CheckIcon /> : <CopyIcon />}
//           {showCopied ? "Copied" : "Copy"}
//         </Button>
//       </div>
//       <pre className="hljs-pre">
//         <code className={`hljs language-${language}`} ref={ref} />
//       </pre>
//     </div>
//   );
// };
