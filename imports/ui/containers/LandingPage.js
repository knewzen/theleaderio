import React, {Component} from 'react';

import {signinAliasRoute, mainSignUp} from '/imports/startup/client/routes';

export default class LandingPage extends Component {

  render() {

    return (
      <div>
        <div className="carousel carousel-fade" data-ride="carousel">
          <div className="carousel-inner" role="listbox">
            <div className="item active">
              <div className="container-slider">
                <div className="carousel-caption blank">
                  <h2>Do You Strive to Be a Great Leader? <br/></h2>
                  <h2>Not Sure How to Improve?<br/></h2>
                  <p>Get Insight on How Your Team Rates Your Leadership and How to Improve.</p>
                  <p><a className="btn btn-lg btn-primary" role="button" href={mainSignUp.path}>Try For Free!</a></p>
                  <p className="text-muted text-center">
                    <small>You are a leader already?</small>
                  </p>
                  <a className="btn btn-sm btn-white" href={signinAliasRoute.path}>Sign in</a>
                </div>
                <div className="header-back two"></div>
              </div>
            </div>
          </div>
        </div>

        <section className="container features">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="navy-line"></div>
              <h1>Analytics 3.0<br/> <span className="navy"> the era of data-enriched offerings</span></h1>
              <p>New ways of deciding, managing, changing, innovating, improving and Leading.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              <a className="btn btn-lg btn-primary" role="button" href={mainSignUp.path}>Try For Free!</a>
              <p className="text-muted text-center">
                <small>You are a leader already?</small>
              </p>
              <a className="btn btn-sm btn-white" role="button" href={signinAliasRoute.path}>Sign in</a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 text-center wow fadeInLeft">
              <div>
                <i className="fa fa-frown-o features-icon"></i>
                <h2>Identify Unhappy Employees</h2>
                <p>By using past scores and industry data, we identify your 'at risk' employees and send you an
                        immediate email notification so you can proactively address their concerns.</p>
              </div>
              <div className="m-t-lg">
                <i className="fa fa-bar-chart features-icon"></i>
                <h2>Benchmark Against Your Industry</h2>
                <p>See how your leadership stacks up against others in your industry. Benchmark your performance so
                        you can continuously improve.</p>
              </div>
            </div>
            <div className="col-md-6 text-center  wow zoomIn">
              <img src="img/landing/perspective.png" alt="dashboard" className="img-responsive"/>
            </div>
            <div className="col-md-3 text-center wow fadeInRight">
              <div>
                <i className="fa fa-quote-left features-icon"></i>
                <h2>Get Testimonials, Display and Share Them</h2>
                <p>Generate testimonials from your employees, display them using our testimonial widget and have
                        them instantly shared across LinkedIn, Facebook and Twitter.</p>
              </div>
              <div className="m-t-lg">
                <i className="fa fa-rocket features-icon"></i>
                <h2>Embedded analytics</h2>
                <p>Consistent with the increased speed of data processing and analysis, our models in Analytics 3.0
                        are often embedded into operational and decision processes, dramatically increasing speed and
                        impact.</p>
              </div>
            </div>
          </div>
        </section>


        <section id="testimonials" className="navy-section testimonials" style={{marginTop: 0}}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center wow zoomIn">
                <i className="fa fa-comment big-icon"></i>
                <h1>
                  What our users say
                </h1>
                <div className="testimonials-text">
                  <i>theLeader.io is so simple and easy to use, my employees just love filling it out. Now that I
                            have the majority of our employees leaving me feedback on my leadership, I feel more engaged
                            with them and can use the data to make more confident business decisions.</i>
                </div>
                <small>
                  <strong>12.02.2015 - Andy Smith</strong>
                </small>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="gray-section contact">
          <div className="container">
            <div className="row m-b-lg">
              <div className="col-lg-12 text-center">
                <div className="navy-line"></div>
                <h1>Contact Us</h1>
                <p>Feel Free to contact us in case you have any question.</p>
              </div>
            </div>
            <div className="row m-b-lg">
              <div className="col-lg-3 col-lg-offset-3">
                <address>
                  <strong><span className="navy">theLeader.io, Inc.</span></strong><br/>
                  55 East 52nd Street<br/>
                  New York, NY 10022, United States<br/>
                </address>
              </div>
              <div className="col-lg-4">
                <p className="text-color">
                  Our Vision in theLeader.io is to help leaders like you to become a better leader. You can make
                  decisions for your employees based on data and monitor employee satisfaction to reduce your turn
                  over rate. Leadership matters a lot.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 text-center">
                <a className="btn btn-lg btn-primary" role="button" href={mainSignUp.path}>Try For Free!</a>
                <p className="text-muted text-center">
                  <small>You are a leader already?</small>
                </p>
                <a className="btn btn-sm btn-white" role="button" href={signinAliasRoute.path}>Sign in</a>
                <p className="m-t-sm">
                  Follow us on social platform
                </p>
                <ul className="list-inline social-icon">
                  <li><a href="https://twitter.com/chrisshayan"><i className="fa fa-twitter"></i></a>
                  </li>
                  <li><a href="https://vn.linkedin.com/in/chrisshayan"><i className="fa fa-linkedin"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 text-center m-t-lg m-b-lg">
              </div>
              <p><strong>&copy; theLeader.io</strong><br/> We Help Leaders to become a better Leader by improving the
                    Decision Making Process.</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

}