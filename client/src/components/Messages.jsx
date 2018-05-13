import React from 'react'
import { Grid,Popover, Label, Image, Button } from 'react-bootstrap'
import Resource from '../models/resource'

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
    const sortedList = this.state.messages.sort((a, b)=> {
      return b.created_at- a.created_at
    })
    const inline = { borderTop: '1px solid #dadce0'}
    const messageList = sortedList.map((msg, idx) => {
      return (<div>
      <Image src={msg.image} alt={msg.name} style={{margin: 30, width: 128 }} rounded/>
        <Popover
          id={'popover-basic-' + idx}
          placement="right"
          positionLeft={300}
          positionTop={90+160*idx}
          title={msg.name}
          >
          <p >{msg.content}</p><br style={inline}/>
          <small >{msg.created_at}           </small>
          <Button bsStyle="warning" onClick>Reply</Button>
        </Popover>
      </div>);
  })
  return(
      <div>
        {messageList}
      </div >
    )
  }
}

export default Messages
