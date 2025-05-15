// src/components/TicketList.js
export default function TicketList({ tickets }) {
  return (
    <ul className="text-xs text-muted w-full mt-2">
      {tickets.map((ticket, idx) => (
        <li key={idx}>🎫 {ticket}</li>
      ))}
    </ul>
  );
}
