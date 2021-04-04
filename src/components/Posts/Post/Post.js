import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
// import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user= JSON.parse(localStorage.getItem('profile'));

  const Likes = () =>{
    if(post.likes.length > 0){
      return post.likes.find((like)=> like === (user?.result?.googleId))
      ?(
        <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length -1} others` : `${post.likes.length} like${post.likes.length>1?'s':''}`}</>
      ): (
        <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length}{post.likes.length===1?'Like':'Likes'}</>
      );
    }
    return <><ThumbUpAltIcon fontSize="small" />&nbsp;Like</>;
  }

  return (
    <Card className={classes.card}>
      <img src={post.selectedFile} title={post.title} alt="post"/>
      <div className={classes.flex}>
        <Typography variant="h6">By: {post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'orange' }} size="large" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="large" /></Button>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" component="h3">{post.message}</Typography>
      </CardContent>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary"   onClick={() => dispatch(likePost(post._id))}>
          <ThumbUpAltIcon fontSize="small" />Like {post.likeCount}
          {/* <Likes /> */}
        </Button>
        {/* {(user?.result?.googleId === post?.creator) && ( */}
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
        {/* )} */}
      </CardActions>
    </Card>
  );
};

export default Post;
