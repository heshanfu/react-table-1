import 'trendmicro-ui/dist/css/trendmicro-ui.css';
import Anchor from '@trendmicro/react-anchor';
import React, { Component } from 'react';
import Table from '../../src';
import Section from '../Section';
import styles from '../index.styl';

const bigData = [];
for (let i = 1; i < 601; i++) {
    bigData.push({
        id: i,
        app: `chrome_${i}`,
        vendor: `google_${i}`
    });
}

export default class extends Component {
    state = {
        expandedRowKeys: []
    };

    actions = {
        handleExpandedRowRender: (record, key) => {
            return (
                <div style={{ padding: '16px' }}>
                    Sub content
                    <Table
                        justified
                        bordered={false}
                        hoverable={false}
                        maxHeight={150}
                        useFixedHeader={true}
                        rowKey="id"
                        columns={this.columns1}
                        data={bigData}
                    />
                </div>
            );
        },
        handleToggleDetails: (record) => (e) => {
            e.preventDefault();
            e.stopPropagation();

            this.setState(state => {
                const rowIndex = state.expandedRowKeys.indexOf(record.id);
                const expanded = (rowIndex >= 0);
                let data = [];
                // Only display one detail view at one time
                if (expanded) {
                    data = [];
                } else {
                    data = [record.id];
                }

                return {
                    expandedRowKeys: data
                };
            });
        },
        handleRenderActionColumn: (text, record) => {
            const expandedRowKeys = this.state.expandedRowKeys;
            const expanded = (expandedRowKeys.indexOf(record.id) >= 0);
            let className = styles.expandIcon;
            if (expanded) {
                className += ' ' + styles.rowExpanded;
            } else {
                className += ' ' + styles.rowCollapsed;
            }
            return (
                <Anchor
                    onClick={this.actions.handleToggleDetails(record)}
                >
                    <i className={className} />
                </Anchor>
            );
        }
    };

    columns = [
        { title: '', dataIndex: 'detail', render: this.actions.handleRenderActionColumn, width: 40 },
        { title: 'Event Type', dataIndex: 'eventType' },
        { title: 'Affected Devices', dataIndex: 'affectedDevices' },
        { title: 'Detections', dataIndex: 'detections', width: 300 }
    ];
    columns1 = [
        { title: 'Application Name', dataIndex: 'app' },
        { title: 'Vendor Name', dataIndex: 'vendor' }
    ];
    data = [
        { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
        { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
        { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
        { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
        { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
        { id: 6, eventType: 'Application Control', affectedDevices: 30, detections: 111 },
        { id: 7, eventType: 'Predictive Machine Learning', affectedDevices: 40, detections: 0 },
        { id: 8, eventType: 'Behavior Monitoring', affectedDevices: 22, detections: 333 },
        { id: 9, eventType: 'Device Ontrol', affectedDevices: 9, detections: 555 },
        { id: 10, eventType: 'Ransomware Summary', affectedDevices: 0, detections: 66 },
        { id: 11, eventType: 'Agent Status', affectedDevices: 2, detections: 789 },
        { id: 12, eventType: 'Security Risk Detections Over Time', affectedDevices: 66, detections: 34 },
        { id: 13, eventType: 'Action Center', affectedDevices: 32, detections: 2234 },
        { id: 14, eventType: 'License Status', affectedDevices: 8, detections: 34325 },
        { id: 15, eventType: 'Component Status', affectedDevices: 12, detections: 46465 },
        { id: 16, eventType: 'Outbreak Defense', affectedDevices: 12, detections: 123 },
        { id: 17, eventType: 'Test long long long long long long long long long long long long long long long content', affectedDevices: 11, detections: 345 },
        { id: 18, eventType: 'Computer Status', affectedDevices: 90, detections: 466 },
        { id: 19, eventType: 'Mobile Devices', affectedDevices: 100, detections: 234 },
        { id: 20, eventType: 'Desktops', affectedDevices: 102, detections: 477 },
        { id: 21, eventType: 'Servers', affectedDevices: 33, detections: 235 }
    ];

    render() {
        const columns = this.columns;
        const data = this.data;

        return (
            <div className="col-md-12">
                <Section className="row-md-6">
                    <h3>Expanded Row</h3>
                    <div className={styles.sectionGroup}>
                        <Table
                            hoverable
                            justified={false}
                            maxHeight={320}
                            rowKey="id"
                            columns={columns}
                            data={data}
                            expandedRowRender={this.actions.handleExpandedRowRender}
                            expandedRowKeys={this.state.expandedRowKeys}
                            useFixedHeader={true}
                        />
                    </div>
                </Section>
            </div>
        );
    }
}
