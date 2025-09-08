import { useState, useEffect } from "react";
import MockSocket from "./MockSocket";

const socket = new MockSocket();

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    age: "",
    city: "",
  });

  const [received, setReceived] = useState({});

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    socket.on("upFields", (data) => {
      setReceived(data);
    });
    socket.connect();

    return () => socket.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("upFields", fields);
    setFields({
      name: "",
      age: "",
      city: "",
    });
  };

  return (
    <div className="p-4">
      <p className="mb-2"> connection : {isConnected ? "true" : "false"}</p>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="name"
          value={fields.name}
          onChange={(e) => setFields({ ...fields, name: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="age"
          value={fields.age}
          onChange={(e) => setFields({ ...fields, age: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="city"
          value={fields.city}
          onChange={(e) => setFields({ ...fields, city: e.target.value })}
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>

      <div className="mt-4">
        <h3 className="font-bold">data:</h3>
        <p>name: {received.name}</p>
        <p>age: {received.age}</p>
        <p>city: {received.city}</p>
      </div>
    </div>
  );
};

export default App;
