// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { ChatContext } from "./context";
// import { TChatSession, useChatSession, PromptProps } from "@/app/hooks/use-chat-session";
// import { TStreamProps, useLLM } from "@/app/hooks/use-llm";
// import { useParams } from "next/navigation";

// export type TChatProvider = {
//   children: React.ReactNode;
// };

// export const ChatProvider = ({ children }: TChatProvider) => {
//   const chatSession = useChatSession();
//   const { getSessions, createNewSession, getSessionById } = chatSession || {};
//   const { sessionId } = useParams();
  
//   const [sessions, setSessions] = useState<TChatSession[]>([]);
//   const [isSessionLoading, setIsSessionLoading] = useState<boolean>(true);
//   const [lastStream, setLastStream] = useState<TStreamProps>();
//   const [currentSession, setCurrentSession] = useState<TChatSession | undefined>();

//   const stableGetSessions = useCallback(getSessions, []);
//   const stableCreateNewSession = useCallback(createNewSession, []);
//   const stableGetSessionById = useCallback(getSessionById, []);

//   const fetchSessions = useCallback(async () => {
//     if (stableGetSessions) {
//       const fetchedSessions = await stableGetSessions();
//       setSessions(fetchedSessions);
//     }
//     setIsSessionLoading(false);
//   }, [stableGetSessions]);

//   const fetchSession = useCallback(async () => {
//     if (stableGetSessionById && sessionId) {
//       const session = await stableGetSessionById(sessionId.toString());
//       setCurrentSession(session);
//     }
//   }, [stableGetSessionById, sessionId]);

//   const createSession = useCallback(async () => {
//     if (stableCreateNewSession) {
//       await stableCreateNewSession();
//       await fetchSessions();
//     }
//   }, [stableCreateNewSession, fetchSessions]);

//   const { runModel: llmRunModel } = useLLM({
//     onStreamStart: () => {
//       setLastStream(undefined);
//       fetchSessions();
//     },
//     onStream: async (props) => {
//       setLastStream(props);
//     },
//     onStreamEnd: () => {
//       fetchSessions().then(() => {
//         setLastStream(undefined);
//       });
//     },
//   });

//   const runModel = useCallback(
//     async (props: PromptProps, sessionId: string) => {
//       await llmRunModel(props, sessionId);
//     },
//     [llmRunModel]
//   );

//   useEffect(() => {
//     if (sessionId) {
//       fetchSession();
//     }
//   }, [sessionId, fetchSession]);

//   useEffect(() => {
//     setIsSessionLoading(true);
//     fetchSessions();
//   }, [fetchSessions]);

//   return (
//     <ChatContext.Provider
//       value={{
//         sessions,
//         isSessionLoading,
//         lastStream,
//         currentSession,
//         createSession,
//         runModel,
//         refetchSessions: fetchSessions
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };  



// "use client";

// import React, { useEffect, useState } from  "react";

// import { ChatContext } from "./context";
// import {TChatSession, useChatSession} from "@/app/hooks/use-chat-session";

// import { TStreamProps, useLLM } from "@/app/hooks/use-llm";
// import { useParams } from "next/navigation";
// export type TChatProvider = {
//   children: React.ReactNode;
// };
// export const ChatProvider =({children}:   TChatProvider)=>{
//   const {getSessions, createNewSession, getSessionById} = useChatSession();

//   const [sessions, setSessions] = useState<TChatSession[]>([])
//   const {sessionId}= useParams();
//   const [isSessionLoading, setIsSessionLoading] = useState<boolean>(true);
//   const [lastStream, setLastStream] = useState<TStreamProps>();
//   const [currentSession, setCurrentSession] = useState<TChatSession |
//  undefined>();
 
//   const {runModel} = useLLM({
//     onStreamStart:()=>{
//       setLastStream(undefined);
//       refetchSessions();
      
//     },
//     onStream: async (props) => {
//       setLastStream(props);
//     },
//     onStreamEnd: () => {
//       fetchSessions().then(() => {
//         setLastStream(undefined);
//       });
//     },
//   })

//   const fetchSessions=async()=>{
//     const sessions = await getSessions();
//     setSessions(sessions);
//     setIsSessionLoading(false);
//   }

//   const createSession = async ()=>{
//    const newSession= await createNewSession();
//     fetchSessions();
//     return newSession;
//   }
//   const fetchSession = async()=>{
//     getSessionById(sessionId!.toString()).then((session)=>{
//       setCurrentSession(session);
//     })
//   };

//   useEffect(()=>{
//     if(!sessionId){
//       return;
//     }
//     fetchSession();
//   },[sessionId])
//   useEffect(()=>{
//     setIsSessionLoading(true);
//     fetchSessions();
//   },[]);
//   const refetchSessions= ()=>{
//     fetchSessions();

//   }
//   return(
//     <ChatContext.Provider value={{sessions, refetchSessions, isSessionLoading, lastStream, createSession, runModel, currentSession:currentSession}}>
//       {children}
//     </ChatContext.Provider>
//   )
// }

"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ChatContext } from "./context";
import { TChatSession, useChatSession } from "@/app/hooks/use-chat-session";
import { TStreamProps, useLLM } from "@/app/hooks/use-llm";
import { useParams } from "next/navigation";

export type TChatProvider = {
  children: React.ReactNode;
};

export const ChatProvider = ({ children }: TChatProvider) => {
  const { getSessions, createNewSession, getSessionById } = useChatSession();
  const [sessions, setSessions] = useState<TChatSession[]>([]);
  const { sessionId } = useParams();
  const [isSessionLoading, setIsSessionLoading] = useState<boolean>(true);
  const [lastStream, setLastStream] = useState<TStreamProps>();
  const [currentSession, setCurrentSession] = useState<TChatSession | undefined>();
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchSessions = useCallback(async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const sessions = await getSessions();
      setSessions(sessions);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setIsUpdating(false);
      setIsSessionLoading(false);
    }
  }, [getSessions, isUpdating]);

  const { runModel } = useLLM({
    onStreamStart: () => {
      setLastStream(undefined);
    },
    onStream: async (props) => {
      setLastStream(props);
    },
    onStreamEnd: async () => {
      await fetchSessions();
      setLastStream(undefined);
    },
  });

  const createSession = async () => {
    try {
      const newSession = await createNewSession();
      await fetchSessions();
      return newSession;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  };

  const fetchSession = useCallback(async () => {
    if (!sessionId || isUpdating) return;
    try {
      const session = await getSessionById(sessionId.toString());
      setCurrentSession(session);
    } catch (error) {
      console.error('Error fetching session:', error);
    }
  }, [sessionId, getSessionById, isUpdating]);

  useEffect(() => {
    if (!sessionId) return;
    fetchSession();
  }, [sessionId, fetchSession]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const refetchSessions = useCallback(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <ChatContext.Provider 
      value={{
        sessions, 
        refetchSessions, 
        isSessionLoading, 
        lastStream, 
        createSession, 
        runModel, 
        currentSession
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};