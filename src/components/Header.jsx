export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <div
      className="header glass"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "15px 25px",
      }}
    >
      <img
        src="ec2.png.png"
        alt="EcoAudit Logo"
        style={{
          height: "65px",
          width: "65px",
          borderRadius: "50%",
          objectFit: "cover",
          marginRight: "15px",
        }}
      />

    <h1
  style={{
    margin: 0,
    fontSize: "2.3rem",
    fontWeight: "800",
    fontFamily: "Poppins, sans-serif",
    letterSpacing: "1px",
    background: "linear-gradient(90deg, #60d48b, #22c55e, #166534)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  }}
>
  EcoAudit
</h1>
    </div>
  );
}