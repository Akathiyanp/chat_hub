



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


