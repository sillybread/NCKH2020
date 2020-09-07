import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import StatusChart from './StatusChart';
import SChart3D from './SChart';
import { ToneMapping } from 'three';

class TabsChart extends Component {
    constructor(props) {
        super(props);
        this.state = { activeTab: 1 };
        this.toggle = this.toggle.bind(this);
    }

    /**
     * Toggle the tab
     */
    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    };
    changeView = (active) => {
        if (active === 1) return <StatusChart />;
        if (active === 3)
            return (
                <div>
                    <SChart3D
                        X="10"
                        Y="10"
                        Z="10"
                        src="http://localhost:8080/api/sensor/demoTemperature"
                        ref={(me) => {
                            me &&
                                me.setState({
                                    sSliceAxis: 'z',
                                    iSliceLevel: 0,
                                    bg_color: 0xffffff,
                                });
                        }}
                    />
                </div>
            );
    };
    render() {
        const tabContents = [
            {
                id: 1,
                title: 'Line',
                disabled: false,
            },
            {
                id: 2,
                title: '2D',
                disabled: true,
            },
            {
                id: 3,
                title: '3D',
                disabled: false,
            },
        ];

        return (
            <>
                <Nav className="nav nav-pills navtab-bg nav-justified">
                    {tabContents.map((tab, index) => {
                        return (
                            <NavItem key={index}>
                                <NavLink
                                    href="#"
                                    disabled={tab.disabled}
                                    className={classnames({ active: this.state.activeTab === tab.id })}
                                    onClick={() => {
                                        this.toggle(tab.id);
                                    }}>
                                    <i className={classnames(tab.icon, 'd-sm-none', 'd-block', 'mr-1')}></i>
                                    <span className="d-none d-sm-block">{tab.title}</span>
                                </NavLink>
                            </NavItem>
                        );
                    })}
                </Nav>

                <Row>
                    <Col className="mr-3 mt-4">{this.changeView(this.state.activeTab)}</Col>
                </Row>
            </>
        );
    }
}

export default TabsChart;
