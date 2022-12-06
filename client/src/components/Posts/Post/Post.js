import {
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import useStyle from './styles';
import { useDispatch } from 'react-redux';
import { removePost, likePost } from '../../../actions/posts';
import { useState } from 'react';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyle();
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.profileObj?.googleId || user?.profileObj?._id;
  const hasLikePost = post.likes.find((like) => like === userId);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    dispatch(likePost(post._id));

    if (hasLikePost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return hasLikePost ? (
        <>
          <ThumbUpAlt fontSize='small' />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize='small' />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => navigate(`/posts/${post.slug}`);

  return (
    <Card className={classes.card} elevation={6}>
      <ButtonBase
        component='span'
        name='test'
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body1'>
            {moment(post.createAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          {(user?.profileObj?.googleId === post?.creator ||
            user?.profileObj?._id === post?.creator) && (
            <Button
              size='small'
              style={{ color: 'white' }}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize='medium' />
            </Button>
          )}
        </div>
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title}>{post.title}</Typography>
      </ButtonBase>
      <CardContent>
        <Typography
          variant='body2'
          color='textSecondary'
          component='p'
          gutterBottom
        >
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color={`${post.likes.length > 0 ? 'primary' : 'default'}`}
          onClick={handleLike}
          disabled={!user?.profileObj}
        >
          <Likes />
        </Button>
        {(user?.profileObj?.googleId === post?.creator ||
          user?.profileObj?._id === post?.creator) && (
          <Button
            size='small'
            onClick={() => {
              dispatch(removePost(post._id));
            }}
          >
            <DeleteIcon fontSize='medium' color='error' />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
