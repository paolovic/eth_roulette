import Header from "components/views/Header";
import AppRouter from "components/routing/routers/AppRouter";
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

function getLibrary(provider) {
  return new Web3(provider)
}

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Header height="100" />
      <AppRouter />
    </Web3ReactProvider>
  );
};

export default App;
