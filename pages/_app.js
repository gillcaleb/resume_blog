import '../styles/index.css'
import GoogleAnalytics from '../components/google-analytics';
import { ThemeProvider } from "next-themes";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <GoogleAnalytics />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
