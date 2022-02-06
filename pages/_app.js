import UserProvider from "../contexts/UserContext";
import "../styles/globals.scss";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  const {page, title} = Component().props
  return (
    <UserProvider>
      <Layout page={Component().type.name} title={Component().props.title}>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
