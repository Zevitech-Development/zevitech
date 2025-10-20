

export default function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
}
