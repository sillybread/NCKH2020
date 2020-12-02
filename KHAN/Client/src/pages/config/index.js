import React, { useState } from 'react';
import { Card, CardBody, Col, Nav, NavItem, Row, NavLink, TabContent, TabPane} from 'reactstrap';
import Management from './managerments/Management';
import classnames from 'classnames';
import SensorMap from './sensorMap/sensorMap';
import WareHouseConfig from './warehouseConfig/warehouseConfig';
import ApiService from './apiService/ApiService';

export default function Config() {
    const [activeTab, setActiveTab] = useState('1');
    const tabContents = [
        {
            id: '1',
            title: 'Sơ đồ cảm biến',
            disabled: false,
        },
        {
            id: '2',
            title: 'Thông tin kho',
            disabled: false,
        },
        {
            id: '3',
            title: 'Khu vực',
            disabled: false,
        },
        {
            id: '4',
            title: 'Người quản lý',
            disabled: false,
        },
        {
            id: '5',
            title: 'Api',
            disabled: false,
        },
    ];
    return (
        <React.Fragment>
            <Row className="page-title align-items-center">
                <Col xs={12}>
                    <h4 className="mb-1 mt-0">Quản lý kho lạnh</h4>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <Card>
                        <CardBody>
                            <Nav className="nav nav-pills navtab-bg nav-justified">
                                {tabContents.map((tab, index) => {
                                    return (
                                        <NavItem key={index}>
                                            <NavLink
                                                href="#"
                                                disabled={tab.disabled}
                                                className={classnames({ active: activeTab === tab.id })}
                                                onClick={() => {
                                                    if (activeTab !== tab.id) {
                                                        setActiveTab(tab.id);
                                                    }
                                                }}>
                                                <i className={classnames(tab.icon, 'd-sm-none', 'd-block', 'mr-1')}></i>
                                                {tab.title}
                                            </NavLink>
                                        </NavItem>
                                    );
                                })}
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <SensorMap />
                                </TabPane>
                                <TabPane tabId="2">
                                    <WareHouseConfig />
                                </TabPane>
                                <TabPane tabId="3">Notification</TabPane>
                                <TabPane tabId="4">
                                    <Management />
                                </TabPane>
                                <TabPane tabId="5">
                                    <ApiService />
                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}
