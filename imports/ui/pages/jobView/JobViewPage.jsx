import React, {Component} from 'react';

export default class JobViewPage extends Component {
  render() {
        let jobId = this.props.params.jobId;
    return (
      <div>
        <h1>"Company Name"</h1>
        <h2>"JOB TITLE"</h2>
        <h2>"Address"</h2>

      <div>
          <h5 id = "D5">DESCRIPTION</h5>
          <pre id = "DescPre">
            My Bonnie lies over the ocean.

            My Bonnie lies over the sea.

            My Bonnie lies over the ocean.

            Oh, bring back my Bonnie to me.
          </pre>
        </div>
      </div>
    )
  }
}
