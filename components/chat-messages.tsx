import { useChatContext } from "@/context/chat/context";
import { useParams } from "next/navigation";
import { Chat } from "groq-sdk/resources";
import { useEffect, useState, useCallback, useRef } from "react";
import { useMarkdown } from "@/app/hooks/use-mdx";
import Avatar from "boring-avatars";


export const ChatMessages = () => {
  const { lastStream, currentSession } = useChatContext();
  const { renderMarkdown } = useMarkdown();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const lastMessageLengthRef = useRef(currentSession?.messages?.length || 0);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 50;
    setIsUserScrolling(!isAtBottom);
  }, []);

  useEffect(() => {
    const currentLength = currentSession?.messages?.length || 0;
    const isNewMessage = currentLength > lastMessageLengthRef.current;
    lastMessageLengthRef.current = currentLength;

    if (!isUserScrolling && isNewMessage && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSession?.messages, isUserScrolling]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const renderMessage = useCallback((key: string, humanMessage: string, aiMessage: string) => (
    <div key={key} className="mb-4">
      {/* Title container */}
      <div className="flex items-center gap-2 mb-2 bg-black p-4 rounded-lg relative w-fit min-w-[250px]">
        <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
          <p className="text-black font-bold">D</p>
        </div>
        <span className="text-white font-semibold">{humanMessage}</span>
      </div>
      {/* AI response */}
      <div className="pl-10 text-white bg-gray-800 p-4 rounded-lg">
        {renderMarkdown(aiMessage)}
      </div>
    </div>
  ), [renderMarkdown]);

  if (!currentSession?.messages?.length) return null;

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center  h-full overflow-y-auto"
      style={{
        scrollBehavior: 'smooth',
        maxHeight: 'calc(100vh - 200px)'
      }}
    >
      <div className="flex-1 p-4 w-full max-w-2xl mx-auto">
        {currentSession.messages.map(message =>
          renderMessage(message.id, message.rawHuman, message.rawAI)
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};



// import { useChatContext } from "@/context/chat/context";
// import { useParams } from "next/navigation";
// import { TChatSession, useChatSession } from "@/app/hooks/use-chat-session";
// import { useEffect, useState } from "react";
// import { useMarkdown } from "@/app/hooks/use-mdx";

// export const ChatMessages = () => {
//   const { sessionId } = useParams();
//   const { lastStream } = useChatContext();
//   const [currentSession, setCurrentSession] = useState<
//     TChatSession | undefined
//   >();

//   const { getSessionById } = useChatSession();
//   const {renderMarkdown} = useMarkdown()

//   const fetchSession = async () => {
//     getSessionById(sessionId!.toString()).then((session) => {
//       setCurrentSession(session);
//     });
//   };

//   useEffect(() => {
//     if (!sessionId) {
//       return;
//     }
//     fetchSession();
//   }, [sessionId]);

//   useEffect(() => {
//     if (!lastStream) {
//       fetchSession();
//     }
//   }, [lastStream]);

//   const isLastStreamBelongsToCurrentSession =
//     lastStream?.sessionId === sessionId;

//   return (
//     <div>
//       {currentSession?.messages.map((message) => (
//         <div className="p-2">
//           {message.rawHuman}
//           {renderMarkdown(message.rawAI)}
         
//         </div>
//       ))}
//       {isLastStreamBelongsToCurrentSession && (
//         <div className="p-2">
//           {lastStream?.props?.query}
//           {renderMarkdown(lastStream!.message)}
        
//         </div>
//       )}
//     </div>
//   );
// };
