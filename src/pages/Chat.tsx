import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { useState, useEffect, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faStopCircle, faPaperPlane, faMicrophone, faImage, faCog, faUser, faQuestionCircle, faRobot, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";


const colors = {
  primary: "#000000",  
  secondary: "#1C1C1C",
  accent: "#00B0B3",  
  text: "#FFFFFF",  
  textSecondary: "#B0B0B0",
  button: "#00B0B3",
  buttonHover: "#00D0D3",
};

const particlesOptions = {
  background: {
    color: {
      value: colors.primary,
    },
  },
  particles: {
    color: {
      value: colors.accent,
    },
    links: {
      color: colors.accent,
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 50,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 3,
    },
  },
  detectRetina: true,
};

const CodeBlock = ({ inline, className, children }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <div className="relative">
      <SyntaxHighlighter language={match[1]} style={coy}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
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
    { href: "personalized/", name: "Personalized AI", icon: <FontAwesomeIcon icon={faStopCircle} /> },
    { href: "#", name: "Integration", icon: <FontAwesomeIcon icon={faStopCircle} /> },
    { href: "#", name: "Settings", icon: <FontAwesomeIcon icon={faCog} /> },
    { href: "#", name: "Profile", icon: <FontAwesomeIcon icon={faUser} /> },
    { href: "#", name: "Help", icon: <FontAwesomeIcon icon={faQuestionCircle} /> },
  ];

  return (
    <motion.aside
      className="flex flex-col justify-between w-64 h-screen px-4 py-8 relative"
      style={{ backgroundColor: colors.primary, borderRight: `1px solid ${colors.secondary}` }}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
    >
      <Particles params={particlesOptions} className="absolute inset-0" />
      <div className="relative z-10">
        <h1 className="text-2xl font-bold" style={{ color: colors.accent }}>
          Linga AI
        </h1>
        <nav className="flex flex-col mt-6 space-y-2">
          {navigation.map((item, idx) => (
            <motion.a
              key={idx}
              className="flex items-center px-4 py-2 transition-colors transform rounded-md"
              style={{ color: colors.textSecondary }}
              href={item.href}
              whileHover={{ scale: 1.05, backgroundColor: colors.accent, color: colors.primary }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 80, duration: 0.2 }}
            >
              {item.icon}
              <span className="mx-4 font-medium">{item.name}</span>
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
};

const TypingIndicator = () => (
  <motion.div
    className="flex items-center mt-2"
    style={{ color: colors.textSecondary }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ yoyo: Infinity, duration: 0.5 }}
  >
    <FontAwesomeIcon icon={faRobot} className="mr-2" />
    <span>Linga-AI is typing...</span>
  </motion.div>
);

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit, stop } = useChat();
  const [isTyping, setIsTyping] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role === "assistant") {
      setShowTypingIndicator(false);
    }
  }, [messages]);

  const handleInputChangeAndTyping = (e) => {
    handleInputChange(e);
    setIsTyping(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setShowTypingIndicator(true);
    await handleSubmit(e);
    setIsTyping(false);
  };

  const handleStop = () => {
    stop();
    setIsTyping(false);
    setShowTypingIndicator(false);
  };

return (
  <div
    className="flex h-screen overflow-hidden"
    style={{ backgroundColor: colors.primary, color: colors.text }}
  >
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center overflow-y-auto p-4 space-y-4">
        <div className="flex flex-col flex-grow space-y-4 w-full max-w-3xl">
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 80 }}
                className={`p-4 rounded-lg shadow-md max-w-lg ${
                  m.role === "user" ? "bg-accent text-white" : "bg-black text-white border border-accent"
                }`}
              >
                <Markdown components={{ code: CodeBlock }}>{m.content}</Markdown>
              </motion.div>
            </motion.div>
          ))}
          {showTypingIndicator && <TypingIndicator />}
          <div ref={messagesEndRef} /> {/* Scroll into view */}
          <div /> {/* Additional div to ensure visibility */}
        </div>
      </main>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="flex justify-center w-full mb-4"
      >
        <form
          onSubmit={handleFormSubmit}
          className="flex items-center w-full max-w-2xl mt-4 p-2 rounded-lg shadow-lg"
          style={{
            backgroundColor: colors.secondary,
            borderColor: colors.accent,
            borderWidth: "1px",
          }}
        >
          <motion.button
            type="button"
            className="p-2 rounded-full transition-transform transform hover:scale-110"
            style={{ color: colors.textSecondary }}
            whileHover={{ scale: 1.1, color: colors.text }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faMicrophone} />
          </motion.button>
          <input
            className="flex-1 p-2 mx-2 rounded outline-none"
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={handleInputChangeAndTyping}
            style={{
              backgroundColor: colors.primary,
              color: colors.text,
            }}
          />
          <motion.button
            type="submit"
            className="p-2 rounded-full transition-transform transform hover:scale-110"
            style={{ color: colors.textSecondary }}
            whileHover={{ scale: 1.1, color: colors.text }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </motion.button>
          <motion.button
            type="button"
            onClick={handleStop}
            className="p-2 rounded-full transition-transform transform hover:scale-110"
            style={{ color: colors.textSecondary }}
            whileHover={{ scale: 1.1, color: colors.text }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faStopCircle} />
          </motion.button>
          <motion.button
            type="button"
            className="p-2 rounded-full transition-transform transform hover:scale-110"
            style={{ color: colors.textSecondary }}
            whileHover={{ scale: 1.1, color: colors.text }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faImage} />
          </motion.button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <motion.button
                type="button"
                className="p-2 rounded-full transition-transform transform hover:scale-110"
                style={{ color: colors.textSecondary }}
                whileHover={{ scale: 1.1, color: colors.text }}
                whileTap={{ scale: 0.9 }}
              >
                <FontAwesomeIcon icon={faCog} />
              </motion.button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              sideOffset={5}
              className="p-2 bg-gray-800 rounded shadow-lg"
              style={{ borderColor: colors.accent }}
            >
              <DropdownMenu.Item
                className="px-4 py-2 text-white rounded hover:bg-gray-700"
                onSelect={() => console.log("Settings clicked")}
              >
                Settings
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </form>
      </motion.div>
    </div>
  </div>
);

};

export default Chat;
