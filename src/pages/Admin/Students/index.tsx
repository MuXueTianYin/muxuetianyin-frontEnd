import CreateModal from '@/pages/Admin/Students/components/CreateModal';
import {
  addStudentUsingPOST,
  deleteStudentUsingPOST,
  getAllStudentsByPageUsingPOST,
  updateStudentUsingPOST,
} from '@/services/muxeu-backend/students';
import { eventBus } from '@/utils/EventBus';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { useEffect, useRef, useState } from 'react';

export default () => {
  const actionRef = useRef<ActionType>();
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    const reloadTable = () => {
      actionRef.current?.reload();
    };
    eventBus.on('tokenRefreshed', reloadTable);
    // 组件卸载时取消订阅
    return () => {
      eventBus.off('tokenRefreshed', reloadTable);
    };
  }, []);
  const columns: ProColumns<API.students>[] = [
    {
      title: '学生姓名',
      dataIndex: 'studentName',
      copyable: true,
      ellipsis: true,
      tip: '姓名过长会自动收缩',
      sorter: true,
      search: {
        transform: (value: any) => ({ studentName: value }),
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入学生姓名',
          },
        ],
      },
    },
    {
      title: '学生ID',
      dataIndex: 'studentID',
      copyable: true,
      ellipsis: true,
      tip: 'ID过长会自动收缩',
      sorter: true,
      search: false,
    },
    {
      title: '班级',
      dataIndex: 'studentClass',
      sorter: true,
      search: false,
    },
    {
      title: '专业',
      dataIndex: 'profession',
      sorter: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueEnum: {
        0: { text: '女' },
        1: { text: '男' },
      },
    },
    {
      title: '用户ID',
      dataIndex: 'userID',
      sorter: true,
      search: false,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      sorter: true,
      search: false,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      sorter: true,
      search: false,
    },
    {
      title: '年级',
      dataIndex: 'studentGrade',
      sorter: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      // valueType: 'date',
      sorter: true,
      search: false,
      editable: false,
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
      editable: false,
      hideInForm: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            if (record.id) action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        // Add more actions here
      ],
    },
  ];
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const handleAdd = async (fields: API.students | undefined) => {
    const hide = message.loading('正在添加');
    try {
      console.log(fields, 'fields');
      let res = await addStudentUsingPOST({
        ...fields,
      });
      hide();
      if (res.code === 0) {
        message.success('创建成功');
        actionRef.current?.reload();
      }
      handleModalOpen(false);
      return true;
    } catch (error) {
      hide();
      return false;
    }
  };
  // @ts-ignore
  return (
    <PageContainer>
      <ProTable<API.students>
        columns={columns}
        actionRef={actionRef}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        /*解构赋值*/
        request={async (params, sorter) => {
          // 将ProTable的sorter对象转换为后端接受的格式
          let sortField, sortOrder;
          if (sorter && Object.keys(sorter).length) {
            sortField = Object.keys(sorter)[0];
            console.log(sorter[sortField], sorter, sortField);
            sortOrder = sorter[sortField] || '';
          }
          const response = await getAllStudentsByPageUsingPOST({
            ...params,
            sortField,
            sortOrder,
          });
          // 假设后端返回的数据格式如下
          if (response.data) {
            setPageSize(response.data.size || 10);
            return {
              data: response.data.records,
              total: response.data.total,
              success: true,
            };
          }
          return {
            data: [],
            total: 0,
            success: false,
          };
        }}
        editable={{
          type: 'multiple',
          onDelete: async (key, record) => {
            if (record.id) await deleteStudentUsingPOST(record.id);
          },
          onSave: async (key, record) => {
            // 这里调用更新数据的API
            console.log(record, 'record');
            const res = await updateStudentUsingPOST(record);
            if (res.code === 0) message.success('修改成功');
          },
          onCancel: async (key, record) => {
            // 取消编辑的逻辑
            console.log('Cancelled edit:', key, record);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
        }}
        dateFormatter="string"
        headerTitle="学生信息管理"
      ></ProTable>
      <CreateModal
        columns={columns}
        onCancel={() => handleModalOpen(false)}
        onSubmit={(values) => handleAdd(values)}
        visible={createModalOpen}
      ></CreateModal>
    </PageContainer>
  );
};
