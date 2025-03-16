import { useState, useCallback } from "react";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>;

export function useClipboard() {
    const [copiedText, setCopiedText] = useState<CopiedValue>(null);
    const [showCopied, setShowCopied] = useState<boolean>(false);

    const copy: CopyFn = useCallback(async (text) => {
        if (!navigator.clipboard) {
            console.warn("Clipboard not supported");
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            setShowCopied(true);

            // Hide the "Copied" message after 2 seconds
            setTimeout(() => {
                setShowCopied(false);
            }, 2000);

            return true;
        } catch (error) {
            console.warn("Copy failed", error);
            setCopiedText(null);
            return false;
        }
    }, []);

    return { copiedText, copy, showCopied };
}