import { IconButton, Snackbar, SnackbarContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import React, { createContext, useContext, useState } from "react";

const useStyles = makeStyles(() => ({
  success: {
    backgroundColor: "#4caf50",
  },
  error: {
    backgroundColor: "#f44336",
  },
  warning: {
    backgroundColor: "#ff9800",
  },
  info: {
    backgroundColor: "#2196f3",
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
}));

const NotificationContext = createContext();

// Global notification handler that can be used in non-React code
let globalShowNotification = null;

export const notify = {
  success: (message) => {
    if (globalShowNotification) {
      globalShowNotification(message, "success");
    }
  },
  error: (message) => {
    if (globalShowNotification) {
      globalShowNotification(message, "error");
    }
  },
  warning: (message) => {
    if (globalShowNotification) {
      globalShowNotification(message, "warning");
    }
  },
  info: (message) => {
    if (globalShowNotification) {
      globalShowNotification(message, "info");
    }
  },
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const classes = useStyles();
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success", // success, error, warning, info
  });

  const showNotification = (message, severity = "success") => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  // Set the global notification handler
  globalShowNotification = showNotification;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const getIcon = (severity) => {
    switch (severity) {
      case "success":
        return <CheckCircleIcon className={classes.icon} />;
      case "error":
        return <ErrorIcon className={classes.icon} />;
      case "warning":
        return <WarningIcon className={classes.icon} />;
      case "info":
        return <InfoIcon className={classes.icon} />;
      default:
        return null;
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <SnackbarContent
          className={classes[notification.severity]}
          message={
            <span className={classes.message}>
              {getIcon(notification.severity)}
              {notification.message}
            </span>
          }
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </NotificationContext.Provider>
  );
};
