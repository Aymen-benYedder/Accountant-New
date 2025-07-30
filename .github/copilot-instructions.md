# Copilot Instructions for Accountant-New
# OVERARCHING PRINCIPLES
KISS: Keep code simple, readable, and minimal. Avoid premature optimizations.
DRY: Reuse logic via utils/hooks/services. Abstract only when proven.
YAGNI: Don’t add unused features or logic. Build only what's required.
Fail Fast: Validate inputs early. Expose errors clearly.
Defensive Coding: Handle edge cases, sanitize inputs/outputs.
Atomic + Modular: Structure code in independent units. Keep commits scoped and testable.

## Architecture Overview
- **Monorepo**: Contains both frontend (`demo/`) and backend (`server/`) projects.
- **Frontend**: React + TypeScript + Vite, with custom context providers (notably `WebSocketContext.tsx` for real-time chat and notifications).
- **Backend**: Node.js/Express with Socket.IO for real-time features, MongoDB for persistence, and REST API endpoints under `server/src/routes/`.
- **WebSocket**: Real-time chat and notifications are handled via Socket.IO. The frontend manages connection state and message queues in `WebSocketContext.tsx`.

## Developer Workflows
- **Frontend build**: From `demo/`, use `npm run build` (Vite). For dev: `npm run dev`.
- **Backend start**: From `server/`, use `npm run start` or `node app.js`.
- **Testing**: No unified test runner is present; check for ad-hoc test scripts or use `websocket-test.html` for manual WebSocket testing.
- **Debugging**: Use browser console logs (extensive in chat and WebSocket flows). Backend logs to stdout.

## Project-Specific Patterns
- **WebSocketContext**: All chat and notification logic is centralized in `demo/src/contexts/WebSocketContext.tsx`. Connection is only established when both JWT token and user context are available. Hydration from JWT is used as a fallback.
- **Message Queuing**: Outgoing chat messages are queued if the socket is not connected and sent on reconnect. See `ChatAppContent.tsx` for queue logic.
- **Global Events**: New messages and notifications are dispatched as `CustomEvent`s on `window` for cross-component communication.
- **User Auth**: JWT is stored in `localStorage` as `token`. User context is hydrated from both AuthProvider and JWT payload.
- **API Utility**: Use `@app/_utilities/api` for all HTTP requests.

## Conventions & Integration
- **TypeScript**: Strict types in most files, but some legacy/any usage remains.
- **Socket.IO**: All real-time events (chat, status, notifications) are handled via Socket.IO, with event listeners registered in `WebSocketContext.tsx`.
- **Environment Variables**: Use `import.meta.env` for Vite, `window.ENV` as a fallback, and `.env` files for backend.
- **Manual Testing**: Use `demo/websocket-test.html` for direct WebSocket/SIO testing.

## Key Files & Directories
- `demo/src/contexts/WebSocketContext.tsx`: WebSocket logic, connection, and state
- `demo/src/app/_components/apps/chats/components/ChatAppContent/ChatAppContent.tsx`: Main chat UI and message queue
- `server/app.js`: Express app, Socket.IO server, and event handlers
- `server/src/routes/`: REST API endpoints
- `@app/_utilities/api`: HTTP utility for frontend

## Examples
- To send a chat message, use `sendMessage` from `WebSocketContext`.
- To listen for new messages globally, add a `window.addEventListener('newMessage', ...)` handler.
- To hydrate user context after login, decode JWT from `localStorage` if AuthProvider is not ready.

---

For more details, see the code comments in the above files. If you encounter unclear patterns, add detailed logs and check both the frontend and backend event flows.
