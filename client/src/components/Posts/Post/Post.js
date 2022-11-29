import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import useStyle from './styles';
import { useDispatch } from 'react-redux';
import { removePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyle();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.creator}</Typography>
        <Typography variant='body1'>
          {moment(post.createAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          size='small'
          style={{ color: 'white' }}
          onClick={() => {
            setCurrentId(post._id);
          }}
        >
          <MoreHorizIcon fontSize='medium' />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title}>{post.title}</Typography>
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
          color={`${post.likeCount > 0 && 'primary'}`}
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <ThumbUpAlt fontSize='medium' />
          {post.likeCount > 0 && post.likeCount}
        </Button>
        <Button
          size='small'
          onClick={() => {
            dispatch(removePost(post._id));
          }}
        >
          <DeleteIcon fontSize='medium' />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
