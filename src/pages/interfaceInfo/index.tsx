import CreateModal from '@/pages/interfaceInfo/components/CreateModal';
import {
  createUsingPOST,
  deleteUsingDELETE,
  listInterfaceInfoByPageUsingPOST,
  updateInterfaceInfoUsingPOST,
} from '@/services/muxeu-backend/interfaceInfo';
import { eventBus } from '@/utils/EventBus';
import { PlusOutlined } from '@ant-design/icons';
import { TableDropdown } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { useEffect, useRef, useState } from 'react';

const columns: ProColumns<API.InterfaceInfo>[] = [
  {
    title: '用户ID',
    dataIndex: 'userId',
    sorter: true,
    search: false,
    hideInForm: true,
    editable: false,
  },
  {
    title: '接口名称',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    tip: '姓名过长会自动收缩',
    sorter: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入接口名称',
        },
      ],
    },
    search: {
      transform: (value: any) => ({ name: value }),
    },
  },
  {
    title: '描述',
    dataIndex: 'description',
    copyable: true,
    ellipsis: true,
    tip: 'ID过长会自动收缩',
    sorter: true,
    search: false,
  },
  {
    title: '接口类型',
    dataIndex: 'method',
    sorter: true,
    search: false,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入接口类型',
        },
      ],
    },
  },
  {
    title: 'url',
    dataIndex: 'url',
    sorter: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入url',
        },
      ],
    },
  },
  {
    title: '请求头',
    dataIndex: 'requestHeader',
    sorter: true,
    search: false,
  },
  {
    title: '请求参数',
    dataIndex: 'requestParams',
    sorter: true,
    search: false,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入请求参数',
        },
      ],
    },
  },
  {
    title: '响应头',
    dataIndex: 'responseHeader',
    sorter: true,
    search: false,
  },

  {
    title: '是否启用',
    dataIndex: 'status',
    sorter: true,
    valueEnum: {
      '0': { text: '是', status: 'Processing' },
      '1': { text: '否', status: 'Default' },
    },
    hideInForm: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
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
          // @ts-ignore
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={async (key) => {
          if (key === 'delete') {
            action?.reload();
          }
        }}
        menus={[
          { key: 'copy', name: '复制' },
          // { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [pageSize, setPageSize] = useState(5);
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  // const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfo | undefined) => {
    const hide = message.loading('正在添加');
    try {
      console.log(fields, 'fields');
      let res = await createUsingPOST({
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
  return (
    <PageContainer>
      <ProTable<API.InterfaceInfo>
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
          const response = await listInterfaceInfoByPageUsingPOST({
            ...params,
            sortField,
            sortOrder,
          });
          // 假设后端返回的数据格式如下
          if (response.data) {
            // @ts-ignore
            setPageSize(response.data.size);
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
            if (record.id) await deleteUsingDELETE({ id: record.id, Authorization: '' });
          },
          onSave: async (key, record) => {
            // 这里调用更新数据的API
            console.log(record, 'record');
            const res = await updateInterfaceInfoUsingPOST(record);
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
        headerTitle="接口信息管理"
      />
      <CreateModal
        columns={columns}
        onCancel={() => handleModalOpen(false)}
        onSubmit={(values) => handleAdd(values)}
        visible={createModalOpen}
      ></CreateModal>
    </PageContainer>
  );
};
