'use client'

import React, { useState } from "react";
import { useAtom } from "jotai";
import { optionsAtom } from "../store";
import { CodeEditor } from "./code-editor";
import { CodeTab } from "./code-tab";
import { AuthFile, AuthOptions, beautifyCode, createInitialFiles } from "./utils/file-templates";

export default function CodeTabs() {
  const [options] = useAtom(optionsAtom);
  const [files, setFiles] = useState<AuthFile[]>(() => createInitialFiles(options as AuthOptions));
  const [activeFileId, setActiveFileId] = useState<string>(files[0].id);

  const handleTabClick = (fileId: string) => setActiveFileId(fileId);
  
  const handleTabClose = (fileId: string) => {
    setFiles(files.filter((file: AuthFile) => file.id !== fileId));
    if (activeFileId === fileId) {
      setActiveFileId(files[0].id);
    }
  };

  const activeFile = files.find((file: AuthFile) => file.id === activeFileId);

  return (
    <div className="mx-auto mt-4 border border-border rounded-md overflow-hidden">
      <div className="bg-background">
        <div className="flex flex-wrap">
          {files.map((file: AuthFile, index: number) => (
            <CodeTab
              key={file.id}
              fileName={file.name}
              isActive={file.id === activeFileId}
              onClick={() => handleTabClick(file.id)}
              onClose={() => handleTabClose(file.id)}
              className={`flex-1 ${index === files.length - 1 ? 'flex-grow' : ''}`}
            />
          ))}
        </div>
      </div>
      <div className="overflow-x-auto overflow-hidden">
        {activeFile && (
          <CodeEditor
            language={activeFile.name.endsWith('.ts') ? 'typescript' : 'tsx'}
            value={beautifyCode(activeFile.content)}
            fileName={activeFile.name}
          />
        )}
      </div>
    </div>
  );
}

