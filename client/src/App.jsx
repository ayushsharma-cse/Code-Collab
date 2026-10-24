import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Connect to the backend server running on port 5000
const socket = io("http://localhost:5000");

import React from "react";

const App = () => {
  return <div>App</div>;
};

export default App;
