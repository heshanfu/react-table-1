import classNames from 'classnames';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './index.styl';
import TableCell from './TableCell';

class TableRow extends PureComponent {
    static propTypes = {
        columns: PropTypes.array,
        currentHoverKey: PropTypes.any,
        expandedRowKeys: PropTypes.array,
        expandedRowRender: PropTypes.func,
        hoverKey: PropTypes.any,
        index: PropTypes.number,
        onHover: PropTypes.func,
        onRowClick: PropTypes.func,
        record: PropTypes.object,
        rowClassName: PropTypes.func
    };

    static defaultProps = {
        expandedRowKeys: [],
        expandedRowRender: () => {},
        onHover: () => {},
        onRowClick: () => {},
        record: {},
        rowClassName: () => {
            return '';
        }
    };

    actions = {
        handleRowClick: (e) => {
            const { onRowClick, record, index } = this.props;
            onRowClick(record, index, e);
        },
        handleRowMouseLeave: () => {
            const { hoverKey, onHover } = this.props;
            onHover(false, hoverKey);
        },
        handleRowMouseOver: () => {
            const { hoverKey, onHover } = this.props;
            onHover(true, hoverKey);
        }
    };

    componentDidMount() {
        const { handleRowMouseOver, handleRowMouseLeave } = this.actions;
        this.row.addEventListener('mouseenter', handleRowMouseOver);
        this.row.addEventListener('mouseleave', handleRowMouseLeave);
    }

    componentWillUnmount() {
        const { handleRowMouseOver, handleRowMouseLeave } = this.actions;
        this.row.removeEventListener('mouseenter', handleRowMouseOver);
        this.row.removeEventListener('mouseleave', handleRowMouseLeave);
    }

    isRowExpanded (record, key) {
        const rows = this.props.expandedRowKeys.filter((i) => {
            return i === key;
        });
        return rows[0];
    }

    render() {
        const {
            columns,
            currentHoverKey,
            expandedRowRender,
            hoverKey,
            record,
            rowClassName
        } = this.props;
        const { handleRowClick } = this.actions;
        const className = rowClassName(record, hoverKey);
        const isRowExpanded = this.isRowExpanded(record, hoverKey);
        let expandedRowContent;
        if (expandedRowRender && isRowExpanded) {
            expandedRowContent = expandedRowRender(record, hoverKey);
        }
        return (
            <div
                className={classNames(
                    styles.tr,
                    className,
                    { [styles['tr-hover']]: (currentHoverKey === hoverKey) }
                )}
                ref={node => {
                    this.row = node;
                }}
                role="presentation"
                onClick={handleRowClick}
            >
                {
                    columns.map((column, i) => {
                        const index = i++;
                        return (
                            <TableCell
                                key={`${hoverKey}_${index}`}
                                column={column}
                                record={record}
                            />
                        );
                    })
                }
                { isRowExpanded &&
                    <section className={styles['tr-expand']}>
                        { expandedRowContent }
                    </section>
                }
            </div>
        );
    }
}

export default TableRow;
