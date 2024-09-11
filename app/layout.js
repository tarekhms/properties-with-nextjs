import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/assests/styles/globals.css';

export const metadata = {
  title: 'Property Pulse',
}

const MainLayout = ({ children }) => {
  return (<html lang="en">
    <body>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </body>
  </html>);
}

export default MainLayout;
