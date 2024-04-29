/* eslint-disable @typescript-eslint/no-explicit-any */
// ChatBot.tsx
import './chatbot.scss';
import { useEffect, useState } from 'react';

export interface ChatBotProps {
  initData: any;
}

const ChatBot = ({ initData }: ChatBotProps) => {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState<any>();

  // Add this inside your ChatBot component
  useEffect(() => {
    // This function handles incoming messages
    const receiveMessage = (event: any) => {

      // Handle different types of messages
      if (event.data.type === 'ADD_TEXT') {
        // Perform action based on event.data
        setText(event.data.payload)
      }
    };

    // Set up the event listener for messages
    window.addEventListener('message', receiveMessage);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, []);


  const toggleChatBot = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`chatbot chatbot-button ${expanded ? 'expanded' : ''}`} onClick={toggleChatBot}>
      {/* 这里是你的图标和文字 */}
      {!expanded && (
        <div className="chatbot-icon">🤖</div> // 示例图标，请替换为实际图标
      )}
      {/* 聊天内容区域，展开后显示 */}
      {expanded && (
        <div className="chatbot-content">
          {JSON.stringify(initData)}
          <p>This is text send from integrated platform</p>
          {JSON.stringify(text)}
        </div>
      )}
      {/* 按钮文本，展开后显示 */}
      {expanded && (
        <div className="chatbot-label">Chat</div>
      )}
    </div>
  );
};

export default ChatBot;
