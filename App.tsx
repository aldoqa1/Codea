import { QueryClientProvider } from '@tanstack/react-query';
import {TablesProvider} from './src/utils/tablesContext';
import Dashboard from './src/components/Dashboard';
import queryClient from './src/utils/queryClient';

function App(): React.JSX.Element {

  return (
    <TablesProvider>
      <QueryClientProvider client={queryClient}>
        <Dashboard/>
      </QueryClientProvider>
    </TablesProvider>
  );

}

export default App;
