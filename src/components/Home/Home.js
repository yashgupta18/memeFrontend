import {
  Container,
  Grid,
  Grow,
  MenuItem,
  Paper,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getPosts } from "../../actions/posts";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";

const useStyles = makeStyles(() => ({
  searchBar: {
    padding: "16px",
    marginBottom: "16px",
    display: "flex",
    gap: "16px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  searchInput: {
    flex: 1,
    minWidth: "200px",
  },
  sortSelect: {
    minWidth: "150px",
  },
}));

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Paper className={classes.searchBar}>
              <SearchIcon style={{ color: "#999" }} />
              <TextField
                className={classes.searchInput}
                label="Search by title or tags..."
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <TextField
                className={classes.sortSelect}
                select
                label="Sort By"
                variant="outlined"
                size="small"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
                <MenuItem value="mostLiked">Most Liked</MenuItem>
              </TextField>
            </Paper>
            <Posts
              setCurrentId={setCurrentId}
              searchQuery={searchQuery}
              sortBy={sortBy}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
