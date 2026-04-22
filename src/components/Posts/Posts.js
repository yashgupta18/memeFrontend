import { CircularProgress, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchposts = useSelector((state) => state.posts);

  useEffect(() => {
    setPosts(fetchposts);
    // Set loading to false after initial fetch
    if (fetchposts.length >= 0) {
      setIsLoading(false);
    }
  }, [fetchposts]);

  const classes = useStyles();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!posts.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Typography variant="h5" color="textSecondary">
          No memes yet. Be the first to post! 🎉
        </Typography>
      </div>
    );
  }

  return (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
