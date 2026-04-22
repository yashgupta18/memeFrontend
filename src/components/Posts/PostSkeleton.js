import { Card, CardActions, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
    height: "100%",
    position: "relative",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  skeleton: {
    backgroundColor: "#f0f0f0",
    animation: "$pulse 1.5s ease-in-out infinite",
  },
  skeletonImage: {
    width: "100%",
    height: "400px",
    backgroundColor: "#e0e0e0",
  },
  skeletonText: {
    height: "16px",
    margin: "12px 16px",
    borderRadius: "4px",
  },
  skeletonTitle: {
    height: "24px",
    margin: "12px 16px",
    borderRadius: "4px",
    width: "70%",
  },
  "@keyframes pulse": {
    "0%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.6,
    },
    "100%": {
      opacity: 1,
    },
  },
});

const PostSkeleton = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={`${classes.skeletonImage} ${classes.skeleton}`} />
      <div className={`${classes.skeletonText} ${classes.skeleton}`} />
      <div className={`${classes.skeletonTitle} ${classes.skeleton}`} />
      <div
        className={`${classes.skeletonText} ${classes.skeleton}`}
        style={{ width: "50%" }}
      />
      <CardActions style={{ padding: "8px 16px 16px", marginTop: "auto" }}>
        <div
          className={classes.skeleton}
          style={{ width: "60px", height: "36px", borderRadius: "4px" }}
        />
      </CardActions>
    </Card>
  );
};

export const PostSkeletons = () => {
  return (
    <Grid container alignItems="stretch" spacing={3}>
      {[1, 2, 3, 4].map((item) => (
        <Grid key={item} item xs={12} sm={6} md={6}>
          <PostSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostSkeleton;
