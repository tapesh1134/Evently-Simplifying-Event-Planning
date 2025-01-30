import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5173"; // Change URL if needed

const socket = io(SOCKET_URL, {
  withCredentials: true,
});

export default socket;
