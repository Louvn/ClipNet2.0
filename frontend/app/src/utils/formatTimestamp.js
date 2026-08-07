export function formatTimestamp(date, translations) {

    const now = new Date();
    const timestamp = new Date(date);
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return translations("time.justNow");
    if (minutes < 60) return translations("time.minutesAgo", {count: minutes});
    if (hours < 24) return translations("time.hoursAgo", {count: hours});
    if (days < 7) return translations("time.daysAgo", {count: days});

    return translations(
        "time.onDate", 
        {date: timestamp.toLocaleDateString(translations("time.locale"), {
            day: "numeric",
            month: "short",
            year: "numeric"
        })}
    );
}