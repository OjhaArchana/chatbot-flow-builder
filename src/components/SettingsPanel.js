import React, { useState, useEffect } from 'react';

// Settings panel for editing selected node properties
// Props: selectedNode - currently selected node object, onSave - callback to save changes
const SettingsPanel = ({ selectedNode, onSave }) => {
  // Local state to manage text input value
  const [text, setText] = useState(selectedNode.data.text || '');

  // Update local text state when a different node is selected
  useEffect(() => {
    setText(selectedNode.data.text || '');
  }, [selectedNode]);

  // Handle text changes and update node data in real-time
  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    
    // Update the node's data immediately through callback
    if (selectedNode.data.onTextChange) {
      selectedNode.data.onTextChange(selectedNode.id, newText);
    }
  };

  return (
    <div style={{ padding: '4px' }}>
      {/* Panel Header */}
      <div style={{ 
        marginBottom: '20px', 
        paddingBottom: '12px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <h3 style={{ 
          margin: 0, 
          color: '#111827', 
          fontSize: '16px',
          fontWeight: 600
        }}>
          Message Settings
        </h3>
      </div>
      
      {/* Text editing section */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontWeight: 500,
          color: '#374151',
          fontSize: '14px'
        }}>
          Text
        </label>
        {/* Multi-line text input for message content */}
        <textarea
          value={text}
          onChange={handleTextChange}
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '10px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            resize: 'vertical',
            fontSize: '14px',
            fontFamily: 'inherit',
            boxSizing: 'border-box'
          }}
          placeholder="Enter your message here..."
        />
      </div>
      
      {/* Save button to persist changes */}
      <button
        onClick={onSave}
        style={{
          width: '100%',
          padding: '10px 16px',
          background: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 500,
          transition: 'background-color 0.2s'
        }}
        // Hover effects for better UX
        onMouseEnter={(e) => e.target.style.background = '#059669'}
        onMouseLeave={(e) => e.target.style.background = '#10b981'}
      >
        Save Changes
      </button>
    </div>
  );
};

export default SettingsPanel;