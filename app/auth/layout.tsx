const AuthLayout = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  return ( 
    <div style={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(ellipse at top, #1a1c26, #000000)" 
    }}>
      {children}
    </div>
   );
}
 
export default AuthLayout;
