import React from 'react';

// Panel component for adding new nodes to the flow
// Props: onAddTextMessageNode - callback function to add a new text message node
const NodePanel = ({ onAddTextMessageNode }) => {
  return (
    <div style={{ padding: '4px' }}>
      <h3 style={{ 
        marginBottom: '16px', 
        color: '#111827',
        fontSize: '16px',
        fontWeight: 600
      }}>Nodes Panel</h3>
      
      {/* Draggable node template - users can drag this onto the canvas */}
      <div
        style={{
          padding: '12px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          marginBottom: '12px',
          background: 'white',
          cursor: 'grab',
          transition: 'all 0.2s'
        }}
        draggable
        // Set drag data when user starts dragging
        onDragStart={(event) => {
          event.dataTransfer.setData('application/reactflow', 'textMessage');
          event.dataTransfer.effectAllowed = 'move';
        }}
        // Visual feedback on hover
        onMouseEnter={(e) => e.target.style.borderColor = '#3b82f6'}
        onMouseLeave={(e) => e.target.style.borderColor = '#d1d5db'}
      >
        {/* Node preview with icon and title */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '6px' 
        }}>
          {/* Node type icon */}
          <div style={{
            width: 20,
            height: 20,
            background: '#3b82f6',
            borderRadius: '4px',
            marginRight: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px'
          }}>
            T
          </div>
          <div style={{ fontWeight: 600, color: '#111827' }}>Message Node</div>
        </div>
        {/* Instructions for users */}
        <div style={{ fontSize: '12px', color: '#6b7280', paddingLeft: '28px' }}>
          Drag to add a text message node
        </div>
      </div>
      
      {/* Alternative way to add nodes via button click */}
      <button
        onClick={onAddTextMessageNode}
        style={{
          width: '100%',
          padding: '10px 16px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 500,
          marginTop: '8px',
          transition: 'background-color 0.2s'
        }}
        // Hover effects for better UX
        onMouseEnter={(e) => e.target.style.background = '#2563eb'}
        onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
      >
        Add Message Node
      </button>
    </div>
  );
};

export default NodePanel;