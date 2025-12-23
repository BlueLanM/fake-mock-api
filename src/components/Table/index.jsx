import { useRef, useState } from 'react';
import Loading from '../Loading';
import './index.css';

const Table = ({ columns, dataSource, rowKey = 'key', loading = false }) => {
	const scrollRef = useRef(null);
	const [showShadow, setShowShadow] = useState(false);

	const leftFixedColumns = columns.filter(col => col.fixed === 'left');
	const rightFixedColumns = columns.filter(col => col.fixed === 'right');
	const normalColumns = columns.filter(col => !col.fixed);

	const handleScroll = (e) => {
		setShowShadow(e.target.scrollLeft > 0);
	};

	// 渲染表格部分
	const renderTableSection = (cols) => (
		<div className="table-wrapper">
			<table>
				<thead>
					<tr>
						{cols.map(col => (
							<th key={col.dataIndex} style={{ width: col.width }}>
								{col.title}
							</th>
						))}
					</tr>
				</thead>
			</table>
			<div className="tbody-wrapper">
				<table>
					<colgroup>
						{cols.map(col => (
							<col key={col.dataIndex} style={{ width: col.width }} />
						))}
					</colgroup>
					<tbody>
						{dataSource.map((record, index) => (
							<tr key={record[rowKey]}>
								{cols.map(col => (
									<td key={col.dataIndex}>
										{col.render
											? col.render(record[col.dataIndex], record, index)
											: record[col.dataIndex]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
				{loading && (
					<div className="table-loading-overlay">
						<Loading spinning={true} type="ring" tip="加载中..." />
					</div>
				)}
			</div>
		</div>
	);

	return (
		<div className="custom-table">
			{leftFixedColumns.length > 0 && (
				<div className={`fixed-left ${showShadow ? 'shadow' : ''}`}>
					{renderTableSection(leftFixedColumns)}
				</div>
			)}

			<div className="scroll-container" ref={scrollRef} onScroll={handleScroll}>
				{renderTableSection(normalColumns)}
			</div>

			{rightFixedColumns.length > 0 && (
				<div className="fixed-right">
					{renderTableSection(rightFixedColumns)}
				</div>
			)}
		</div>
	);
};

export default Table;