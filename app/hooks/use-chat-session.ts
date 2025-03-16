
"use client";
import { set, get } from "idb-keyval";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { v4 } from "uuid";

export enum ModelType {
    GPT3 = "gpt-3",
    GPT4 = "gpt-4",
    CLAUDE2 = "claude-2",
    CLAUDE3 = "claude-3",
    GEMINI = "gemini 2.0",
    GROQ = "groq",
    DEEPSEEK = "deepseek-chat",
}

export enum PromptType {
    ASK = "ask",
    ANSWER = "answer",
    EXPLAIN = "explain",
    SUMMARIZE = "summarize",
    IMPROVE = "improve",
    FIX_GRAMMAR = "fix_grammar",
    REPLY = "reply",
    SHORT_REPLY = "short_reply",
}

export enum RoleType {
    ASSISTANT = "assistant",
    WRITING_EXPERT = "writing_expert",
    SOCIAL_MEDIA_EXPERT = "social_media_expert",
}

export type PromptProps = {
    max_tokens: number;
    temperature: number;
    prompt: string;
    type: PromptType;
    context?: string;
    role: RoleType;
    query?: string;
    regenerate?: boolean;
};

export type TChatMessage = {
    id: string;
    model: ModelType;
    human: HumanMessage;
    ai: AIMessage;
    rawAI: string;
    rawHuman: string;
    messages: TChatMessage[];
    props?: PromptProps;
    createdAt?: string;
};

export type TChatSession = {
    id: string;
    messages: TChatMessage[];
    title?: string;
    createdAt: string;
};

export const useChatSession = () => {
    const getSessions = async (): Promise<TChatSession[]> => {
        return (await get("chat-sessions")) || [];
    };

    const setSession = async (chatSession: TChatSession) => {
        const sessions = await getSessions();
        const newSessions = [...sessions, chatSession];
        await set("chat-sessions", newSessions);
    };

    const createNewSession = async (): Promise<TChatSession> => {
        const sessions = await getSessions();
        const latestSession = sessions?.[0];

        if (latestSession?.messages?.length === 0) {
            return latestSession;
        }

        const newSession: TChatSession = {
            id: v4(),
            messages: [],
            title: "Untitled",
            createdAt: new Date().toISOString(),
        };

        const newSessions = [...sessions, newSession];
        await set("chat-sessions", newSessions);
        return newSession;
    };

    const getSessionById = async (id: string) => {
        const sessions = await getSessions();
        return sessions.find((session) => session.id === id);
    };

    const removeSessionById = async (id: string) => {
        const sessions = await getSessions();
        const newSessions = sessions.filter((session) => session.id !== id);
        await set("chat-sessions", newSessions);
    };

    const addMessageToSession = async (sessionId: string, chatMessage: TChatMessage) => {
        const sessions = await getSessions();
        const newSessions = sessions.map((session) => {
            if (session.id === sessionId) {
                return { ...session, messages: [...session.messages, chatMessage] };
            }
            return session;
        });
        await set("chat-sessions", newSessions);
    };

    const updateSession = async (sessionId: string, chatMessage: TChatMessage) => {
        const sessions = await getSessions();
        const newSessions = sessions.map((session) => {
            if (session.id === sessionId) {
                return {
                    ...session,
                    messages: [...session.messages, chatMessage],
                    title: chatMessage.rawHuman || session.title,
                };
            }
            return session;
        });
        await set("chat-sessions", newSessions);
    };

    return {
        getSessions,
        setSession,
        getSessionById,
        removeSessionById,
        updateSession,
        addMessageToSession,
        createNewSession,
    };
};
