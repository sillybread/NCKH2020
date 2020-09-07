// @flow
import React from 'react';
import { Row, Col, Card, CardBody, Progress, UncontrolledTooltip, Button } from 'reactstrap';
import classNames from 'classnames';
import { Loader } from 'react-feather';

import avatar1 from '../../assets/images/users/avatar-6.jpg';
import avatar3 from '../../assets/images/users/avatar-8.jpg';

// single project
const Warehouse = (props) => {
    const warehouse = props.warehouse || {};

    return (
        <Card>
            <CardBody>
                <div
                    className={classNames('badge', 'float-right', {
                        'badge-success': warehouse.state === 'Finished',
                        'badge-warning': warehouse.state === 'Ongoing',
                        'badge-info': warehouse.state === 'Planned',
                    })}>
                    {warehouse.state}
                </div>
                <p
                    className={classNames('text-uppercase', 'font-size-12', 'mb-2', {
                        'text-success': warehouse.state === 'Finished',
                        'text-warning': warehouse.state === 'Ongoing',
                        'text-info': warehouse.state === 'Planned',
                    })}>
                    {warehouse.category}
                </p>

                <h5>
                    <a href="/" className="text-dark">
                        {warehouse.title}
                    </a>
                </h5>

                <p className="text-muted mb-4">
                    {warehouse.shortDesc}...
                    <a href="/" className="font-weight-bold text-muted ml-2">
                        view more
                    </a>
                </p>

                <div>
                    <a href="/" className="d-inline-block mr-1">
                        <img src={avatar3} className="avatar-sm m-1 rounded-circle" alt="friend" />
                    </a>

                    <a href="/" className="d-inline-block mr-1">
                        <img src={avatar1} className="avatar-sm m-1 rounded-circle" alt="friend" />
                    </a>
                    {warehouse.totalMembers - 2 > 0 && (
                        <a href="/" className="">
                            <div className="avatar-sm font-weight-bold d-inline-block m-1">
                                <span className="avatar-title rounded-circle bg-soft-warning text-warning">
                                    +{warehouse.totalMembers - 2}
                                </span>
                            </div>
                        </a>
                    )}
                </div>
            </CardBody>

            <CardBody className="border-top">
                <Row className="align-items-center">
                    <Col className="col-sm-auto">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item pr-2">
                                <a href="/" className="text-muted d-inline-block" id={`dueDate-${warehouse.id}`}>
                                    <i className="uil uil-calender mr-1"></i> {warehouse.dueDate}
                                </a>
                                <UncontrolledTooltip placement="top" target={`dueDate-${warehouse.id}`}>
                                    Due date
                                </UncontrolledTooltip>
                            </li>
                            <li className="list-inline-item pr-2">
                                <a href="/" className="text-muted d-inline-block" id={`noTasks-${warehouse.id}`}>
                                    <i className="uil uil-bars mr-1"></i> {warehouse.totalTasks}
                                </a>
                                <UncontrolledTooltip placement="top" target={`noTasks-${warehouse.id}`}>
                                    Tasks
                                </UncontrolledTooltip>
                            </li>
                            <li className="list-inline-item">
                                <a href="/" className="text-muted d-inline-block" id={`noComments-${warehouse.id}`}>
                                    <i className="uil uil-comments-alt mr-1"></i> {warehouse.totalComments}
                                </a>
                                <UncontrolledTooltip placement="top" target={`noComments-${warehouse.id}`}>
                                    Comments
                                </UncontrolledTooltip>
                            </li>
                        </ul>
                    </Col>
                    <Col className="offset-sm-1">
                        {warehouse.progress < 30 && (
                            <Progress value={warehouse.progress} color="warning" className="progress-sm" />
                        )}
                        {warehouse.progress > 30 && warehouse.progress < 100 && (
                            <Progress value={warehouse.progress} color="info" className="progress-sm" />
                        )}
                        {warehouse.progress === 100 && (
                            <Progress value={warehouse.progress} color="success" className="progress-sm" />
                        )}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

const Warehouses = () => {
    const warehouses = [
        {
            id: 1,
            title: 'Ubold v3.0 - Redesign',
            state: 'Finished',
            shortDesc: 'With supporting text below as a natural lead-in to additional contenposuere erat a ante',
            totalTasks: 21,
            totalComments: 741,
            totalMembers: 10,
            progress: 100,
            category: 'Web Design',
            dueDate: '15 Dec',
        },
        {
            id: 2,
            title: 'Minton v3.0 - Redesign',
            state: 'Ongoing',
            shortDesc:
                'This card has supporting text below as a natural lead-in to additional content is a little bit longer',
            totalTasks: 81,
            totalComments: 103,
            totalMembers: 6,
            progress: 21,
            category: 'Web Design',
            dueDate: '15 Dec',
        },
        {
            id: 3,
            title: 'Hyper v2.1 - Angular and Django',
            state: 'Ongoing',
            shortDesc: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid',
            totalTasks: 12,
            totalComments: 48,
            totalMembers: 2,
            progress: 66,
            category: 'Web Design',
            dueDate: '20 Dec',
        },
    ];

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={3} xl={6}>
                    <h4 className="mb-1 mt-0">Projects</h4>
                </Col>
                <Col md={9} xl={6} className="text-md-right">
                    <div className="mt-4 mt-md-0">
                        <button type="button" className="btn btn-danger mr-4 mb-3  mb-sm-0">
                            <i className="uil-plus mr-1"></i> Create Project
                        </button>
                        <div className="btn-group mb-3 mb-sm-0">
                            <button type="button" className="btn btn-primary">
                                All
                            </button>
                        </div>
                        <div className="btn-group ml-1">
                            <button type="button" className="btn btn-white">
                                Ongoing
                            </button>
                            <button type="button" className="btn btn-white">
                                Finished
                            </button>
                        </div>
                        <div className="btn-group ml-2 d-none d-sm-inline-block">
                            <button type="button" className="btn btn-primary btn-sm">
                                <i className="uil uil-apps"></i>
                            </button>
                        </div>
                        <div className="btn-group d-none d-sm-inline-block ml-1">
                            <button type="button" className="btn btn-white btn-sm">
                                <i className="uil uil-align-left-justify"></i>
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row>
                {warehouses.map((warehouse, i) => {
                    return (
                        <Col lg={6} xl={4} key={'proj-' + warehouse.id}>
                            <Warehouse warehouse={warehouse} />
                        </Col>
                    );
                })}
            </Row>

            <Row className="mb-3 mt-2">
                <Col>
                    <div className="text-center">
                        <Button color="white">
                            <Loader className="icon-dual icon-xs mr-2"></Loader>Load more
                        </Button>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Warehouses;
