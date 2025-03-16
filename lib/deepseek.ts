// const deepseek = {
//     chat: {
//       completions: {
//         create: async ({
//           messages,
//           temperature = 0.7,
//           max_tokens = 512,
//           stream = false,
//         }: {
//           messages: { role: string; content: string }[];
//           temperature?: number;
//           max_tokens?: number;
//           stream?: boolean;
//         }) => {
//           try {
//             const apiKey = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;
//             if (!apiKey) {
//               throw new Error("DeepSeek API Key is missing.");
//             }
  
//             if (!Array.isArray(messages) || messages.length === 0) {
//               throw new Error("Invalid messages format: Messages array is required.");
//             }
  
//             const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${apiKey}`,
//                 Accept: "application/json",
//               },
//               body: JSON.stringify({
//                 model: "deepseek-chat", // ✅ Change this to a valid DeepSeek model!
//                 messages: messages.map((msg) => ({
//                   role: msg.role === "system" ? "assistant" : msg.role,
//                   content: msg.content?.trim() || "",
//                 })),
//                 temperature,
//                 max_tokens,
//                 stream,
//               }),
                
              
//             });
  
//             if (!response.ok) {
//               const errorText = await response.text();
//               throw new Error(`DeepSeek API error (${response.status}): ${errorText}`);
//             }
  
//             if (!stream) {
//               return await response.json();
//             }
  
//             const reader = response.body?.getReader();
//             const decoder = new TextDecoder();
  
//             return {
//               async *[Symbol.asyncIterator]() {
//                 if (!reader) return;
//                 try {
//                   while (true) {
//                     const { done, value } = await reader.read();
//                     if (done) break;
  
//                     const chunk = decoder.decode(value, { stream: true });
//                     const lines = chunk.split("\n").filter((line) => line.trim() !== "");
  
//                     for (const line of lines) {
//                       if (line.startsWith("data: ")) {
//                         try {
//                           const jsonData = line.slice(6).trim();
//                           if (jsonData === "[DONE]") return;
//                           if (jsonData) {
//                             yield JSON.parse(jsonData);
//                           }
//                         } catch (e) {
//                           console.error("JSON Parse Error:", e, line.slice(6));
//                         }
//                       }
//                     }
//                   }
//                 } finally {
//                   reader.releaseLock();
//                 }
//               },
//             };
//           } catch (error) {
//             console.error("DeepSeek API Request Error:", error);
//             throw error;
//           }
//         },
//       },
//     },
//   };
  
//   export default deepseek; // ✅ Correct export
  