export function DisplayDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("de-DE", {
        day: "2-digit",
        year: "numeric",
        month: "2-digit",
    });
}

export function DisplayDateTime(dateString: string) {
    return new Date(dateString).toLocaleString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

}
