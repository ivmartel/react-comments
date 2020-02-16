import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import CommentList from './CommentList'

const styles = theme => ({
  root: {
    width: '80%',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper
  }
});

/**
 * Comments component: passes the data to the CommentList.
 */
class Comments extends React.Component {
  state = {
    user: "Olive Larson",
    comments: [
      {
        author: "Sara Lewis",
        body: "You may think that all ice is the same, but if you have contaminated ice, you and your family could be risking your health.",
        date: "2020-02-14T10:33:34.507Z"
      },
      {
        author: "Alma Jackson",
        body: "For most of us, the idea of astronomy is something we directly connect to \"stargazing\".",
        date: "2020-02-14T15:33:34.507Z"
      },
      {
        author: "Michael Ramirez",
        body: "There is such a lot of talk going around about branding, but what exactly is your brand and how do you use it to help you reach more people.",
        date: "2020-02-14T20:33:34.507Z"
      }
    ]
  };

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>
    <CommentList
      comments={this.state.comments}
      user={this.state.user}
      onAddComment={this.onAddComment}
      onUpdateComment={this.onUpdateComment} />
    </div>;
  }

  onAddComment = (comment) => {
    this.setState({
      comments: this.state.comments.concat(comment)
    });
  }
  
  onUpdateComment = (newComment) => {
    this.state.comments.forEach(function (comment, index, array) {
      if (comment.id === newComment.id) {
        array[index] = newComment;
      }
    });
    this.setState({
      comments: this.state.comments
    });
  }
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comments);
