// "use client";
// import { useState, useCallback } from "react";
// import deepseek from "@/lib/deepseek";

// import { PromptProps } from "./use-chat-session";

// export type TStreamProps = {
//   content: string;
//   sessionId: string;
// };

// export type TUseLLMConfig = {
//   onStreamStart?: () => void;
//   onStream?: (props: TStreamProps) => void;
//   onStreamEnd?: () => void;
// };

// export const useLLM = (config: TUseLLMConfig) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);

//   const runModel = useCallback(async (props: PromptProps, sessionId: string) => {
//     setIsLoading(true);
//     setError(null);
//     config.onStreamStart?.();

//     try {
//       const stream = await deepseek.chat.completions.create({
//         messages: [{ role: "user", content: props.prompt }],
//         temperature: props.temperature,
//         max_tokens: props.max_tokens,
//         stream: true,
//       });

//       let fullResponse = "";

//       for await (const chunk of stream) {
//         const content = chunk.choices[0]?.delta?.content || "";
//         fullResponse += content;
//         config.onStream?.({
//           content: fullResponse,
//           sessionId: sessionId
//         });
//       }

//       config.onStreamEnd?.();
//       return fullResponse;

//     } catch (error) {
//       setError(error as Error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   }, [config]);

//   return { runModel, isLoading, error };
// };

// groq
import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || "",
  dangerouslyAllowBrowser: true
});

import {
  PromptProps,
  useChatSession,
  TChatMessage,
  ModelType,
} from "./use-chat-session";
import { v4 } from "uuid";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { getInstruction, getRole } from "@/lib/prompts";

export type TStreamProps = {
  isLoading: any;
  props: PromptProps;
  sessionId: string;
  message: string;
};

export type TUseLLM = {
  onStreamStart: () => void;
  onStream: (props: TStreamProps) => Promise<void>;
  onStreamEnd: () => void;
};

export const useLLM = ({ onStream, onStreamEnd, onStreamStart }: TUseLLM) => {
  const { getSessionById, addMessageToSession } = useChatSession() as any;

  const preparePrompt = async (props: PromptProps, history: TChatMessage[]) => {
    const messageHistory = history;
    const role = getRole(props.role);
    const instruction = getInstruction(props.type);

    const previousMessages = messageHistory.map(msg => ({
      role: msg.rawHuman ? "user" : "assistant",
      content: msg.rawHuman || msg.rawAI,
    }));

    const systemMessage = messageHistory?.length > 0
      ? `You are ${role}. Answer user's question based on the following context:`
      : props?.context
        ? `You are ${role}. Answer user's question based on the following context: ${props.context}`
        : `You are ${role}. ${instruction}`;

    return {
      messages: [
        { role: "system", content: systemMessage } as const, // Ensure correct typing
        ...previousMessages.map((msg) => ({
          role: msg.role as "system" | "user" | "assistant", // Explicitly set valid roles
          content: msg.content,
        })),
        { role: "user", content: props.query || "" } as const
      ],
    };
  };

  const runModel = async (props: PromptProps, sessionId: string) => {
    if (!props?.query) return;

    const currentSession = await getSessionById(sessionId);
    const newMessageId = v4();

    const { messages } = await preparePrompt(props, currentSession?.messages || []);

    try {
      onStreamStart();

      const completion = await groq.chat.completions.create({
        messages: messages as any, // Temporary fix if TypeScript still complains
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
        max_tokens: 2048,
        stream: true
      });

      let streamedMessages = "";

      for await (const chunk of completion) {
        if (chunk.choices?.[0]?.delta?.content) {
          const chunkText = chunk.choices[0].delta.content;
          streamedMessages += chunkText;
          await onStream({
            props, sessionId, message: streamedMessages,
            isLoading: undefined
          });
        }
      }

      const formattedMessages = [
        new HumanMessage({ content: props.query || "" }),
        new AIMessage({ content: streamedMessages })
      ];

      // const chatMessage: TChatMessage = {
      //   messages: formattedMessages,
      //   id: newMessageId,
      //   model: ModelType.GROQ,
      //   human: new HumanMessage({ content: props.query || "" }),
      //   ai: new AIMessage({ content: streamedMessages }),
      //   rawHuman: props.query || "",
      //   rawAI: streamedMessages,
      //   props,
      //   createdAt: new Date().toISOString(),
      // };
const chatMessage: TChatMessage = {
  messages: [
    {
      id: newMessageId,
      model: ModelType.GROQ,
      human: new HumanMessage({ content: props.query || "" }),
      ai: new AIMessage({ content: streamedMessages }),
      rawHuman: props.query || "",
      rawAI: streamedMessages,
      props,
      createdAt: new Date().toISOString(),
      messages: []
    },
  ],
  id: newMessageId,
  model: ModelType.GROQ,
  human: new HumanMessage({ content: props.query || "" }),
  ai: new AIMessage({ content: streamedMessages }),
  rawHuman: props.query || "",
  rawAI: streamedMessages,
  props,
  createdAt: new Date().toISOString(),
};
      await addMessageToSession(sessionId, chatMessage);
      onStreamEnd();
    } catch (error) {
      console.error("Error in Groq API call:", error);
      throw error;
    }
  };

  return {
    runModel,
  };
};

// import { GoogleGenerativeAI } from "@google/generative-ai";
// import {
//   PromptProps,
//   useChatSession,
//   TChatMessage,
//   ModelType,
// } from "./use-chat-session";
// import { v4 } from "uuid";
// import { AIMessage, HumanMessage } from "@langchain/core/messages";
// import { getInstruction, getRole } from "@/lib/prompts";

// export type TStreamProps = {
//   props: PromptProps;
//   sessionId: string;
//   message: string;
// };

// export type TUseLLM = {
//   onStreamStart: () => void;
//   onStream: (props: TStreamProps) => Promise<void>;
//   onStreamEnd: () => void;
// };

// export const useLLM = ({ onStream, onStreamEnd, onStreamStart }: TUseLLM) => {
//   const { getSessionById, addMessageToSession } = useChatSession() as any;

//   const preparePrompt = async (props: PromptProps, history: TChatMessage[]) => {
//     const messageHistory = history;
//     const role = getRole(props.role);
//     const instruction = getInstruction(props.type);

//     // Format history into Gemini-compatible format
//     const previousMessages = messageHistory.map((msg) => ({
//       role: msg.rawHuman ? "user" : "model",
//       parts: [{ text: msg.rawHuman || msg.rawAI }],
//     }));

//     // Prepare system message
//     const systemMessage =
//       messageHistory?.length > 0
//         ? `You are ${role}. Answer user's question based on the following context:`
//         : props?.context
//         ? `You are ${role}. Answer user's question based on the following context: ${props.context}`
//         : `You are ${role}. ${instruction}`;

//     return {
//       messages: previousMessages,
//       systemPrompt: systemMessage,
//       userInput: props.query || "",
//     };
//   };

//   const runModel = async (props: PromptProps, sessionId: string) => {
//     if (!props?.query) {
//       return;
//     }

//     const currentSession = await getSessionById(sessionId);
//     const newMessageId = v4();

//     // Initialize Gemini AI
//     const genAI = new GoogleGenerativeAI(
//       process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
//         ""
//     );
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0" });

//     const { messages, systemPrompt, userInput } = await preparePrompt(
//       props,
//       currentSession?.messages || []
//     );

//     // Start chat
//     const chat = model.startChat({
//       history: messages,
//       generationConfig: {
//         maxOutputTokens: 2048,
//       },
//     });

//     try {
//       onStreamStart();

//       // Send message and get streaming response
//       const result = await chat.sendMessageStream(
//         `${systemPrompt}\n\nUser: ${userInput}`
//       );

//       let streamedMessages = "";

//       for await (const chunk of result.stream) {
//         const chunkText = chunk.text();
//         streamedMessages += chunkText;
//         await onStream({ props, sessionId, message: streamedMessages });
//       }

//       const chatMessage: TChatMessage = {
//         id: newMessageId,
//         model: ModelType.GPT3,
//         human: new HumanMessage(props.query),
//         ai: new AIMessage(streamedMessages),
//         rawHuman: props.query,
//         rawAI: streamedMessages,
//         props,
//         createdAt: new Date().toISOString(),
//         messages: [],
//       };

//       await addMessageToSession(sessionId, chatMessage).then(() => {
//         onStreamEnd();
//       });
//     } catch (error) {
//       const errorMessage = (error as Error).message; // Type assertion to Error
//       console.error("Error in Gemini API call:", errorMessage); // Log the error message
//       throw error;
//     }
//   };

//   return {
//     runModel,
//   };
// };

// old
// import { GoogleGenerativeAI } from "@google/generative-ai";

// import {
//   PromptProps,
//   useChatSession,
//   TChatMessage,
//   ModelType,
// } from "./use-chat-session";
// import { v4 } from "uuid";
// import { AIMessage, HumanMessage } from "@langchain/core/messages";
// import { getInstruction, getRole } from "@/lib/prompts";

// export type TStreamProps = {
//   props: PromptProps;
//   sessionId: string;
//   message: string;
// };

// export type TUseLLM = {
//   onStreamStart: () => void;
//   onStream: (props: TStreamProps) => Promise<void>;
//   onStreamEnd: () => void;
// };

// export const useLLM = ({ onStream, onStreamEnd, onStreamStart }: TUseLLM) => {
//   const { getSessionById, addMessageToSession } = useChatSession() as any;

//   const preparePrompt = async (props: PromptProps, history: TChatMessage[]) => {
//     const messageHistory = history;
//     const role = getRole(props.role);
//     const instruction = getInstruction(props.type);

//     // Format history into Gemini-compatible format
//     const previousMessages = messageHistory.map(msg => ({
//       role: msg.rawHuman ? "user" : "model",
//       parts: [{ text: msg.rawHuman || msg.rawAI }],
//     }));

//     // Prepare system message
//     const systemMessage = messageHistory?.length > 0
//       ? `You are ${role}. Answer user's question based on the following context:`
//       : props?.context
//         ? `You are ${role}. Answer user's question based on the following context: ${props.context}`
//         : `You are ${role}. ${instruction}`;

//     return {
//       messages: previousMessages,
//       systemPrompt: systemMessage,
//       userInput: props.query || "",
//     };
//   };

//   const runModel = async (props: PromptProps, sessionId: string) => {
//     if (!props?.query) {
//       return;
//     }

//     const currentSession = await getSessionById(sessionId);
//     const newMessageId = v4();

//     // Initialize Gemini AI
//     const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const { messages, systemPrompt, userInput } = await preparePrompt(
//       props,
//       currentSession?.messages || []
//     );

//     // Start chat
//     const chat = model.startChat({
//       history: messages,
//       generationConfig: {
//         maxOutputTokens: 2048,
//       },
//     });

//     try {
//       onStreamStart();

//       // Send message and get streaming response
//       const result = await chat.sendMessageStream(
//         `${systemPrompt}\n\nUser: ${userInput}`
//       );

//       let streamedMessages = "";

//       for await (const chunk of result.stream) {
//         const chunkText = chunk.text();
//         streamedMessages += chunkText;
//         await onStream({ props, sessionId, message: streamedMessages });
//       }

//       const chatMessage: TChatMessage = {
//         id: newMessageId,
//         model: ModelType.GPT3,
//         human: new HumanMessage(props.query),
//         ai: new AIMessage(streamedMessages),
//         rawHuman: props.query,
//         rawAI: streamedMessages,
//         props,
//         createdAt: new Date().toISOString(),
//         messages: [],
//       };

//       await addMessageToSession(sessionId, chatMessage).then(() => {
//         onStreamEnd();
//       });
//     } catch (error) {
//       console.error("Error in Gemini API call:", error);
//       throw error;
//     }
//   };

//   return {
//     runModel,
//   };
// };

//very old

// import { ChatOpenAI } from "@langchain/openai";
// import {
//   PromptProps,
//   useChatSession,
//   TChatMessage,
//   ModelType,
// } from "./use-chat-session";
// import { v4 } from "uuid";
// import {
//   ChatPromptTemplate,
//   MessagesPlaceholder,
// } from "@langchain/core/prompts";

// import { getInstruction, getRole } from "@/lib/prompts";
// import { AIMessage, HumanMessage } from "@langchain/core/messages";

// export type TStreamProps = {
//   props: PromptProps;
//   sessionId: string;
//   message: string;
// };

// export type TUseLLM = {
//   onStreamStart: () => void;
//   onStream: (props: TStreamProps) => Promise<void>;
//   onStreamEnd: () => void;
// };
// export const useLLM = ({ onStream, onStreamEnd, onStreamStart }: TUseLLM) => {
//   const { getSessionById, addMessageToSession } = useChatSession() as any;

//   const preparePrompt = async (props: PromptProps, history: TChatMessage[]) => {
//     const messageHistory = history;
//     const prompt = ChatPromptTemplate.fromMessages(
//       messageHistory?.length > 0
//         ? [
//             [
//               "system",
//               "You are {role} Answer user's question based on the following context:",
//             ],
//             new MessagesPlaceholder("chat_history"),
//             ["user", "{input}"],
//           ]
//         : [
//             props?.context
//               ? [
//                   "system",
//                   "You are {role} Answer user's question based on the following context:{context}",
//                 ]
//               : ["system", "You are {role}.{type}"],
//             ["user", "{input}"],
//           ]
//     );
//     const previousMessageHistory = messageHistory.reduce(
//       (acc: (HumanMessage | AIMessage)[], { rawAI, rawHuman }) => [
//         ...acc,
//         new HumanMessage(rawHuman),
//         new AIMessage(rawAI),
//       ],
//       []
//     );

//     return await prompt.formatMessages(
//       messageHistory?.length > 0
//         ? {
//             role: getRole(props.role),
//             chat_history: previousMessageHistory,
//             input: props.query,
//           }
//         : {
//             role: getRole(props.role),
//             type: getInstruction(props.type),
//             context: props.context,
//             input: props.query,
//           }
//     );
//   };

//   const runModel = async (props: PromptProps, sessionId: string) => {
//     const currentSession = await getSessionById(sessionId);

//     if (!props?.query) {
//       return;
//     }

//     const apiKey = ""
//     const model = new ChatOpenAI({
//       modelName: "gpt-3.5-turbo",
//       openAIApiKey: apiKey || process.env.NEXT_PUBLIC_OPENAI_API_KEY,
//     });
//     const newMessageId = v4();

//     const formattedChatPrompt = await preparePrompt(
//       props,
//       currentSession?.messages || []
//     );
//     const stream = await model.stream(formattedChatPrompt);

//     let streamedMessages = "";

//     onStreamStart();
//     for await (const chunk of stream) {
//       streamedMessages += chunk.content;
//       onStream({ props, sessionId, message: streamedMessages });
//     }

//     const chatMessage: TChatMessage = {
//       messages: formattedChatPrompt, // Added missing messages field
//       id: newMessageId,
//       model: ModelType.GPT3,
//       human: new HumanMessage(props.query),
//       ai: new AIMessage(streamedMessages),
//       rawHuman: props.query,
//       rawAI: streamedMessages,
//       props,
//       createdAt: new Date().toISOString(), // Added missing createdAt field
//     };

//     await addMessageToSession(sessionId, chatMessage).then(() => {
//       onStreamEnd();
//     });
//   };

//   return {
//     runModel,
//   };
// };
