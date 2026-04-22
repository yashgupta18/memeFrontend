import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // backgroundBlendMode: 'darken',
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "20px",
    height: "100%",
    position: "relative",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    overflow: "hidden",
    backgroundColor: "#fff",
    "&:hover": {
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
      transform: "translateY(-4px)",
    },
    "& img": {
      width: "100%",
      height: "auto",
      maxHeight: "400px",
      objectFit: "cover",
      display: "block",
    },
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 16px",
    fontSize: "0.875rem",
    color: "#666",
    borderBottom: "1px solid #f0f0f0",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    right: "40%",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 16px",
    flexWrap: "wrap",
    gap: "8px",
  },
  title: {
    padding: "12px 16px 8px",
    fontWeight: 600,
    color: "#333",
  },
  cardActions: {
    padding: "8px 16px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #f0f0f0",
    marginTop: "auto",
  },
});
