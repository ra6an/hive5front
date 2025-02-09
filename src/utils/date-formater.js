function formatDateTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date; // Razlika u milisekundama
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffMin < 1) return "1 min ago"; // Manje od 1 min
  if (diffMin < 60) return `${diffMin} min ago`; // Manje od 1h
  if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? "s" : ""} ago`; // Manje od 24h

  // Format: "February 09, 2025 at 15:50"
  return date
    .toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "") // Uklanja zarez između dana i godine
    .replace(" at", " at "); // Održava razmak prije vremena
}

export default formatDateTime;
