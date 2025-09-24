Chatbot Flow Builder
A powerful and intuitive chatbot flow builder built with React and React Flow. Create, edit, and visualize chatbot conversation flows with an easy-to-use drag-and-drop interface.

Live Demo: https://chatbot-flow-builder-henna.vercel.app/

Features
Text Node
Support for text message nodes

Multiple text nodes in a single flow

Drag and drop functionality from Nodes Panel

Nodes Panel
Extensible panel for different node types

Currently supports Message Nodes

Designed for easy addition of future node types

Edge Connections
Smooth edge connections between nodes

Visual representation of conversation flow

Source Handle
Source of connecting edges

Limited to one outgoing edge per source handle

Target Handle
Target of connecting edges

Supports multiple incoming edges

Settings Panel
Dynamic panel that replaces Nodes Panel when a node is selected

Text field for editing selected node content

Real-time updates

Save Validation
Save button with flow validation

Error detection for multiple nodes with empty target handles

Comprehensive flow integrity checks

Getting Started
This project was bootstrapped with Create React App.

Prerequisites
Node.js (version 14 or higher)

npm or yarn

Installation
Clone the repository

bash
git clone <your-repository-url>
cd chatbot-flow-builder
Install dependencies

bash
npm install
Start the development server

bash
npm start
The application will open in your browser at http://localhost:3000.

Available Scripts
npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

How to Use
Building a Chatbot Flow
Add Nodes: Drag and drop "Message Node" from the Nodes Panel or click "Add Message Node"

Connect Nodes: Click and drag from the right handle (source) of one node to the left handle (target) of another

Edit Content: Click on any node to open the Settings Panel and modify the text content

Save Flow: Click "Save Changes" to validate and save your flow

Validation Rules
Valid Flow: All nodes are connected in a single sequence

Invalid Flow: Multiple nodes have no incoming connections (orphaned nodes)

Invalid Connection: Attempting to create multiple edges from the same source handle

Technology Stack
Frontend: React.js

Flow Builder: React Flow

Styling: CSS-in-JS

Deployment: Vercel