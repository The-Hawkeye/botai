import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, Switch } from '@mui/material';
import { Send as SendIcon, Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';

const ChatInterface = ({ responses, toggleTheme }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [feedback, setFeedback] = useState({});

  const handleSendMessage = () => {
    const response = responses[Math.floor(Math.random() * responses.length)].response;
    setChatHistory([...chatHistory, { user: message, ai: response }]);
    setMessage('');
  };

  const handleFeedback = (index, isPositive) => {
    setFeedback({ ...feedback, [index]: isPositive });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">AI Chat</Typography>
        <Switch onChange={toggleTheme} icon={<DarkModeIcon />} checkedIcon={<LightModeIcon />} />
      </Box>
      <Box>
        {chatHistory.map((chat, index) => (
          <Box key={index} mb={2}>
            <Typography variant="h6">You: {chat.user}</Typography>
            <Typography variant="h6">AI: {chat.ai}</Typography>
            <Button 
              variant="contained" 
              color={feedback[index] === true ? "success" : "default"} 
              onClick={() => handleFeedback(index, true)}
            >
              👍
            </Button>
            <Button 
              variant="contained" 
              color={feedback[index] === false ? "error" : "default"} 
              onClick={() => handleFeedback(index, false)}
            >
              👎
            </Button>
          </Box>
        ))}
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInterface;
