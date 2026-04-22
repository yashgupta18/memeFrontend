import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import { PostSkeletons } from "./PostSkeleton";
import useStyles from "./styles";

const Posts = ({ setCurrentId, searchQuery, sortBy }) => {
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

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const titleMatch = post.title?.toLowerCase().includes(query);
    const tagsMatch = post.tags?.some((tag) =>
      tag.toLowerCase().includes(query),
    );
    return titleMatch || tagsMatch;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "mostLiked":
        return (b.likeCount || 0) - (a.likeCount || 0);
      default:
        return 0;
    }
  });

  if (isLoading) {
    return <PostSkeletons />;
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

  if (searchQuery && !sortedPosts.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Typography variant="h5" color="textSecondary">
          No memes match your search 😕
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
      {sortedPosts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
