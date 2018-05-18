import React from 'react'
import { Popover, Image, Button, ButtonGroup } from 'react-bootstrap'
import { Link, Switch, Route } from 'react-router-dom'
import Resource from '../models/resource'
import Messagebox from './Messagebox'

const userData = Resource('users')

class Messages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: (this.props.match.params.id || null),
      messages: []
    }
  }

  componentWillMount() {
    userData.findMessages(this.state.userId)
      .then((result) => {
        this.setState({ messages: result })
      })
      .catch((errors) => this.setState({ errors: errors }))
  }

  render() {
    const sortedList = this.state.messages.sort((a, b) => {
      let aa = new Date(a.created_at)
      let bb = new Date(b.created_at)
      return bb - aa
    })
    const inline = { borderTop: '1px solid #dadce0' }
    const messageList = sortedList.map((msg, idx) => {
      return (<Popover
        id={'popover-basic-' + idx}
        className="popover-all"
        placement="right"
        positionLeft={300}
        positionTop={90 + 160 * idx}
        title={msg.name}
        style={{ zIndex: 8 }}
      >
        <Image className="sender" src={msg.image} alt={msg.name} style={{ margin: 30, width: 128 }} rounded />
        <div id="right-part-message"><p className="receive-content">{msg.content}</p><br style={inline} />

          <Link to={{
            pathname: `/api/users/${this.state.userId}/messages/${msg.from_user_id}`,
            state: { modal: true }
          }
          }>
            <Button className="reply-button" bsStyle="warning">Reply</Button></Link>
          <br />
          <small >{msg.created_at}           </small></div>
        <Switch>
          <Route path='/api/users/:id/messages/:to_id' render={(props) => (
            <Messagebox {...props} messages={this.state.messages} />)} />
        </Switch>
      </Popover>);
    })

    const buttonGroup = sortedList.map((msg, idx) => {
      return (

        <Button href={"#popover-basic-" + idx}>{msg.name}</Button>

      )
    })
    return (
      <div className="iamthediv">
        <ButtonGroup vertical className="message-button">
          {buttonGroup}
        </ButtonGroup>
        {messageList}
      </div >
    )
  }
}

export default Messages
