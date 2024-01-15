import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from './layouts/Layout';
import Register from "./pages/Register";
import Signin from "./pages/Signin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={

          <Layout>
            <p>Homepage</p>
          </Layout>
        } />

        <Route path="/search" element={
          <Layout>
            <p>Searchpage</p>
          </Layout>
        } />

        <Route path="/register" element={
          <Layout>
            <Register />
          </Layout>} />

        <Route path="/sign-in" element={<Layout><Signin /></Layout>} />


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App
