import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useGetTablesQuery } from "./app/store";

function App() {
    const learnerTableQuery = useGetTablesQuery("x_quo_coursehub_learner");

    React.useEffect(() => {
        console.log(learnerTableQuery.data);
    }, [learnerTableQuery.data]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
