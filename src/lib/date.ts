export function formatDate(date: Date) {
	// Format with YYYY-MM-DD with Asia/Jakarta timezone
	return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
}
