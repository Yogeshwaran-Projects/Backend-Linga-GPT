import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const CodeBlock: React.FC<CodeProps> = ({ inline, className, children }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <div className="relative">
      <pre className={`bg-gray-800 p-3 rounded-lg overflow-x-auto ${className}`}>
        <code>{children}</code>
      </pre>
      <CopyToClipboard text={String(children).trim()}>
        <button
          className="absolute top-1 right-1 bg-gray-700 hover:bg-gray-600 text-white p-1 rounded transition-colors"
          aria-label="Copy code to clipboard"
        >
          Copy
        </button>
      </CopyToClipboard>
    </div>
  ) : (
    <code className={className}>{children}</code>
  );
};
const Sidebar = () => {
  const navigation = [
    {
      href: "javascript:void(0)",
      name: "Overview",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
          />
        </svg>
      ),
    },
    {
      href: "javascript:void(0)",
      name: "Integration",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
          />
        </svg>
      ),
    },
    {
      href: "javascript:void(0)",
      name: "Plans",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      ),
    },
    {
      href: "javascript:void(0)",
      name: "Transactions",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.004 2.085 5.235 4.75h.015c.855 0 1.63.343 2.204.902l3.563 3.456a.734.734 0 010 1.084l-3.563 3.456a3.104 3.104 0 01-2.204.902h-.015c-.23 2.665-2.48 4.75-5.235 4.75-2.763 0-5.02-2.099-5.24-4.735L4.57 17.25a3.105 3.105 0 01-2.204-.902L.802 12.892a.734.734 0 010-1.084L2.366 8.35a3.105 3.105 0 012.204-.902l2.19-.015C6.98 5.085 9.237 3 12 3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 15V9"
          />
        </svg>
      ),
    },
    {
      href: "javascript:void(0)",
      name: "Documents",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5V6.75A2.25 2.25 0 0017.25 4.5h-5.466a2.25 2.25 0 00-1.591.659l-4.5 4.5a2.25 2.25 0 00-.659 1.591v6.25A2.25 2.25 0 007.75 19.5h9.5a2.25 2.25 0 002.25-2.25z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v5.25a1.5 1.5 0 001.5 1.5h5.25m-5.868.25h-3.482a1 1 0 00-1 1v5.5a1 1 0 001 1h7.964a1 1 0 001-1v-5.5a1 1 0 00-1-1h-1.982"
          />
        </svg>
      ),
    },
  ];
  return (
    <div className="flex flex-col w-64 h-screen py-8 bg-gray-800 border-r dark:bg-gray-900 dark:border-gray-700">
      <h2 className="text-3xl font-semibold text-center text-white">
        LINGA AI
      </h2>

      <div className="flex flex-col items-center mt-6 -mx-2">
        <img
          className="object-cover w-24 h-24 mx-2 rounded-full"
          src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=200"
          alt="avatar"
        />
        <h4 className="mx-2 mt-2 font-medium text-white">User Name</h4>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-400">
          Linga-AI@yogesh.com
        </p>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          {navigation.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform hover:bg-gray-700 hover:text-gray-200"
            >
              {item.icon}
              <span className="mx-4 font-medium">{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, stop } = useChat();
  const [typing, setTyping] = useState(false);

  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 p-4">
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`my-2 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar.Root className="inline-flex items-center justify-center align-middle overflow-hidden select-none w-8 h-8 rounded-full">
                  <Avatar.Image
                    className="w-full h-full object-cover"
                    src={
                      message.role === "user"
                        ? "https://www.w3schools.com/howto/img_avatar.png"
                        : "https://www.w3schools.com/howto/img_avatar2.png"
                    }
                    alt={message.role}
                  />
                </Avatar.Root>
                <div className={`ml-2 ${message.role === "user" ? "text-right" : ""}`}>
                  <div className="flex items-center">
                    <strong>{message.role === "user" ? "You" : "LingaGPT"}</strong>
                    <span className="ml-2 text-xs text-gray-500">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-sm mt-1">
                    <Markdown components={{ code: CodeBlock }}>
                      {message.content}
                    </Markdown>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              handleInputChange(e);
              setTyping(true);
            }}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 p-2 rounded"
          />
          <button
            type="submit"
            className={`ml-2 px-4 py-2 bg-blue-500 text-white rounded ${
              typing ? "animate-pulse" : ""
            }`}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">
                <FontAwesomeIcon icon={faStopCircle} />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="w-48 bg-white rounded-md shadow-lg">
              <DropdownMenu.Item onSelect={stop} className="p-2">
                Stop Generating
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </form>
      </div>
    </div>
  );
}