import * as React from 'react';
import Row from 'antd/lib/row';
import 'antd/lib/row/style/css';
import Col from 'antd/lib/col';
import 'antd/lib/col/style/css';

import './Girds.css'

class Girds extends React.Component<{}, {}>{

  public render(): React.ReactNode {
    return (
      <div className="girds">
        <Row className="row" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="col"  span={12}>
            <div>col-12</div>
          </Col>
          <Col className="col" span={12}>
            <div>col-12</div>
          </Col>
        </Row>

        <Row className="row" type="flex" justify="center">
          <Col className="col" span={8}>col-8</Col>
          <Col className="col" span={8}>col-8</Col>
        </Row>


      </div>
    )
  }
}

export default Girds
