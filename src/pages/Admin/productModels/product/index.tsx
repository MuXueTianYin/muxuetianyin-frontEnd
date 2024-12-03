
import { pageUsingGET1, saveUsingPOST2, updateUsingPUT1 } from '@/services/muxeu-backend/product';
import { deleteTagUsingDELETE } from '@/services/muxeu-backend/tags';
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
    title: '商品名称',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    sorter: true,
    search: {
      transform: (value: any) => ({ name: value }),
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入商品名称',
        },
      ],
    },
  },
  {
    title: '商品描述',
    dataIndex: 'description',
    copyable: true,
    ellipsis: true,
    sorter: true,
    search: {
      transform: (value: any) => ({ description: value }),
    },
  },
  {
    title: '商品分类id',
    dataIndex: 'productCategoryId',
    sorter: true,
    search: {
      transform: (value: any) => ({ productCategoryId: value }),
    },
    editable: false,
    hideInForm: true,
  },
  {
    title: '商品图片',
    dataIndex: 'image',
    sorter: true,
    search: {
      transform: (value: any) => ({ image: value }),
    },
    editable: false,
    hideInForm: true,
  },
  {
    title: '商品码',
    dataIndex: 'code',
    sorter: true,
    search: false,
    editable: false,
    hideInForm: true,
  },
  {
    title: '创建人',
    dataIndex: 'createUserName',
    sorter: true,
    search: false,
    hideInForm: true,
    editable: false,
  },
  {
    title: '修改人',
    dataIndex: 'updateUserName',
    sorter: true,
    search: false,
    hideInForm: true,
    editable: false,
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
  const handleAdd = async ({ fields }: { fields: API.ProductAddRequest | undefined }) => {
    const hide = message.loading('正在添加');
    try {
      console.log(fields, 'fields');
      let res = await saveUsingPOST2({
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

          const response: API.BaseResponsePageProductDto_ = await pageUsingGET1({
            ...params,
            sortField,
            sortOrder,
          });
          if (response.data && response.code === 0) {
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
        // request={pageUsingGET1}
        editable={{
          type: 'multiple',
          onDelete: async (key, record) => {
            if (record.id) await deleteTagUsingDELETE({ tagId: record.id, Authorization: '' });
          },
          onSave: async (key, record) => {
            // 这里调用更新数据的API
            console.log(record, 'record');
            const res = await updateUsingPUT1(record);
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
        onSubmit={(values) => handleAdd({ fields: values })}
        visible={createModalOpen}
      ></CreateModal>
    </PageContainer>
  );
};
