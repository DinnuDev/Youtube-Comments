import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Divider,
  makeStyles,
} from '@material-ui/core';
import { ThumbUp, ThumbDown, Delete, Reply, ExpandMore, ExpandLess } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  commentItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nestedCommentItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(4),
  },
  commentText: {
    marginRight: theme.spacing(2),
  },
  actionsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  replyTextField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  replyButton: {
    marginLeft: theme.spacing(1),
  },
}));

const CommentSection = () => {
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyComments, setReplyComments] = useState({});
  const [expandedComments, setExpandedComments] = useState({});

  const handleAddComment = () => {
    const timestamp = new Date().toLocaleString();
    const newCommentObj = {
      id: comments.length + 1,
      name: generateRandomName(),
      text: newComment,
      timestamp,
      likes: 0,
      dislikes: 0,
      replies: [],
    };
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
  };

  const handleAddReply = (commentId) => {
    const timestamp = new Date().toLocaleString();
    const replyText = replyComments[commentId];
    if (replyText) {
      const newReply = {
        id: comments.length + 1,
        name: generateRandomName(),
        text: replyText,
        timestamp,
        likes: 0,
        dislikes: 0,
      };
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyComments({ ...replyComments, [commentId]: '' });
    }
  };

  const handleLike = (commentId, isReply = false) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const likeCount = isReply ? comment.likes + 1 : comment.likes + 1;
        const dislikeCount = isReply ? comment.dislikes : comment.dislikes - 1;
        return {
          ...comment,
          likes: likeCount,
          dislikes: dislikeCount < 0 ? 0 : dislikeCount,
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDislike = (commentId, isReply = false) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const likeCount = isReply ? comment.likes : comment.likes - 1;
        const dislikeCount = isReply ? comment.dislikes + 1 : comment.dislikes + 1;
        return {
          ...comment,
          likes: likeCount < 0 ? 0 : likeCount,
          dislikes: dislikeCount,
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleExpandComment = (commentId) => {
    setExpandedComments((prevExpanded) => ({
      ...prevExpanded,
      [commentId]: !prevExpanded[commentId],
    }));
  };

  const generateRandomName = () => {
    const names = ['John', 'Jane', 'Alice', 'Bob', 'Eve'];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  };

  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  return (
    <Container className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <TextField
        label="Add a comment"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddComment}>
        Add Comment
      </Button>
      <List>
        {comments.map((comment) => (
          <div key={comment.id}>
            <ListItem className={classes.commentItem}>
              <ListItemText
                primary={comment.text}
                secondary={`${comment.name} - ${comment.timestamp}`}
                classes={{ primary: classes.commentText }}
              />
              <div className={classes.actionsContainer}>
                <IconButton
                  edge="end"
                  aria-label="like"
                  onClick={() => handleLike(comment.id)}
                  style={{ color: comment.likes > 0 ? 'green' : 'inherit' }}
                >
                  <ThumbUp />
                </IconButton>
                <Typography variant="body2">{comment.likes}</Typography>
                <IconButton
                  edge="end"
                  aria-label="dislike"
                  onClick={() => handleDislike(comment.id)}
                  style={{ color: comment.dislikes > 0 ? 'green' : 'inherit' }}
                >
                  <ThumbDown />
                </IconButton>
                <Typography variant="body2">{comment.dislikes}</Typography>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <Delete />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="reply"
                  onClick={() => handleExpandComment(comment.id)}
                >
                  {expandedComments[comment.id] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </div>
            </ListItem>
            <Collapse in={expandedComments[comment.id]}>
              <div>
                <List disablePadding>
                  {comment.replies.map((reply) => (
                    <div key={reply.id}>
                      <ListItem className={classes.nestedCommentItem}>
                        <ListItemText
                          primary={reply.text}
                          secondary={`${reply.name} - ${reply.timestamp}`}
                          classes={{ primary: classes.commentText }}
                        />
                        <div className={classes.actionsContainer}>
                          <IconButton
                            edge="end"
                            aria-label="like"
                            onClick={() => handleLike(reply.id, true)}
                            style={{ color: reply.likes > 0 ? 'green' : 'inherit' }}
                          >
                            <ThumbUp />
                          </IconButton>
                          <Typography variant="body2">{reply.likes}</Typography>
                          <IconButton
                            edge="end"
                            aria-label="dislike"
                            onClick={() => handleDislike(reply.id, true)}
                            style={{ color: reply.dislikes > 0 ? 'green' : 'inherit' }}
                          >
                            <ThumbDown />
                          </IconButton>
                          <Typography variant="body2">{reply.dislikes}</Typography>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteComment(reply.id)}
                          >
                            <Delete />
                          </IconButton>
                        </div>
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                  <ListItem className={classes.nestedCommentItem}>
                    <TextField
                      label="Reply to this comment"
                      multiline
                      rows={2}
                      variant="outlined"
                      fullWidth
                      value={replyComments[comment.id] || ''}
                      onChange={(e) =>
                        setReplyComments({ ...replyComments, [comment.id]: e.target.value })
                      }
                      className={classes.replyTextField}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddReply(comment.id)}
                      disabled={!replyComments[comment.id]}
                      className={classes.replyButton}
                    >
                      Reply
                    </Button>
                  </ListItem>
                </List>
              </div>
            </Collapse>
            <Divider />
          </div>
        ))}
      </List>
    </Container>
  );
};

export default CommentSection;
