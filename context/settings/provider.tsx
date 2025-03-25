// import React, { useState, createContext } from "react";
// import { Dialog, DialogContent } from "@radix-ui/react-dialog";
// import { Button } from "@/components/ui/button";

// export const SettingsContext = createContext({});

// export type TSettingsProvider = {
//   children: React.ReactNode;
// };

// export type TSettingsMenuItem = {
//   name: string;
//   key: string;
//   component: React.ReactNode;
// };

// export const SettingsProvider = ({ children }: TSettingsProvider) => {
//   const [isSettingOpen, setIsSettingOpen] = useState(true);
//   const [selectedMenu, setSelectedMenu] = useState("profile");

//   const open = () => setIsSettingOpen(true);
//   const dismiss = () => setIsSettingOpen(false);

//   const settingMenu: TSettingsMenuItem[] = [
//     {
//       name: "Profile",
//       key: "profile",
//       component: <div>Profile</div>,
//     },
//     {
//       name: "Prompts",
//       key: "prompts",
//       component: <div>Prompts</div>,
//     },
//     {
//       name: "Roles",
//       key: "roles",
//       component: <div>Roles</div>,
//     },
//   ];
//   const modelsMenu: TSettingsMenuItem[] = [
//     {
//       name: "OpenAI",
//       key: "open-ai",
//       component: <div>OpenAI</div>,
//     },
//     {
//       name: "Anthropic",
//       key: "anthropic",
//       component: <div>Anthropic</div>,
//     },
//     {
//       name: "Gemini",
//       key: "gemini",
//       component: <div>Gemini</div>,
//     },
//   ];
//   const allMenu = [...settingMenu, ...modelsMenu];
//   const selectedMenuItem = allMenu.find((menu) => menu.key === selectedMenu);

//   return (
//     <SettingsContext.Provider value={{ open, dismiss }}>
//       {isSettingOpen && (
//         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
//           <div className="w-[250px] bg-black/20 p-2 flex flex-col">
//             <p className="px-4 py-2 text-xs font-semibold text-white/30">
//               GENERAL
//             </p>
//             {settingMenu.map((menu) => (
//               <Button
//                 variant={selectedMenu === menu.key ? "secondary" : "ghost"}
//                 key={menu.key}
//                 onClick={() => setSelectedMenu(menu.key)}
//                 className="justify-start"
//                 size={"default"}
//               >
//                 {menu.name}
//               </Button>
//             ))}
//             <p className="px-4 py-2 text-xs font-semibold text-white/30">MODELS</p>
//             {modelsMenu.map((menu) => (
//               <Button
//                 variant={selectedMenu === menu.key ? "secondary" : "ghost"}
//                 key={menu.key}
//                 onClick={() => setSelectedMenu(menu.key)}
//                 className="justify-start"
//                 size={"default"}
//               >
//                 {menu.name}
//               </Button>
//             ))}
//           </div>
//         </div>
//       )}
//       {children}
//     </SettingsContext.Provider>
//   );
// };

// import React, { useState, createContext } from "react";
// import { Button } from "@/components/ui/button";

// export const SettingsContext = createContext({});

// export type TSettingsProvider = {
//   children: React.ReactNode;
// };

// export type TSettingsMenuItem = {
//   name: string;
//   key: string;
//   component: React.ReactNode;
// };

// export const SettingsProvider = ({ children }: TSettingsProvider) => {
//   const [isSettingOpen, setIsSettingOpen] = useState(true);
//   const [selectedMenu, setSelectedMenu] = useState("profile");

//   const open = () => setIsSettingOpen(true);
//   const dismiss = () => setIsSettingOpen(false);

//   const settingMenu: TSettingsMenuItem[] = [
//     { name: "Profile", key: "profile", component: <div>Profile</div> },
//     { name: "Prompts", key: "prompts", component: <div>Prompts</div> },
//     { name: "Roles", key: "roles", component: <div>Roles</div> },
//   ];
//   const modelsMenu: TSettingsMenuItem[] = [
//     { name: "OpenAI", key: "open-ai", component: <div>OpenAI</div> },
//     { name: "Anthropic", key: "anthropic", component: <div>Anthropic</div> },
//     { name: "Gemini", key: "gemini", component: <div>Gemini</div> },
//   ];
//   const allMenu = [...settingMenu, ...modelsMenu];
//   const selectedMenuItem = allMenu.find((menu) => menu.key === selectedMenu);

//   return (
//     <SettingsContext.Provider value={{ open, dismiss }}>
//       {isSettingOpen && (
//         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50">
//           <div className="w-[420px] bg-black/80 backdrop-blur-md p-4 rounded-md shadow-lg flex">
//             {/* Left Sidebar */}
//             <div className="w-1/2 border-r border-white/10 pr-2">
//               <p className="px-4 py-2 text-xs font-semibold text-white/50">GENERAL</p>
//               {settingMenu.map((menu) => (
//                 <Button
//                   variant={selectedMenu === menu.key ? "secondary" : "ghost"}
//                   key={menu.key}
//                   onClick={() => setSelectedMenu(menu.key)}
//                   className="w-full justify-start text-white px-4 py-2 font-medium rounded-md"
//                 >
//                   {menu.name}
//                 </Button>
//               ))}
//               <p className="px-4 py-2 text-xs font-semibold text-white/50">MODELS</p>
//               {modelsMenu.map((menu) => (
//                 <Button
//                   variant={selectedMenu === menu.key ? "secondary" : "ghost"}
//                   key={menu.key}
//                   onClick={() => setSelectedMenu(menu.key)}
//                   className="w-full justify-start text-white px-4 py-2 font-medium rounded-md"
//                 >
//                   {menu.name}
//                 </Button>
//               ))}
//             </div>

//             {/* Right Content */}
//             <div className="w-1/2 pl-4 flex flex-col">
//               <div className="flex justify-between items-center">
//                 <p className="text-white font-semibold">{selectedMenuItem?.name}</p>
//                 <button onClick={dismiss} className="text-white/50 hover:text-white text-lg">✕</button>
//               </div>
//               <div className="mt-4 text-white">{selectedMenuItem?.component}</div>
//             </div>
//           </div>
//         </div>
//       )}
//       {children}
//     </SettingsContext.Provider>
//   );
// };

// import React, { useState, createContext, useContext } from "react";
// import { Button } from "@/components/ui/button";

// type SettingsContextType = {
//   open: () => void;
//   dismiss: () => void;
//   selectedMenu: string;
//   setSelectedMenu: (key: string) => void;
// };

// export const SettingsContext = createContext<SettingsContextType>({
//   open: () => {},
//   dismiss: () => {},
//   selectedMenu: "profile",
//   setSelectedMenu: () => {},
// });

// export const useSettings = () => useContext(SettingsContext);

// export type SettingsProviderProps = {
//   children: React.ReactNode;
// };

// export type SettingsMenuItem = {
//   name: string;
//   key: string;
//   component: React.ReactNode;
// };

// export const SettingsProvider = ({ children }: SettingsProviderProps) => {
//   const [isSettingOpen, setIsSettingOpen] = useState(true);
//   const [selectedMenu, setSelectedMenu] = useState("profile");

//   const open = () => setIsSettingOpen(true);
//   const dismiss = () => setIsSettingOpen(false);

//   const settingMenu: SettingsMenuItem[] = [
//     { name: "Profile", key: "profile", component: <div>Profile</div> },
//     { name: "Prompts", key: "prompts", component: <div>Prompts</div> },
//     { name: "Roles", key: "roles", component: <div>Roles</div> },
//   ];

//   const modelsMenu: SettingsMenuItem[] = [
//     { name: "OpenAI", key: "open-ai", component: <div>OpenAI</div> },
//     { name: "Anthropic", key: "anthropic", component: <div>Anthropic</div> },
//     { name: "Gemini", key: "gemini", component: <div>Gemini</div> },
//   ];

//   const allMenu = [...settingMenu, ...modelsMenu];
//   const selectedMenuItem = allMenu.find((menu) => menu.key === selectedMenu);

//   return (
//     <SettingsContext.Provider
//       value={{ open, dismiss, selectedMenu, setSelectedMenu }}
//     >
//       {isSettingOpen && (
//         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-50">
//           <div className="w-[600px] bg-black/80 backdrop-blur-md rounded-md shadow-lg">
//             {/* Header */}
//             <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
//               <span className="text-xl text-white/50 uppercase font-bold">
//                 GENERAL
//               </span>
//               <button
//                 onClick={dismiss}
//                 className="text-white/50 hover:text-white text-xl"
//                 aria-label="Close settings"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Main Content */}
//             <div className="flex">
//               {/* Left Sidebar */}
//               <div className="w-[150px] p-4 border-r border-white/10">
//                 <div className="space-y-1">
//                   {settingMenu.map((menu) => (
//                     <Button
//                       variant={
//                         selectedMenu === menu.key ? "secondary" : "ghost"
//                       }
//                       key={menu.key}
//                       onClick={() => setSelectedMenu(menu.key)}
//                       className="w-full text-left text-white/80 hover:text-white px-3 py-2 font-normal rounded-md"
//                     >
//                       {menu.name}
//                     </Button>
//                   ))}

//                   <div className="pt-4">
//                     <p className="text-xl text-white/50 uppercase mb-1">
//                       MODELS
//                     </p>
//                     {modelsMenu.map((menu) => (
//                       <Button
//                         variant={
//                           selectedMenu === menu.key ? "secondary" : "ghost"
//                         }
//                         key={menu.key}
//                         onClick={() => setSelectedMenu(menu.key)}
//                         className="w-full text-left text-white/80 hover:text-white px-3 py-2 font-normal rounded-md"
//                       >
//                         {menu.name}
//                       </Button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Right Content */}
//               <div className="flex-1 p-6">
//                 <p className="text-white text-lg font-semibold">
//                   {selectedMenuItem?.name}
//                 </p>
//                 <div className="text-white mt-4">
//                   {selectedMenuItem?.component}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {children}
//     </SettingsContext.Provider>
//   );
// };


// import React, { useState, createContext } from "react";
// import { Button } from "@/components/ui/button";

// export const SettingsContext = createContext({});

// export type TSettingsProvider = {
//   children: React.ReactNode;
// };

// export type TSettingsMenuItem = {
//   name: string;
//   key: string;
//   component: React.ReactNode;
// };

// export const SettingsProvider = ({ children }: TSettingsProvider) => {
//   const [isSettingOpen, setIsSettingOpen] = useState(true);
//   const [selectedMenu, setSelectedMenu] = useState("profile");

//   const open = () => setIsSettingOpen(true);
//   const dismiss = () => setIsSettingOpen(false);

//   const settingMenu: TSettingsMenuItem[] = [
//     { name: "Profile", key: "profile", component: <div>Profile</div> },
//     { name: "Prompts", key: "prompts", component: <div>Prompts</div> },
//     { name: "Roles", key: "roles", component: <div>Roles</div> },
//   ];
//   const modelsMenu: TSettingsMenuItem[] = [
//     { name: "OpenAI", key: "open-ai", component: <div>OpenAI</div> },
//     { name: "Anthropic", key: "anthropic", component: <div>Anthropic</div> },
//     { name: "Gemini", key: "gemini", component: <div>Gemini</div> },
//   ];
//   const allMenu = [...settingMenu, ...modelsMenu];
//   const selectedMenuItem = allMenu.find((menu) => menu.key === selectedMenu);

//   return (
//     <SettingsContext.Provider value={{ open, dismiss }}>
//       {isSettingOpen && (
//         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/80">
//           <div className="w-[500px] bg-black/10 backdrop-blur-md p-0 rounded-md shadow-lg flex overflow-hidden">
//             {/* Left Sidebar - Darker Black */}
//             <div className="w-1/3 bg-black/10 border-r border-white/10 p-4">
//               <p className="px-2 py-2 text-xs font-semibold text-white/50">GENERAL</p>
//               {settingMenu.map((menu) => (
//                 <Button
//                   variant={selectedMenu === menu.key ? "secondary" : "ghost"}
//                   key={menu.key}
//                   onClick={() => setSelectedMenu(menu.key)}
//                   className="w-full justify-start text-white px-4 py-2 font-medium rounded-md"
//                 >
//                   {menu.name}
//                 </Button>
//               ))}
//               <p className="px-2 py-2 text-xs font-semibold text-white/50 mt-2">MODELS</p>
//               {modelsMenu.map((menu) => (
//                 <Button
//                   variant={selectedMenu === menu.key ? "secondary" : "ghost"}
//                   key={menu.key}
//                   onClick={() => setSelectedMenu(menu.key)}
//                   className="w-full justify-start text-white px-4 py-2 font-medium rounded-md"
//                 >
//                   {menu.name}
//                 </Button>
//               ))}
//             </div>

//             {/* Right Content - Slightly Lighter Black */}
//             <div className="w-2/3 bg-black/70 p-4 flex flex-col">
//               <div className="flex justify-between items-center border-b border-white/10 pb-2">
//                 <p className="text-white font-semibold">{selectedMenuItem?.name}</p>
//                 <button onClick={dismiss} className="text-white/50 hover:text-white text-lg">✕</button>
//               </div>
//               <div className="mt-4 text-white">{selectedMenuItem?.component}</div>
//             </div>
//           </div>
//         </div>
//       )}
//       {children}
//     </SettingsContext.Provider>
//   );
// };
import React, { useState, createContext } from "react";
import { Button } from "@/components/ui/button";

export const SettingsContext = createContext({});

export type TSettingsProvider = {
  children: React.ReactNode;
};

export type TSettingsMenuItem = {
  name: string;
  key: string;
  component: React.ReactNode;
};

export const SettingsProvider = ({ children }: TSettingsProvider) => {
  const [isSettingOpen, setIsSettingOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("profile");

  const open = () => setIsSettingOpen(true);
  const dismiss = () => setIsSettingOpen(false);

  const settingMenu: TSettingsMenuItem[] = [
    { name: "Profile", key: "profile", component: <div>Profile</div> },
    { name: "Prompts", key: "prompts", component: <div>Prompts</div> },
    { name: "Roles", key: "roles", component: <div>Roles</div> },
  ];
  const modelsMenu: TSettingsMenuItem[] = [
    { name: "OpenAI", key: "open-ai", component: <div>OpenAI</div> },
    { name: "Anthropic", key: "anthropic", component: <div>Anthropic</div> },
    { name: "Gemini", key: "gemini", component: <div>Gemini</div> },
  ];
  const allMenu = [...settingMenu, ...modelsMenu];
  const selectedMenuItem = allMenu.find((menu) => menu.key === selectedMenu);

  return (
    <SettingsContext.Provider value={{ open, dismiss }}>
      {isSettingOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black-10">
          <div className="w-[500px] bg-black/60 backdrop-blur-md p-0 rounded-md shadow-lg flex overflow-hidden">
            
            {/* Left Sidebar - Pure Black */}
            <div className="w-1/4 bg-black border-r border-white/10 p-4">
              <p className="px-2 py-2 text-xs font-semibold text-white/50">GENERAL</p>
              {settingMenu.map((menu) => (
                <Button
                  variant={selectedMenu === menu.key ? "secondary" : "ghost"}
                  key={menu.key}
                  onClick={() => setSelectedMenu(menu.key)}
                  className="w-full justify-start text-white px-4 py-2 font-medium rounded-md"
                >
                  {menu.name}
                </Button>
              ))}
              <p className="px-2 py-2 text-xs font-semibold text-white/50 mt-2">MODELS</p>
              {modelsMenu.map((menu) => (
                <Button
                  variant={selectedMenu === menu.key ? "secondary" : "ghost"}
                  key={menu.key}
                  onClick={() => setSelectedMenu(menu.key)}
                  className="w-full justify-start text-white px-4 py-2 font-medium rounded-md"
                >
                  {menu.name}
                </Button>
              ))}
            </div>

            {/* Right Content - Dark Gray */}
            <div className="w-3/4 bg-black/100 p-4 flex flex-col">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <p className="text-white font-semibold">{selectedMenuItem?.name}</p>
                <button onClick={dismiss} className="text-white/50 hover:text-white text-lg">✕</button>
              </div>
              <div className="mt-4 text-white">{selectedMenuItem?.component}</div>
            </div>
          </div>
        </div>
      )}
      {children}
    </SettingsContext.Provider>
  );
};
