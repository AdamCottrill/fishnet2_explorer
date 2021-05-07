import "./App.css";

import { useGetTablesQuery } from "./services/tables";

function App() {
  const { data, error, isLoading, isFetching } = useGetTablesQuery();

  return (
    <div className="App">
      <header className="App-header">
        {error ? (
          <h3>Aw snap - something when wrong....</h3>
        ) : isLoading || isFetching ? (
          <h3>Loading...</h3>
        ) : data ? (
          <ul>
            {data.tables.map((table) => (
              <li key={table}>{table}</li>
            ))}
          </ul>
        ) : null}
      </header>
    </div>
  );
}

export default App;
