/**
 * Calendar Utilities for Wedding & Events
 */

export const generateGoogleCalendarUrl = ({ title, description, location, startDate, endDate }) => {
  const start = startDate ? new Date(startDate).toISOString().replace(/-|:|\.\d\d\d/g, "") : "20261220T050000Z";
  const end = endDate ? new Date(endDate).toISOString().replace(/-|:|\.\d\d\d/g, "") : "20261220T170000Z";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: description,
    location: location,
    dates: `${start}/${end}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const downloadIcsFile = ({ title, description, location, startDate, endDate, filename = "wedding-invitation.ics" }) => {
  const start = startDate ? new Date(startDate).toISOString().replace(/-|:|\.\d\d\d/g, "") : "20261220T050000Z";
  const end = endDate ? new Date(endDate).toISOString().replace(/-|:|\.\d\d\d/g, "") : "20261220T170000Z";

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sister's Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
