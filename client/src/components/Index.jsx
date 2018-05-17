import React from 'react';
import { Redirect } from 'react-router';
import {Grid, Carousel, Button } from 'react-bootstrap';
import Image1 from '../img/BUSINESS_LUNCH_1.jpg';
import Image2 from '../img/BUSINESS_LUNCH_2.jpg';
import Image3 from '../img/BUSINESS_LUNCH_3.jpg';
import Michael from '../img/MichaelProfile.jpg';
import Xiaoqi from '../img/XiaoqiProfile.png';

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toSignup: false
    }
  }

  componentWillMount() {

  }

  _signup(){
    this.setState({toSignup: true})
  }

  render() {
    if(this.state.toSignup){
      return <Redirect to={'api/signup'} />
    }

    return (<Grid>
      <Carousel interval="5000">
        <Carousel.Item>
          <img alt="BUSINESS_LUNCH_1" src={Image1} />
          <Carousel.Caption>
            <h1>Are you tired of eating lunch alone?</h1>
            <h3>50% of business professionals eat their lunch alone.</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img alt="BUSINESS_LUNCH_2" src={Image2} />
          <Carousel.Caption>
            <h1>Turn your lunch into business opportunities!</h1>
            <h3>Connect with industry experts, land your dream job and a lot more.</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img alt="BUSINESS_LUNCH_3" src={Image3} />
          <Carousel.Caption>
            <img className='img-circle' id='indexMichael' alt="Michael" src={Michael} />
            <img className='img-circle' id='indexMichael' alt="Xiaoqi" src={Xiaoqi} />
            <h1>Never Lunch Alone</h1>
            <h3>© 2018 Copyright: Xiaoqi and Michael</h3>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.12/css/all.css" integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9" crossOrigin="anonymous"/>
            <div className="footer-icons">
                <div className="row">
                    <div className="col-md-12 py-5">
                        <div className="mb-5 flex-center">
                            <a className="fb-ic" href="https://facebook.com" target="_blank">
                                <i className="fab fa-facebook-square"></i>
                            </a>
                            <a className="tw-ic" href="https://twitter.com" target="_blank">
                                <i className="fab fa-twitter-square"></i>
                            </a>
                            <a className="gplus-ic" href="https://googleplus.com" target="_blank">
                                <i className="fab fa-google-plus-square"></i>
                            </a>
                            <a className="li-ic" href="https://linkedin.com" target="_blank">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Button type='submit' onClick={this._signup.bind(this)}>Signup today</Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Grid>
    )
  }
}

export default Index
