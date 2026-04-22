import {
  Button,
  Card,
  CardActions,
  Dialog,
  DialogContent,
  Typography,
} from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const Likes = () =>{
  //     if(post.likes.length > 0){
  //         return post.likes.find((like)=> like === (user?.result?.googleId))
  //             ?(
  //                 <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length -1} others` : `${post.likes.length} like${post.likes.length>1?'s':''}`}</>
  //             ): (
  //                 <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length}{post.likes.length===1?'Like':'Likes'}</>
  //             );
  //     }
  //     return <><ThumbUpAltIcon fontSize="small" />&nbsp;Like</>;
  // }

  return (
    <>
      <Card className={classes.card}>
        <img
          src={post.selectedFile}
          title={post.title}
          alt="post"
          onClick={handleOpen}
        />
        <div className={classes.flex}>
          <Typography variant="body1">By: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>

        <Typography
          className={classes.title}
          gutterBottom
          variant="body1"
          component="h6"
        >
          {post.title}
        </Typography>
        {post.message && (
          <Typography className={classes.message} variant="body2">
            {post.message}
          </Typography>
        )}
        {post.tags && post.tags.some((tag) => tag.trim() !== "") && (
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              {post.tags
                .filter((tag) => tag.trim() !== "")
                .map((tag) => `#${tag} `)}
            </Typography>
          </div>
        )}
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(likePost(post._id))}
          >
            <ThumbUpAltIcon fontSize="small" />
            {post.likeCount}
            {/* <Likes /> */}
          </Button>
          <CardActions className={classes.overlay2}>
            <Button
              style={{ color: "grey" }}
              size="small"
              onClick={() => setCurrentId(post._id)}
            >
              <EditIcon fontSize="medium" />
            </Button>
          </CardActions>
          {user?.result?.googleId === post?.creator && (
            <Button
              style={{ color: "red" }}
              size="small"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <DeleteIcon fontSize="small" />
              {/* Delete */}
            </Button>
          )}
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <div style={{ position: "relative" }}>
          <Button
            onClick={handleClose}
            style={{
              position: "absolute",
              right: 8,
              top: 8,
              zIndex: 1,
              backgroundColor: "rgba(255,255,255,0.9)",
              minWidth: "40px",
            }}
          >
            <CloseIcon />
          </Button>
          <DialogContent style={{ padding: 0 }}>
            <img
              src={post.selectedFile}
              alt={post.title}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
            <div style={{ padding: "16px" }}>
              <Typography variant="h5" gutterBottom style={{ fontWeight: 600 }}>
                {post.title}
              </Typography>
              {post.message && (
                <Typography variant="body1" paragraph>
                  {post.message}
                </Typography>
              )}
              {post.tags && post.tags.some((tag) => tag.trim() !== "") && (
                <Typography variant="body2" color="textSecondary">
                  {post.tags
                    .filter((tag) => tag.trim() !== "")
                    .map((tag) => `#${tag} `)}
                </Typography>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "16px",
                  color: "#888",
                }}
              >
                <Typography variant="body2">By: {post.name}</Typography>
                <Typography variant="body2">
                  {moment(post.createdAt).fromNow()}
                </Typography>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default Post;
