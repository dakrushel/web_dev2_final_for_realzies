import "./globals.css";

export const metadata = {
  title: "Dice Roll App",
  description: "A simple and fun dice rolling application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-background text-foreground">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
