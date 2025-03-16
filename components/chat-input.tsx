
"use client";
import { useChatContext } from "@/context/chat/context";
import { useParams, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { PromptType, RoleType } from "@/app/hooks/use-chat-session";
import { Button } from "./ui/button";
import { Command, Plus } from "lucide-react";
import { Badge } from "./ui/badge";

export const ChatInput = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [inputValue, setInputValue] = useState("");
  const { runModel, currentSession,createSession } = useChatContext();
  const isNewSession = !currentSession?.messages?.length;
  const router = useRouter();
  const examples = [
    "What is quantum computing?",
    "What are qubits?",
    "What is the GDP of the USA?",
    "What is multi-planetary ideology?",
  ];

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    if(sessionId){
      inputRef?.current?.focus()
    }
  },[sessionId])

  const handleKeyDown=(e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === "Enter") {
      runModel({
        role: RoleType.ASSISTANT,
        type: PromptType.ASK,
        query: inputValue,
        max_tokens: 0,
        temperature: 0,
        prompt: "",

      }, sessionId!.toString()

      );
      setInputValue("");
    }
  }


  return (
  

<div className="w-full flex flex-col items-center justify-center px-4 pb-6 pt-4 bg-gradient-to-t from-white dark:from-zinc-800 dark:to-transparent from-70% to-white/10">
  {isNewSession && (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg text-center">
        {examples.map((example, index) => (
          <div
            key={index}
            onClick={() => {
              runModel(
                {
                  role: RoleType.ASSISTANT,
                  type: PromptType.ASK,
                  query: example,
                  max_tokens: 0,
                  temperature: 0,
                  prompt: "",
                },
                sessionId!.toString()
              );
            }}
            className="flex justify-center items-center text-sm py-3 px-4 bg-black/20 text-white rounded-lg hover:bg-black/30 transition cursor-pointer"
          >
            {example}
          </div>
        ))}
      </div>
    </div>
  )}

<div className="flex justify-center w-full">
      <div className="flex items-center gap-2 p-2 mt-4 w-full max-w-[700px] rounded-2xl bg-white/10">
        <Button variant="ghost" size={"icon"} className="h-8 w-8 bg-white/100 px-2  " onClick={()=>{
          createSession().then((session)=>{
            router.push(`/chat/${session.id}`)

          });

        }}>
          <Plus className="h-4 w-4 text-black" />
        </Button>

        <Input value={inputValue} ref={inputRef}
        onChange={(e)=>{
          setInputValue(e.currentTarget.value)
        }}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Ask ChatHub anything..."
          className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0"
        />

        <Badge  className="h-8 px-2 ">
          <Command className="h-4 w-4 text-black" />
        </Badge>
      </div>
    </div>
</div>

  );
};
// "use client";
// import { useChatContext } from "@/context/chat/context";
// import { useParams, useRouter } from "next/navigation";
// import { Input } from "./ui/input";
// import { useEffect, useRef, useState } from "react";
// import { PromptType, RoleType } from "@/app/hooks/use-chat-session";
// import { Button } from "./ui/button";
// import { Command, Plus } from "lucide-react";
// import { Badge } from "./ui/badge";

// export const ChatInput = () => {
//   const { sessionId } = useParams<{ sessionId?: string }>(); // Handle undefined sessionId
//   const [inputValue, setInputValue] = useState("");
//   const { runModel, currentSession, createSession } = useChatContext();
//   const isNewSession = !currentSession?.messages?.length;
//   const router = useRouter();
//   const examples = [
//     "What is quantum computing?",
//     "What are qubits?",
//     "What is the GDP of the USA?",
//     "What is multi-planetary ideology?",
//   ];

//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (sessionId) {
//       inputRef?.current?.focus();
//     }
//   }, [sessionId]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && inputValue.trim() !== "") {
//       e.preventDefault(); // Prevent unintended behavior
//       if (sessionId) {
//         runModel(
//           {
//             role: RoleType.ASSISTANT,
//             type: PromptType.ASK,
//             query: inputValue,
//             max_tokens: 0,
//             temperature: 0,
//             prompt: "",
//           },
//           sessionId
//         );
//         setInputValue("");
//       }
//     }
//   };

//   return (
//     <div className="w-full flex flex-col items-center justify-center px-4 pb-6 pt-4 bg-gradient-to-t from-white dark:from-zinc-800 dark:to-transparent from-70% to-white/10">
//       {isNewSession && (
//         <div className="flex justify-center w-full">
//           <div className="grid grid-cols-2 gap-4 w-full max-w-lg text-center">
//             {examples.map((example, index) => (
//               <div
//                 key={index}
//                 onClick={() => {
//                   if (sessionId) {
//                     runModel(
//                       {
//                         role: RoleType.ASSISTANT,
//                         type: PromptType.ASK,
//                         query: example,
//                         max_tokens: 0,
//                         temperature: 0,
//                         prompt: "",
//                       },
//                       sessionId
//                     );
//                   }
//                 }}
//                 className="flex justify-center items-center text-sm py-3 px-4 bg-black/20 text-white rounded-lg hover:bg-black/30 transition cursor-pointer"
//               >
//                 {example}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center w-full">
//         <div className="flex items-center gap-2 p-2 mt-4 w-full max-w-[700px] rounded-2xl bg-white/10">
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-8 w-8 bg-white px-2"
//             onClick={() => {
//               createSession().then((session) => {
//                 if (session?.id) {
//                   router.push(`/chat/${session.id}`);
//                 }
//               });
//             }}
//           >
//             <Plus className="h-4 w-4 text-black" />
//           </Button>

//           <Input
//             value={inputValue}
//             ref={inputRef}
//             onChange={(e) => setInputValue(e.currentTarget.value)}
//             onKeyDown={handleKeyDown}
//             type="text"
//             placeholder="Ask ChatHub anything..."
//             className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0"
//           />

//           <Badge className="h-8 px-2">
//             <Command className="h-4 w-4 text-black" />
//           </Badge>
//         </div>
//       </div>
//     </div>
//   );
// };
