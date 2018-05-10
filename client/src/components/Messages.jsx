import React from 'react'
import { Grid,Popover, Label } from 'react-bootstrap'
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
        console.log("iamdthehrekrheresult,",result)
        this.setState({ messages: result })
      })
      .catch((errors) => this.setState({ errors: errors }))
  }

  render() {

    const messageList = this.state.messages.map((msg, idx) => {
      return (<div style={{ height: 120 }}>
        <Popover
          id={'popover-basic-' + idx}
          placement="right"
          positionLeft={200}
          positionTop={50}
          title="ok"//change to sendername
          >
          {msg.content}
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
