import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #090d16 0%, #0f172a 100%)",
          borderRadius: "8px",
          border: "1px solid rgba(99, 102, 241, 0.8)",
          boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)",
          position: "relative",
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="20"
            cy="20"
            r="12"
            stroke="#818cf8"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />
          <path
            d="M 12 28 L 20 31.5 L 28 28"
            stroke="#64748b"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 10 20 L 15 20 L 17.5 14 L 21 25 L 23.5 17 L 25.5 20 L 30 20"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="20" r="2.5" fill="#38bdf8" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
