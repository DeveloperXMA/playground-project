import './chatbot.scss';
import { useEffect, useState, ChangeEvent, KeyboardEvent } from 'react';
export interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatBot = ( initData : { [key: string]: string }) => {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      const userMessage: Message = { text: input, sender: 'user' };
      const botMessage: Message = { text: '为什么不问问神奇海螺呢', sender: 'bot' }; // Simulating a bot response

      setMessages([...messages, userMessage, botMessage]);
      setInput('');
    }
  };

  useEffect(() => {
    if (text) {
      const userMessage: Message = { text: `I have a question about ${text}`, sender: 'user' };
      const botMessage: Message = { text: '为什么不问问神奇海螺呢', sender: 'bot' }; // Simulating a bot response

      setMessages(prevMessages => [...prevMessages, userMessage, botMessage]);
    }
  }, [text]);

  useEffect(() => {
    const receiveMessage = (event: MessageEvent) => {
      if (event.data.type === 'ADD_TEXT') {
        setText(event.data.payload);
      }
    };

    window.addEventListener('message', receiveMessage);
    return () => window.removeEventListener('message', receiveMessage);
  }, []);

  const toggleChatBot = () => setExpanded(!expanded);
  const closeChatBot = () => setExpanded(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`chatbot chatbot-button ${expanded ? 'expanded' : 'chatbot-button'}`}>
      {expanded ? (
        <div className="chatbot-header">
          <button className="close-button" onClick={closeChatBot}>
            &times;
          </button>
        </div>
      ) : (
        <div className="chatbot-icon" onClick={toggleChatBot}>
          🤖
        </div>
      )}

      {expanded && (
        <div className="chatbot-content">
          This is the init data : {JSON.stringify(initData)}
          <div className="message-area">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              className="chatbot-input"
              placeholder="Type your message..."
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSendMessage} className="send-button">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
