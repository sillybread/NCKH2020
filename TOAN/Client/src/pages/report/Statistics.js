// @flow
import React from 'react';
import { Row, Col } from 'reactstrap';
import * as FeatherIcon from 'react-feather';
import StatisticsWidget from '../../components/StatisticsWidget';

const Statistics = () => {
    return (
        <React.Fragment>
            <Row>
                <Col md={6} xl={3}>
                    <StatisticsWidget
                        description="Tổng số cảm biến"
                        title="18"
                        icon={FeatherIcon.Cpu}
                        iconClass="icon-dual-primary"></StatisticsWidget>
                </Col>
                <Col md={6} xl={3}>
                    <StatisticsWidget
                        description="Người quản lý"
                        title="4"
                        icon={FeatherIcon.Users}
                        iconClass="icon-dual-warning"></StatisticsWidget>
                </Col>
                <Col md={6} xl={3}>
                    <StatisticsWidget
                        description="Khu vực"
                        title="2"
                        icon={FeatherIcon.Grid}
                        iconClass="icon-dual-success"></StatisticsWidget>
                </Col>
                <Col md={6} xl={3}>
                    <StatisticsWidget
                        description="Cảnh báo"
                        title="7"
                        icon={FeatherIcon.Bell}
                        iconClass="icon-dual-info"></StatisticsWidget>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Statistics;
