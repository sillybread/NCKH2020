import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Select from 'react-select';
import TabsChart from './TabsChart';
import Management from './Management';

function status(props) {
    return (
        <React.Fragment>
            <Row className="page-title align-items-center">
                <Col sm={4} xl={8}>
                    <h4 className="mb-1 mt-0">Status</h4>
                </Col>
                <Col sm={8} xl={4}>
                    <Select
                        className="react-select bg-white"
                        classNamePrefix="react-select"
                        defaultValue={{ value: 'WH0001', label: 'Room 1' }}
                        options={[
                            { value: 'WH0001', label: 'Room 1' },
                            { value: 'WH0002', label: 'Ware House 2' },
                            { value: 'WH0003', label: 'Ware House 3' },
                        ]}></Select>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardBody>
                            <TabsChart></TabsChart>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Management />
        </React.Fragment>
    );
}

status.propTypes = {};

export default status;
