import React from 'react';
import { Handle, Position } from 'reactflow';

// Custom node component for displaying text messages in the flow
// Props: data (node content), selected (selection state), id (unique identifier)
const TextMessageNode = ({ data, selected, id }) => {
  return (
    <div
      style={{
        padding: '12px',
        borderRadius: '8px',
        // Green border when selected, blue when not
        border: selected ? '2px solid #10b981' : '2px solid #3b82f6',
        background: 'white',
        minWidth: 180,
        maxWidth: 280,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
      // Handle node selection on click
      onClick={() => data.onNodeSelect && data.onNodeSelect({ id, type: 'textMessage', data })}
    >
      {/* Connection point for incoming edges (left side) */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ 
          background: '#3b82f6',
          width: 10,
          height: 10,
          border: '2px solid white'
        }}
        isConnectable={true}
      />
      
      {/* Header section with icon and label */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: 8,
        fontSize: 12,
        color: '#6b7280',
        fontWeight: 600
      }}>
        {/* Node type indicator icon */}
        <div style={{
          width: 16,
          height: 16,
          background: '#3b82f6',
          borderRadius: '50%',
          marginRight: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 10
        }}>
          ✓
        </div>
        Send Message
      </div>
      
      {/* Main content area displaying the message text */}
      <div style={{ 
        background: '#f8fafc', 
        padding: '8px', 
        borderRadius: '4px',
        fontSize: 12,
        color: '#374151',
        border: '1px solid #e5e7eb',
        minHeight: 40,
        wordWrap: 'break-word'
      }}>
        {data.text || 'Type your message here...'}
      </div>
      
      {/* Connection point for outgoing edges (right side) */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ 
          background: '#3b82f6',
          width: 10,
          height: 10,
          border: '2px solid white'
        }}
        isConnectable={true}
      />
    </div>
  );
};

export default TextMessageNode;