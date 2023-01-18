import { CircularProgress, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
// import { postsMock } from "./postsMock";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const [posts, setPosts] = useState([])
  const fetchposts = useSelector((state) => state.posts);

  useEffect(() => {
    setPosts(fetchposts)
  }, [fetchposts])

  // if (posts.length === 0) {
  //   console.log({fetchposts});
  //   setPosts(postsMock)
  // }

  const classes = useStyles();

  return !posts.length ? (
    <CircularProgress />
  ) : (
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
