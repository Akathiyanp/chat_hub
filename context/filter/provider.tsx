"use client";
import { useRouter } from "next/navigation";


import React, { useEffect, useState } from "react";
import { FiltersContext } from "./context";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
// import { useRouter } from "next/router";
import { useChatContext } from "../chat/context";
import {Chat, Plus} from "@phosphor-icons/react"
// import { Plus } from "lucide-react";
import { create } from "domain";

export type TFiltersProvider = {
  children: React.ReactNode;
};
export const FiltersProvider = ({ children }: TFiltersProvider) => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const open = () => setIsFilterOpen(true);
  const dismiss = () => setIsFilterOpen(false);

  const { sessions, createSession } = useChatContext();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsFilterOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", down);

    return () => window.removeEventListener("keydown", down);
  }, []);

  return (
    <FiltersContext.Provider value={{ open, dismiss }}>
      {children}

      <CommandDialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <CommandInput placeholder="Search..." setIsSearchActive={function (value: React.SetStateAction<boolean>): void {
          throw new Error("Function not implemented.");
        } } />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem
            
              className="gap-3"
              value="new"
              onSelect={(value) => {
                createSession().then((session)=>{
                  router.push(`/chat/${session.id}`);
                  dismiss();
                })
              }}
            >
              <Plus size={14} weight="bold"/>
              New Session
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Sessions">
            {sessions?.map((session)=>(
              <CommandItem key={session.id} value={`${session.id}/${session.title}`} className="gap-3 w-full"
              onSelect={(value)=>{
                router.push(`/chat/${session.id}`);
                dismiss();
              }}>
                <Chat size={14} weight="fill" className="text-zinc-500
                flex-shrink-0"/>{""}
                <span>{session.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </FiltersContext.Provider>
  );
};
