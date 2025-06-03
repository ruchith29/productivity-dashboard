import { TaskList } from './Components/TaskList';
import { Home } from './Components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task-list" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
