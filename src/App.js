import { TaskList } from './Components/TaskList';
import { Home } from './Components/Home';
import { TaskVault } from './Components/TaskVault';
import { Activity } from './Components/Activity';
import { PrevTaskProvider, RowsDataProvider } from './GlobalObjects/PrevTaskProvider';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <PrevTaskProvider>
      <RowsDataProvider>

        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/taskleap" element={<TaskList />} />
            <Route path='/taskvault' element={<TaskVault />}></Route>
            <Route path='/activity' element={<Activity />}> </Route>
          </Routes>
        </BrowserRouter>
      </RowsDataProvider>
    </PrevTaskProvider>


  );
}

export default App;
