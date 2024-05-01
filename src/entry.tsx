// src/index.tsx
import { createRoot } from 'react-dom/client';
import ChatBot from './ChatBot';


const loadChatBot = (selector: string, initData: { [key: string]: string }) => {
  const container = document.querySelector(selector);
  if (container) {
    const root = createRoot(container); // Create a root.
    root.render(<ChatBot {...initData} />); // Use the root to render using spread operator to pass props.
  } else {
    console.error(`The selector "${selector}" did not match any element.`);
  }
};

export { loadChatBot };

interface iMessage {
  type: string;
  payload: any;
}

// Continue from your existing exports
export const sendMessage = (message: iMessage) => {
  // Ensure the chatbot is loaded before attempting to send a message
  window.postMessage(message, '*'); // Specify the target origin as needed for security
};
