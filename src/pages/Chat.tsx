import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { useState, useEffect, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopCircle, faPaperPlane, faCog, faUser, faQuestionCircle, faRobot, faTimes } from "@fortawesome/free-solid-svg-icons";
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
      <SyntaxHighlighter language={match[1]} style={coy} customStyle={{ background: '#000000', color: '#FFFFFF' }}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
      <CopyToClipboard text={String(children).trim()}>
        <button
          className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-1 rounded transition-colors"
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
      style={{ backgroundColor: colors.primary }}
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
              className="flex items-center px-4 py-2 transition-colors rounded-lg"
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
  const [userCode, setUserCode] = useState("");
  const [aiCode, setAiCode] = useState("");
  const [comparisonResult, setComparisonResult] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role === "assistant") {
      setShowTypingIndicator(false);
      setAiCode(messages[messages.length - 1].content);
    }
  }, [messages]);

  useEffect(() => {
    // Adjust textarea height based on content
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleInputChangeAndTyping = (e) => {
    handleInputChange(e);
    setIsTyping(true);
  };

  const formatCode = (code) => {
    let formattedCode = '';
    let indentLevel = 0;
    const indentSize = 2;

    for (let i = 0; i < code.length; i++) {
      const char = code[i];

      if (char === '{') {
        indentLevel++;
        formattedCode += char + '\n' + ' '.repeat(indentLevel * indentSize);
      }
      else if (char === '}') {
        indentLevel--;
        formattedCode += '\n' + ' '.repeat(indentLevel * indentSize) + char;
      }
      else if (char === ';') {
        formattedCode += char + '\n' + ' '.repeat(indentLevel * indentSize);
      }
      else if (char === '\n') {
        formattedCode += char + ' '.repeat(indentLevel * indentSize);
      }
      else {
        formattedCode += char;
      }
    }

    return formattedCode;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formattedUserCode = formatCode(input);

    setUserCode(formattedUserCode);
    setShowTypingIndicator(true);
    await handleSubmit(e);
    setIsTyping(false);
  };

  const handleStop = () => {
    stop();
    setShowTypingIndicator(false);
  };

  const handleCompare = () => {
    setComparisonResult(true);
  };

  const handleCloseComparison = () => {
    setComparisonResult(false);
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default newline behavior
      handleFormSubmit(e); // Trigger form submission
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4" style={{ backgroundColor: colors.secondary }}>
        <main className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {messages.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 80 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 80 }}
                  className={`p-4 rounded-lg shadow-md max-w-lg ${
                    "bg-black text-white" // Apply the same style for both user and AI responses
                  }`}
                >
                  <Markdown components={{ code: CodeBlock }}>{m.content}</Markdown>
                </motion.div>
              </motion.div>
            ))}
            {showTypingIndicator && <TypingIndicator />}
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
            className="flex items-center w-full max-w-2xl mt-4 p-2 rounded-lg shadow-md"
            style={{ backgroundColor: colors.secondary }}
          >
            <textarea
              ref={textAreaRef}
              value={input}
              onChange={handleInputChangeAndTyping}
              onKeyDown={handleKeyDown} // Add this event handler
              className="flex-grow p-2 rounded-l-lg border-none resize-none"
              style={{ backgroundColor: colors.primary, color: colors.text, minHeight: '50px' }}
              rows={1}
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="p-2 rounded-r-lg bg-button text-white hover:bg-buttonHover"
              aria-label="Send"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger
                className="ml-2 p-2 rounded-lg bg-button text-white hover:bg-buttonHover"
                aria-label="Menu"
              >
                <FontAwesomeIcon icon={faCog} />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="p-2 rounded-lg shadow-md" style={{ backgroundColor: colors.secondary }}>
                <DropdownMenu.Item className="p-2 rounded-lg hover:bg-gray-700" onClick={handleStop}>
                  <FontAwesomeIcon icon={faStopCircle} className="mr-2" />
                  Stop Generating
                </DropdownMenu.Item>
                <DropdownMenu.Item className="p-2 rounded-lg hover:bg-gray-700" onClick={handleCompare}>
                  Compare
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </form>
        </motion.div>
        {comparisonResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
          >
            <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-4xl w-full h-full flex flex-col">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={handleCloseComparison}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div className="flex flex-col space-y-4 h-full">
                <h2 className="text-2xl font-bold text-center">Code Comparison</h2>
                <div className="flex-grow flex relative">
                  <div
                    className="absolute inset-0 flex"
                    style={{
                      width: `${sliderValue}%`,
                      overflow: "hidden",
                      transition: "width 0.3s",
                    }}
                  >
                    <div className="flex-grow overflow-y-auto">
                      <h3 className="text-xl font-semibold">User Code</h3>
                      <SyntaxHighlighter language="javascript" style={coy}>
                        {userCode}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 flex"
                    style={{
                      width: `${100 - sliderValue}%`,
                      overflow: "hidden",
                      right: 0,
                      transition: "width 0.3s",
                    }}
                  >
                    <div className="flex-grow overflow-y-auto">
                      <h3 className="text-xl font-semibold">AI Code</h3>
                      <SyntaxHighlighter language="javascript" style={coy}>
                        {aiCode}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    className="absolute h-full w-64"
                    style={{ left: "50%", transform: "translateX(-50%)" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Chat;
