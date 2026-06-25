const BASE_URL = "http://4.224.186.213/evaluation-service/notifications";

export async function fetchNotifications({
  page = 1,
  limit = 10,
  notificationType = "",
} = {}) {
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);

  if (notificationType && notificationType !== "All") {
    params.append("notification_type", notificationType);
  }

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Unable to fetch notifications");
  }

  return await response.json();
}