// "use client"
// import { ChatInput } from "@/components/chat-input";
// import { ChatMessages } from "@/components/chat-messages"
// import { Chat } from "groq-sdk/resources";
// import {useParams} from "next/navigation"

// const chatSessionPage = () => {
//     const { sessionId } = useParams();
//     return (
//       <div className="chat-layout flex-1 w-full h-screen flex flex-row relative overflow-hidden ">
//         <div className="search-container absolute top-0 left-0 h-16 bg-gradient-to-b dark:from-zinc-800 dark:to-transparent from-70% to-white/10 z-10">
//           <ChatInput />
//         </div>
//         <div className="messages-container">
//           <ChatMessages />
//         </div>
//       </div>
//     );
//   };

// const chatSessionPage=()=>{
//   const { sessionId } = useParams();
//   return(



// const chatSessionPage =()=>{
//     const {sessionId } = useParams();
//     return(
//         <div className="w-full h-screen flex flex-row relative  overflow-hidden ">
//           <div className="absolute top-0 left-0 bg-gradient-to-b dark:from-zinc-800 dark:to-transparent from-70% to-white/10 z-10">
//             <ChatMessages />
//             <ChatInput />

//           </div>
           
//         </div>
//     )
// } 




"use client";

import { ChatInput } from "@/components/chat-input";
import { ChatMessages } from "@/components/chat-messages";
import { useParams } from "next/navigation";

const ChatSessionPage = () => {
  const { sessionId } = useParams();

  return (
    <div className="w-full h-screen flex flex-col relative bg-zinc-800">
      {/* Messages Container */}
      <div className="flex-grow overflow-auto">
        <ChatMessages/>
      </div>

      {/* Chat Input (Sticky Bottom) */}
      <div className="w-full">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatSessionPage;




