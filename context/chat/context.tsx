
"use client"
import { createContext, useContext } from "react"
import { PromptProps, TChatSession } from "@/app/hooks/use-chat-session"
import { TStreamProps } from "@/app/hooks/use-llm"

export type TChatContext = {
    sessions: TChatSession[]
    refetchSessions: () => void
    isSessionLoading: boolean
    createSession: () => Promise<TChatSession>
    currentSession: TChatSession | undefined;
    lastStream?: TStreamProps
    runModel: (props: PromptProps, sessionId: string) => Promise<void>
}

export const ChatContext = createContext<TChatContext | undefined>(undefined)

export const useChatContext = () => {
    const context = useContext(ChatContext)

    if (!context) {
        throw new Error("useChatContext must be used within a ChatProvider")
    }
    return context
}