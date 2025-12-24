import { useState } from 'react';
import { useApi } from "../../hooks/useApi";
import { useForm } from "../../hooks/useForm";
import { gamesApi } from "../../api/mockapi";
import Table from "../../components/Table";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Input from "../../components/Input";

import "./index.css";

const GameApp = () => {
	const [visible, setVisible] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);
	
	const { values, handleChange, reset } = useForm({
		title: '',
		views: ''
	});
	
	const { data, loading } = useApi(() => gamesApi.getAll(), {
		deps: [refreshKey]
	});

	const gameColumns = [
		{
			title: "ID",
			dataIndex: "id",
		},
		{
			title: "名称",
			dataIndex: "title",
		},
		{
			title: "热度",
			dataIndex: "views",
		},
		{
			title: "操作",
			dataIndex: "action",
			render: (text, record) => (
				<div className="game-action">
					<Button type="primary">详情</Button>
					<Button type="primary" danger>删除</Button>
				</div>
			)
		}
	];

	const addGame = async () => {
		if (!values.title || !values.views) {
			alert('请填写完整信息');
			return;
		}
		
		try {
			setIsAdding(true);
			await gamesApi.create(values);
			setVisible(false);
			reset();
			// 通过改变 key 来触发重新获取数据
			setRefreshKey(prev => prev + 1);
		} catch (error) {
			console.error('添加游戏失败:', error);
			alert('添加游戏失败: ' + (error.message || '未知错误'));
		} finally {
			setIsAdding(false);
		}
	};
	
	const close = () => {
		setVisible(false);
		reset();
	};

	return (
		<div className="game-container">
			<div className="game-header">
				<Button type="primary" onClick={() => setVisible(true)}>添加</Button>
				<Table 
					rowKey="id" 
					dataSource={data} 
					columns={gameColumns} 
					loading={loading} 
					scrollY={650}
				/>
			</div>
			<Modal
				title="添加游戏"
				visible={visible}
				onOk={addGame}
				onCancel={close}
				confirmLoading={isAdding}
			>	
				<div className="game-modal-content">
					<div className="game-flex">
						名称：<Input 
								placeholder="请输入内容" 
								width={420}
								value={values.title}
								onChange={(e) => handleChange('title', e.target.value)}
							/>
					</div>
					<div className="game-flex">
						热度：<Input 
								placeholder="请输入内容" 
								width={420}
								value={values.views}
								onChange={(e) => handleChange('views', Number(e.target.value))} 
							/>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default GameApp;