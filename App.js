import React, { useEffect, useState } from "react";

function App() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:5000");

        ws.onmessage = (event) => {
            setMessages((prev) => [...prev, JSON.parse(event.data)]);
        };

        return () => ws.close();
    }, []);

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-xl font-bold mb-4">IoT Device Messages</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index} className="p-2 border-b">
                        {msg.device}: {msg.value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
