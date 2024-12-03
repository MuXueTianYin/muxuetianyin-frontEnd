
import {
  createUsingPOST1,
  deleteTagUsingDELETE,
  getAllTagByPageUsingGET,
  updateTagUsingPUT,
} from '@/services/muxeu-backend/tags';
import { eventBus } from '@/utils/EventBus';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import CreateModal from "@/pages/Admin/tag/components/CreateModal";

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
// const handleUpdate = async (fields: FormValueType) => {
//   const hide = message.loading('Configuring');
//   try {
//     await updateRule({
//       name: fields.name,
//       desc: fields.desc,
//       key: fields.key,
//     });
//     hide();
//     message.success('Configuration is successful');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Configuration failed, please try again!');
//     return false;
//   }
// };

const columns: ProColumns<API.InterfaceInfo>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    search: false,
    editable: false,
    hideInForm: true,
  },
  {
    title: '标签名称',
    dataIndex: 'tagName',
    copyable: true,
    ellipsis: true,
    sorter: true,
    search: {
      transform: (value: any) => ({ tagName: value }),
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入标签名称',
        },
      ],
    },
  },
  {
    title: '用户id',
    dataIndex: 'userId',
    sorter: true,
    search: {
      transform: (value: any) => ({ userId: value }),
    },
    editable: false,
    hideInForm: true,
  },
  {
    title: '父标签id',
    dataIndex: 'parentId',
    sorter: true,
    search: false,
    editable: false,
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
    hideInForm: true,
    search: false,
    editable: false,
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
      // Add more actions here
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [pageSize, setPageSize] = useState(5);
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
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
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
  const handleAdd = async (fields: API.TagAddRequest | undefined) => {
    const hide = message.loading('正在添加');
    try {
      console.log(fields, 'fields');
      let res = await createUsingPOST1({
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
  return (
    <PageContainer>
      <ProTable<API.InterfaceInfo>
        headerTitle={'标签表格'}
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
          const response = await getAllTagByPageUsingGET({
            ...params,
            sortField,
            sortOrder,
          });
          // 假设后端返回的数据格式如下
          if (response.data) {
            setPageSize(response.data.size || 0);
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
        // request={getAllTagByPageUsingGET}
        editable={{
          type: 'multiple',
          onDelete: async (key, record) => {
            if (record.id) await deleteTagUsingDELETE({ tagId: record.id, Authorization: '' });
          },
          onSave: async (key, record) => {
            // 这里调用更新数据的API
            console.log(record, 'record');
            const res = await updateTagUsingPUT(record);
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
      />
      <CreateModal
        columns={columns}
        onCancel={() => {
          handleModalOpen(false);
        }}
        onSubmit={(values) => handleAdd(values)}
        visible={createModalOpen}
      ></CreateModal>
    </PageContainer>
  );
};
