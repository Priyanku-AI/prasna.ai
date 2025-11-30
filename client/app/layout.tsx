import QueryProvider from "../providers/QueryProvider";
import "../app/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
