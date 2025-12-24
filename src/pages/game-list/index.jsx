import { useState } from 'react';
import { useApi } from "../../hooks/useApi";
import { useForm } from "../../hooks/useForm";
import { gamesApi } from "../../api/mockapi";
import Table from "../../components/Table";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Popconfirm from "../../components/Popconfirm";
import message from "../../components/Message";

import "./index.css";

const GameApp = () => {
	const [visible, setVisible] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);
	const [modalMode, setModalMode] = useState('add'); // 'add' | 'detail' | 'edit'
	const [currentId, setCurrentId] = useState(null); // 当前编辑的游戏ID
	const [searchQuery, setSearchQuery] = useState(''); // 搜索关键词
	
	const { values, handleChange, reset, setValues } = useForm({
		title: '',
		views: ''
	});
	
	// 根据搜索关键词决定调用哪个API
	const { data, loading } = useApi(
		() => searchQuery ? gamesApi.search(searchQuery) : gamesApi.getAll(),
		{
			deps: [refreshKey, searchQuery] // 依赖 refreshKey 和 searchQuery 来触发重新获取数据
		}
	);

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
					<Button type="default" onClick={() => detailGame(record.id)}>详情</Button>
					<Button type="primary" onClick={() => editGame(record.id)}>编辑</Button>
					<Popconfirm
						title="确定要删除这个游戏吗？"
						description="删除后将无法恢复"
						onConfirm={() => removeGame(record.id)}
						placement="top"
					>
						<Button type="primary" danger>删除</Button>
					</Popconfirm>
				</div>
			)
		}
	];

	const handleSubmit = async () => {
		if (!values.title || !values.views) {
			message.warning('请填写完整信息');
			return;
		}
		
		setIsAdding(true);
		
		try {
			if (modalMode === 'edit') {
				// 编辑模式：更新数据
				await gamesApi.update(currentId, values);
				message.success('更新成功！');
			} else {
				// 添加模式：创建新数据
				await gamesApi.create(values);
				message.success('添加成功！');
			}
			
			setIsAdding(false);
			setVisible(false);
			reset();
			setRefreshKey(prev => prev + 1);
		} catch (error) {
			setIsAdding(false);
			message.error(modalMode === 'edit' ? '更新游戏失败' : '添加游戏失败');
		}
	};

	const detailGame = async (id) => {
		try {
			const result = await gamesApi.getById(id);
			// 回显数据到表单
			setValues({
				title: result.title,
				views: result.views
			});
			setCurrentId(id);
			setModalMode('detail');
			setVisible(true);
		} catch (error) {
			message.error('获取游戏详情失败');
		}
	}

	const editGame = async (id) => {
		try {
			const result = await gamesApi.getById(id);
			// 回显数据到表单
			setValues({
				title: result.title,
				views: result.views
			});
			setCurrentId(id);
			setModalMode('edit');
			setVisible(true);
		} catch (error) {
			message.error('获取游戏详情失败');
		}
	}

	const removeGame = async (id) => {
		try {
			await gamesApi.delete(id);
			// 显示成功消息
			message.success('删除成功！');
			
			// 延迟刷新数据
			setRefreshKey(prev => prev + 1);

		} catch (error) {
			message.error('删除游戏失败');
		}
	}
	
	const close = () => {
		setVisible(false);
		reset();
		setModalMode('add');
		setCurrentId(null);
	};

	const handleSearch = (value) => {
		setSearchQuery(value);
	};

	const handleClearSearch = () => {
		setSearchQuery('');
	};

	return (
		<div className="game-container">
			<h2 className="game-title">后端API模拟</h2>
			<div className="game-header">
				<div className="game-header-left">
					<Button type="primary" onClick={() => setVisible(true)}>添加</Button>
				</div>
				<div className="game-header-right">
					<Input
						placeholder="搜索游戏名称..."
						width={300}
						allowClear
						value={searchQuery}
						onChange={(e) => handleSearch(e.target.value)}
						onClear={handleClearSearch}
					/>
				</div>
			</div>
			<Table 
				rowKey="id" 
				dataSource={data} 
				columns={gameColumns} 
				loading={loading} 
				scrollY={650}
			/>
			<Modal
				title={modalMode === 'detail' ? "游戏详情" : modalMode === 'edit' ? "编辑游戏" : "添加游戏"}
				visible={visible}
				onOk={modalMode === 'detail' ? close : handleSubmit}
				onCancel={() => close()}
				confirmLoading={isAdding}
				okText={modalMode === 'detail' ? "关闭" : "确定"}
				cancelButtonVisible={modalMode !== 'detail'}
			>
				<div className="game-modal-content">
					<div className="game-flex">
						名称：<Input 
								placeholder="请输入内容" 
								width={420}
								value={values.title}
								onChange={(e) => handleChange('title', e.target.value)}
								disabled={modalMode === 'detail'}
							/>
					</div>
					<div className="game-flex">
						热度：<Input 
								placeholder="请输入内容" 
								width={420}
								value={values.views}
								onChange={(e) => handleChange('views', Number(e.target.value))}
								disabled={modalMode === 'detail'}
							/>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default GameApp;