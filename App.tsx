import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import MovieApp from './src/screen/HomeScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux/configStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const queryClient = new QueryClient()


  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <MovieApp />
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
