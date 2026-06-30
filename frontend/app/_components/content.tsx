export const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "#fff",
        padding: "8px 12px",
        borderRadius: "8px",
      }}
    >
      <span
        style={{
          color: "#2563eb", // Cor do texto
          fontWeight: "bold",
        }}
      >
        {payload[0].value}
      </span>
    </div>
  );
};

