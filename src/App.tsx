import "./App.css";
import Home from "./components/home/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import UserRoleProvider from "./context/userRoleContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
    },
  },
});
// user role context

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserRoleProvider>
        <Home />
      </UserRoleProvider>
    </QueryClientProvider>
  );
}

export default App;
