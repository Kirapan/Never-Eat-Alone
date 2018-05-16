import React, { Component } from 'react';
import {Grid, Carousel } from 'react-bootstrap'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {

  }

  _handleSumbit(event) {
    alert('submited')
    event.preventDefault();
  }

  render() {
    return (<Grid>
      <Carousel>
        <Carousel.Item>
          <img alt="800x500" src="https://www.thechalkdown.com/wp-content/uploads/2018/02/businessman-behaving-business-lunch.jpg" />
          <Carousel.Caption>
            <h3>Are you tired of eating lunch alone?</h3>
            <p>50% of business professionals eat there lunch alone.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img alt="800x500" src="http://www.hotelpurlilium.it/scripts/adw_img/news/grandi/BUSINESS_LUNCH.jpg" />
          <Carousel.Caption>
            <h3>We have the solution!</h3>
            <p>Find a business professional that can give you valuable advice.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img alt="800x500" src="https://media.timeout.com/images/104691590/630/472/image.jpg" />
          <Carousel.Caption>
            <h3>Never Lunch Alone</h3>
            <p>Build by Xiaoting and Michael.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Grid>
    )
  }
}

export default Index
