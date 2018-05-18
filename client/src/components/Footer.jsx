import React from 'react'

const Footer = (props) => (
    <footer className="page-footer">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.12/css/all.css" integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9" crossOrigin="anonymous" />
        <div className="footer-icons">
            <div className="row">
                <div className="col-md-12 py-5">
                    <div className="mb-5 flex-center">
                        <a className="fb-ic" href="https://facebook.com">
                            <i className="fab fa-facebook-square"></i>
                        </a>
                        <a className="tw-ic" href="https://twitter.com">
                            <i className="fab fa-twitter-square"></i>
                        </a>
                        <a className="gplus-ic" href="https://googleplus.com">
                            <i className="fab fa-google-plus-square"></i>
                        </a>
                        <a className="li-ic" href="https://linkedin.com">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-copyright py-3 text-center">
            Never Lunch Alone © 2018 Copyright: Xiaoqi and Michael
    </div>

    </footer>
)

export default Footer
