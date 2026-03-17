export const getLocale = (language?: string) => (language === "ar" ? "ar" : "en-US");

export const formatDateTime = (
  value: string,
  language?: string,
  fallback = "-"
) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return fallback;
  }
  const locale = getLocale(language);
  const datePart = parsed.toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const timePart = parsed.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${datePart} - ${timePart}`;
};

export const formatDateTimeParts = (
  value: string,
  language?: string,
  fallback = "-"
) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return { date: fallback, time: fallback };
  }
  const locale = getLocale(language);
  return {
    date: parsed.toLocaleDateString(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    time: parsed.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};
