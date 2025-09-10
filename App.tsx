import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/configStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './Navigator.tsx';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const queryClient = new QueryClient()


  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Navigation />
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
