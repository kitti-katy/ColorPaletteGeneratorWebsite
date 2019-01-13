import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

export default class Register extends React.Component {
  state = {
    ...INITIAL_STATE,
    open: false
  };

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => this.setState({ ...INITIAL_STATE }))
      .catch(error => this.setState({ error }));
    event.preventDefault();
  }

  onChange = event => this.setState({ [event.target.name]: event.target.value });
  handleClickOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });
  handleLoginButtonClick = () => { };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';

    return (
      <div>
        <Button onClick={this.handleClickOpen}>Sign Up</Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title"        >
          <DialogTitle id="form-dialog-title">Sign Up </DialogTitle>
          <DialogContent>

            <form onSubmit={this.onSubmit}>
              <input name="username" value={username} onChange={this.onChange} type="text" placeholder="Full Name" />
              <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
              <input name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="Password" />
              <input name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm Password" />
              <button disabled={isInvalid} type="submit">Sign Up</button>
              {error && <p>{error.message}</p>}
            </form>

            <TextField autoFocus margin="dense" id="name" label="Username" type="text" fullWidth />
            <TextField autoFocus margin="dense" id="name" label="Email" type="email" fullWidth />
            <TextField autoFocus margin="dense" id="name" label="Password" type="password" fullWidth />
            <TextField autoFocus margin="dense" id="name" label="Confirm Password" type="password" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">Cancel</Button>
            <Button onClick={this.handleClose} color="primary">Create Account</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}