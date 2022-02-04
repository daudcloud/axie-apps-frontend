import UserProvider from "../contexts/UserContext";
import "../styles/globals.scss";
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  console.log(Component().type.name)
  return (
    <UserProvider>
      <Layout page={Component().type.name} title={Component().type.name}>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
