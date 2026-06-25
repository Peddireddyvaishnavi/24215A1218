import { useState } from "react";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";

export default function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const {
    notifications,
    totalPages,
    loading,
    error,
  } = useNotifications(page, 10, filter);

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", py: 4 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Badge badgeContent={unreadCount} color="primary">
          <NotificationsIcon />
        </Badge>

        <Typography variant="h4">
          Notifications
        </Typography>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <NotificationFilter
        value={filter}
        onChange={setFilter}
      />

      <Box mt={3}>
        {loading && (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        )}

        {!loading && error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {!loading &&
          !error &&
          notifications.length === 0 && (
            <Alert severity="info">
              No notifications found
            </Alert>
          )}

        {!loading &&
          !error &&
          notifications.length > 0 && (
            <Stack spacing={2}>
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </Stack>
          )}
      </Box>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          page={page}
          count={totalPages}
          onChange={(_, value) => setPage(value)}
        />
      </Box>
    </Box>
  );
}