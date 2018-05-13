import React from 'react'
import { Modal, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import Resource from '../models/resource'

const userData = Resource('users')

class Messagebox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: (this.props.match.params.id || null),
      toId: (this.props.match.params.to_id || null),
      show: false,
      redirect: "",
      content: ""
    }
  }

  componentWillMount() {
    this.setState({ show: true })
  }

  _hide = () => {
    this.setState({ show: false, redirect: `/api/users/${this.state.userId}/messages` })
  }

  _handleSubmit = (e) => {
    userData.sendMessages(this.state.userId, this.state.toId, this.state.content)
      .then(() => {
        console.log("ok")
      })
      .catch((errors) => this.setState({ errors: errors }))
      this._hide();
  }


  _handleChange = (e) => {
    this.setState({ content: e.target.value })
  }

  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />
    const messages_to_id = this.props.messages.filter(mess => mess.from_user_id == this.state.toId)
    const name = messages_to_id[0].name
    return (
      <div>

        {this.state.toId &&
          <Modal show={this.state.show}
            onHide={this._hide} style={{ zIndex: 1200 }}>
            <Modal.Header closeButton>
              <Modal.Title>Reply to {name}</Modal.Title>
            </Modal.Header>
              <Modal.Body>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Message:</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Say something..." onChange={this._handleChange.bind(this)} />
                </FormGroup>
              </Modal.Body>

              <Modal.Footer>
                <Button onClick={this._handleSubmit.bind(this)}>Send</Button>
              </Modal.Footer>
        
          </Modal>}

      </div>
    )
  }
}

export default Messagebox
