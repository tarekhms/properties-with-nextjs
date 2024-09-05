import '@/assests/styles/globals.css';

export const metadata = {
  title: 'Property Puls',
}

const MainLayout = ({ children }) => {
  return (<html>
    <body>
      <main>{children}</main>
    </body>
  </html>);
}

export default MainLayout;
