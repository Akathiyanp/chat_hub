// import { CodeBlock } from "@/components/codeblock";
// import { cn } from "@/lib/utils";
// import Markdown from "marked-react";
// import { JSX } from "react";

// export const useMarkdown = () => {
//     const renderMarkdown = (message: string) => {
//         return <Markdown renderer={{
//             paragraph: (children) => (
//                 <p className="text-sm leading-7" key={Math.random().toString(36)}>
//                     {children}
//                 </p>
//             ),
//             heading: (children, level) => {
//                 const Heading = `h${level}` as keyof JSX.IntrinsicElements;
//                 return (
//                     <Heading className="font-medium text-base" key={Math.random().toString(36)}>
//                         {children}
//                     </Heading>
//                 );
//             },
//             link: (href, text) => (
//                 <a href={href} target="_blank" rel="noopener noreferrer" key={Math.random().toString(36)}>
//                     {text}
//                 </a>
//             ),
//             blockquote: (children) => (
//                 <div key={Math.random().toString(36)}>
//                     <p className="text-sm leading-7">{children}</p>
//                 </div>
//             ),
//             list: (children, ordered) => {
//                 const List = ordered ? "ol" : "ul";
//                 return (
//                     <List
//                         className={cn(ordered ? "list-decimal" : "list-disc", "ml-8")}
//                         key={Math.random().toString(36)}
//                     >
//                         {children}
//                     </List>
//                 );
//             },
//             listItem: (children) => (
//                 <li className="my-4" key={Math.random().toString(36)}>
//                     <p className="text-sm leading-7">{children}</p>
//                 </li>
//             ),
//             code: (code, lang) => (
//                 <div className="my-8" key={Math.random().toString(36)}>
//                     <CodeBlock lang={lang} code={code?.toString()} />
//                 </div>
//             ),
//             codespan: (code) => (
//                 <span
//                     className="px-2 py-1 text-xs rounded text-[#41e696] bg-[#41e696]/10"
//                     key={Math.random().toString(36)}
//                 >
//                     {code}
//                 </span>
//             )
//         }}>
//             {message}
//         </Markdown>;
//     };
//     return { renderMarkdown };
// };
import { CodeBlock } from "@/components/codeblock";
import { cn } from "@/lib/utils";
import Markdown from "marked-react";
import { JSX, useId } from "react";

export const useMarkdown = () => {
    const renderMarkdown = (message: string) => {
        return <Markdown renderer={{
            paragraph: (children) => (
                <p className="text-sm leading-7" key={useId()}>
                    {children}
                </p>
            ),
            heading: (children, level) => {
                const Heading = `h${level}` as keyof JSX.IntrinsicElements;
                return (
                    <Heading className="font-medium text-base" key={useId()}>
                        {children}
                    </Heading>
                );
            },
            link: (href, text) => (
                <a href={href} target="_blank" rel="noopener noreferrer" key={href}>
                    {text}
                </a>
            ),
            blockquote: (children) => (
                <blockquote key={useId()} className="border-l-4 border-gray-500 pl-4 italic text-gray-600">
                    {children}
                </blockquote>
            ),
            list: (children, ordered) => {
                const List = ordered ? "ol" : "ul";
                return (
                    <List className={cn(ordered ? "list-decimal" : "list-disc", "ml-8")} key={useId()}>
                        {children}
                    </List>
                );
            },
            listItem: (children) => (
                <li className="my-4" key={JSON.stringify(children)}>
                    <p className="text-sm leading-7">{children}</p>
                </li>
            ),
            code: (code, lang) => (
                <div className="my-8" key={useId()}>  {/* FIXED key issue */}
                    <CodeBlock lang={lang} code={code?.toString()} />
                </div>
            ),
            codespan: (code) => (
                <span
                    className="px-2 py-1 text-xs rounded text-[#41e696] bg-[#41e696]/10"
                    key={useId()}  
                >
                    {code}
                </span>
            )
        }}>
            {message}
        </Markdown>;
    };
    return { renderMarkdown };
};
