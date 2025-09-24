import React, { useState, useCallback, useRef } from "react";
import ReactFlow, { ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls, MiniMap, useReactFlow } from "reactflow";
import "reactflow/dist/style.css";

import TextMessageNode from "../CustomNodes/TextMessageNode";
import NodePanel from "../NodePanel";
import SettingsPanel from "../SettingsPanel";

// Custom node types registry
const nodeTypes = {
  textMessage: TextMessageNode,
};

// Start with empty canvas
const initialNodes = [];
const initialEdges = [];

const FlowBuilderInner = () => {
  // React Flow state management
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  
  const reactFlowWrapper = useRef(null);
  const { project, getNodes, getEdges } = useReactFlow();

  // Create new text message node programmatically
  const onAddTextMessageNode = useCallback(() => {
    const newNodeId = `node_${Date.now()}`;

    const newNode = {
      id: newNodeId,
      type: "textMessage",
      position: {
        x: Math.random() * 400, // Random placement
        y: Math.random() * 400,
      },
      data: {
        label: "New Message",
        text: "Type your message here...",
        // Node callbacks for interaction
        onTextChange: (nodeId, newText) => {
          setNodes((nds) =>
            nds.map((node) => {
              if (node.id === nodeId) {
                return {
                  ...node,
                  data: { ...node.data, text: newText },
                };
              }
              return node;
            })
          );
        },
        onNodeSelect: setSelectedNode,
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  // Handle node connections with validation
  const onConnect = useCallback(
    (params) => {
      // Enforce single outgoing connection per node
      const existingEdge = edges.find((edge) => edge.source === params.source);

      if (existingEdge) {
        alert("Error: A source handle can only have one outgoing connection!");
        return;
      }

      setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds));
    },
    [edges, setEdges]
  );

  // Handle drag and drop from node panel
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      // Convert screen coordinates to canvas coordinates
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNodeId = `node_${Date.now()}`;
      const newNode = {
        id: newNodeId,
        type,
        position,
        data: {
          label: "New Message",
          text: "Type your message here...",
          onTextChange: (nodeId, newText) => {
            setNodes((nds) =>
              nds.map((node) => {
                if (node.id === nodeId) {
                  return {
                    ...node,
                    data: { ...node.data, text: newText },
                  };
                }
                return node;
              })
            );
          },
          onNodeSelect: setSelectedNode,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [project, setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Validate flow structure - ensure proper connectivity
  const isFlowValid = () => {
    const currentNodes = getNodes();
    const currentEdges = getEdges();

    if (currentNodes.length <= 1) return true;

    // Find disconnected nodes (no outgoing edges)
    const nodesWithNoOutgoingEdges = currentNodes.filter((node) => {
      return !currentEdges.some((edge) => edge.source === node.id);
    });

    console.log("Nodes with no outgoing edges:", nodesWithNoOutgoingEdges.length);

    // Valid if at most one end node exists
    return nodesWithNoOutgoingEdges.length <= 1;
  };

  // Save flow with validation
  const onSave = () => {
    if (!isFlowValid()) {
      alert("Error: More than one node has empty target handles! Please connect all nodes properly.");
      return;
    }

    const flowData = {
      nodes: getNodes(),
      edges: getEdges(),
    };

    console.log("Flow saved:", flowData);
    alert("Flow saved successfully! Check console for data.");
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Main canvas area */}
      <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: "100%", height: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          onNodeClick={(event, node) => setSelectedNode(node)}
          onPaneClick={() => setSelectedNode(null)} // Deselect on empty click
          fitView
        >
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      {/* Dynamic left panel - shows nodes or settings */}
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 10,
          width: 280,
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "16px",
          zIndex: 1000,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        {selectedNode ? (
          <SettingsPanel selectedNode={selectedNode} onSave={onSave} />
        ) : (
          <NodePanel onAddTextMessageNode={onAddTextMessageNode} />
        )}
      </div>

      {/* Save button */}
      <button
        onClick={onSave}
        style={{
          position: "absolute",
          right: 10,
          top: 10,
          padding: "10px 20px",
          background: "#10b981",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          zIndex: 1000,
          fontSize: "14px",
          fontWeight: 500,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Save Changes
      </button>
    </div>
  );
};

// Provider wrapper - required for React Flow hooks
const FlowBuilder = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <FlowBuilderInner />
      </ReactFlowProvider>
    </div>
  );
};

export default FlowBuilder;