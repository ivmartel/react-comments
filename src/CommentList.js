import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  form: {
    width: '100%',
  },
  header: {
    backgroundColor: 'lightGrey'
  },
  title: {
    margin: '10px',
  },
  padtop: {
    paddingTop: '20px'
  },
  padright: {
    paddingRight: '10px',
  }
});

/**
 * CommentList: displays the comments.
 */
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canUpdate: {},
      updateTime: 0.5 * 60 * 1000 // 5mn
    };
    // bind handlers
    this.handleAddCommentChange = this.handleAddCommentChange.bind(this);
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.handleUpdateCommentChange = this.handleUpdateCommentChange.bind(this);
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }

  getCommentElement(comment) {
    var result = null;
    if (typeof this.state.canUpdate !== "undefined" &&
      this.state.canUpdate[comment.id]) {
      if (this.state.wantsUpdate === comment.id) {
          const { classes } = this.props;
          result = <form id="update" 
            className={classes.form} 
            noValidate autoComplete="off"
            onSubmit={this.handleSubmitUpdate}>
            <ListItemText 
            primary={comment.author} />
            <Grid container>
              <Grid item xs={10} className={classes.padright}>
                <TextField
                  id={"update-comment-"+comment.id}
                  value={comment.body}
                  onChange={this.handleUpdateCommentChange}
                  multiline
                  fullWidth/>
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" type="submit">SEND</Button>
              </Grid>
            </Grid>
          </form>
      } else {
        result = <div>
          <ListItemText 
            primary={comment.author} 
            secondary={comment.body} />
          <Button
            variant="contained"
            id={"want-update-comment-"+comment.id}
            onClick={this.handleUpdateClick}>
            UPDATE
          </Button>
        </div>
      }
    } else {
      result = <ListItemText 
        primary={comment.author} 
        secondary={comment.body} />
    } 

    return result;
  }

  render() {
    const { classes } = this.props;
    return <div>
      <div className={classes.header}>
        <h1 className={classes.title}>{this.props.user}</h1>
      </div>
      <List>
      {this.props.comments.map((comment, index) => (
        <div key={index}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>{comment.author.charAt(0)}</Avatar>
            </ListItemAvatar>
            {this.getCommentElement(comment)}
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
      <ListItem 
        key={this.props.comments.length + 1} 
        className={classes.padtop}>
        <ListItemAvatar>
          <CommentIcon color="primary"/>
        </ListItemAvatar>
        <form id="add"
          className={classes.form} 
          noValidate autoComplete="off"
          onSubmit={this.handleSubmitAdd}>
          <Grid container>
            <Grid item xs={10} className={classes.padright}>
              <TextField
                id="add-comment"
                placeholder="Start typing your comment here..."
                onChange={this.handleAddCommentChange}
                multiline
                fullWidth/>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" type="submit">SEND</Button>
            </Grid>
          </Grid>
        </form>
      </ListItem>
    </List>
    </div>
  }

  handleAddCommentChange(event) {
    this.setState({
      newComment: event.target.value
    });
  }

  handleSubmitAdd(event) {
    event.preventDefault();
    const id = this.props.comments.length;
    this.props.onAddComment({
      date: (new Date()).toJSON(),
      id: id,
      author: this.props.user, 
      body: this.state.newComment
    });
    event.target.reset();

    this.state.canUpdate[id] = true;
    this.setState({
      canUpdate: this.state.canUpdate,
      timeout: setTimeout(this.getResetCanUpdateFlag(id), this.state.updateTime)
    });
  }

  getResetCanUpdateFlag(id) {
    return () => {
      this.state.canUpdate[id] = false;
      this.setState({
        canUpdate: this.state.canUpdate,
      });
    }
  }
  
  handleUpdateClick(event) {
    const id = parseInt(event.currentTarget.id.substring(
      event.currentTarget.id.lastIndexOf('-') + 1), 10);
    this.setState({wantsUpdate: id});
  }
  
  resetWantsUpdateFlag() {
    this.setState({
      wantsUpdate: -1,
    });
  }
  
  handleUpdateCommentChange(event) {
    const id = parseInt(event.currentTarget.id.substring(
      event.currentTarget.id.lastIndexOf('-') + 1), 10);
    let updateComment = this.props.comments[id];
    updateComment.body = event.currentTarget.value;
    this.setState({
      updateComment: updateComment
    });
  }

  handleSubmitUpdate(event) {
    event.preventDefault();
    if (typeof this.state.updateComment !== "undefined") {
      this.props.onUpdateComment(this.state.updateComment);
    }
    // reset update flag
    this.resetWantsUpdateFlag();
  }
}

CommentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentList);
