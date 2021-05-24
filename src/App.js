import logo from './logo.svg';
import './App.css';
import { Main } from '@views';
import { ContextProvider } from '@context';
function App() {
  return (
    <ContextProvider>
      <Main />
    </ContextProvider>
  );
}

export default App;
