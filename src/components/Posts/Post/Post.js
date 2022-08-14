import { Button, Card, CardActions, Typography } from "@material-ui/core/";
// import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

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
    <Card className={classes.card}>
      <img src={post.selectedFile} title={post.title} alt="post" />
      <div className={classes.flex}>
        <Typography variant="h7">By: {post.name}</Typography>
        <Typography variant="h7">{moment(post.createdAt).fromNow()}</Typography>
      </div>

      <Typography
        className={classes.title}
        gutterBottom
        variant="h6"
        component="h6"
      >
        {post.title}
      </Typography>
      <Typography className={classes.title} variant="h7">
        {post.message}
      </Typography>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
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
  );
};

export default Post;
