import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
export default class Homepage extends Component{
  render(){
    let goToSearch = () =>{
      console.log('goint to search');
      browserHistory.push("/");
    }

    let goToPost = () =>{
      console.log('goint to post');
      browserHistory.push("/");
    }
    return(
      <div>
        <div className='split-pane col-xs-12 col-sm-6 uiux-side'>
          <div className="hover-cursor">
            {/* <img src='https://bit.ly/BCR-design' /> */}
              <div onClick={goToSearch} className='text-content'>
                <div className='big'>Search Job?</div>
              </div>

            {/* <button>
              SHOW ME THE DESIGN
            </button> */}
          </div>
        </div>
        <div className='split-pane col-xs-12 col-sm-6 frontend-side'>
          <div className="hover-cursor">
            {/* <img src='https://bit.ly/bcr-dev' /> */}

              <div onClick={goToPost} className='text-content'>
                <div className='big'>Post Job?</div>
              </div>
            {/* <a className='button'>
              SHOW ME THE CODE
            </a> */}
          </div>
        </div>
        <div id='split-pane-or'>
          <div>
            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/74452/bcr-white.png' />
          </div>
        </div>
      </div>

    )
  }
}
