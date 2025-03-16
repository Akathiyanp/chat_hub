// "use client"

// import {useChatContext} from "@/context/chat/context";
// import { Button } from "./button";
// import { useRouter } from "next/navigation";
// export const Sidebar = () =>{
//     const  {sessions, createSession}= useChatContext()
//     const {push}= useRouter()
//     return(
//         <div className="w-[250px] flex flex-col h-screen">
//             <Button onClick={()=>createSession()}>New Session</Button>
//             {sessions?.map((session)=>(
//                 <div className="p-2" onClick={()=>{
//                     push(`/chat/${session.id}`)

//                 }}>{session?.title}</div>
//             ))||"No sessions found"}

//         </div>
//     )

// }
"use client";

import { useChatContext } from "@/context/chat/context";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const { sessions, createSession } = useChatContext();
  const { push } = useRouter();

  return (
    <div className="w-[250px] flex flex-col h-screen">
      <Button onClick={() => createSession()}>New Session</Button>
      {sessions?.length > 0 ? (
        sessions.map((session) => (
          <div
            key={session.id} // Add a unique key here
            className="p-2"
            onClick={() => {
              push(`/chat/${session.id}`);
            }}
          >
            {session?.title || "Untitled Session"} {/* Fallback title */}
          </div>
        ))
      ) : (
        <div className="p-2">No sessions found</div>
      )}
    </div>
  );
};
