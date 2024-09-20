import UpdateModal from '@/pages/Admin/UserManage/components/UpdateModal';
import {
  listInterfaceInfoByPageUsingPOST1,
  logicalDeleteUserUsingPOST1,
  updateUserUsingPUT,
} from '@/services/muxeu-backend/user';

import { handleAvatarUploadUsingPOST } from '@/services/muxeu-backend/photoAlbum';
import { updateUserTagUsingPOST } from '@/services/muxeu-backend/userTag';
import { handlerDelete } from '@/services/muxue-service/api';
import { eventBus } from '@/utils/EventBus';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { Image, message, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import './css/UserManage.less';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export async function deleteUser(id: number) {
  try {
    const response = await handlerDelete(id);
    if (response.code === 0) {
      message.success('用户删除成功');
    } else {
      message.error('删除失败');
    }
  } catch (error) {
    console.error('Error occurred while deleting user:', error);
    message.error('Error occurred while deleting user');
  }
}

export default () => {
  const actionRef = useRef<ActionType>();
  const [pageSize, setPageSize] = useState(5);
  const [currentRow, setCurrentRow] = useState<API.Current>();
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
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

  const columns: ProColumns<API.Current>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 48,
      sorter: true,
      search: false,
      // editable: false,
      // disable: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      copyable: true,
      ellipsis: true,
      tip: '用户名过长会自动收缩',
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      copyable: true,
      tip: '账号过长会自动收缩',
      editable: false,
      hideInForm: true,
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      editable: false,
      render: (_, list) => (
        <div>
          <Image src={list.avatarUrl} width={80} />
        </div>
      ),
      sorter: true,
      search: false,
      hideInForm: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'select',
      valueEnum: {
        0: { text: '女', status: 'Default' },
        1: { text: '男', status: 'Processing' },
        null: { text: '未知' },
      },
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
      title: '状态',
      dataIndex: 'userStatus',
      sorter: true,
      disable: true,
      valueEnum: {
        0: { text: '正常', status: 'Success' },
        1: {
          text: '停用',
          status: 'Default',
        },
        2: {
          text: '封号',
          status: 'Error',
        },
      },
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      valueType: 'select',
      valueEnum: {
        0: { text: '普通用户', status: 'Default' },
        1: {
          text: '管理员',
          status: 'Success',
        },
        2: {
          text: '超级管理员',
          status: 'Success',
          disabled: true,
        },
      },
    },
    {
      title: '标签',
      dataIndex: 'tags',
      hideInForm: true,
      editable: false,
      render: (_, record) => (
        <div className="tagsContainer">
          {record.tags?.length
            ? record.tags.map((tag, index) => (
                <Tag color="blue" key={index}>
                  {tag.tagName}
                </Tag>
              ))
            : '-'}
        </div>
      ),
    },
    {
      title: '个签',
      dataIndex: 'signature',
      sorter: true,
      search: false,
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      // valueType: 'dateRange',
      sorter: true,
      search: false,
      hideInForm: true,
      editable: false,
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
      key: 'option',
      render: (text, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
  /**
   * @en-US Update node
   * @zh-CN 更新节点
   * @param fields
   */
  const handleUpdate = async (
    fields: API.CurrentPageParams | undefined,
    FieldsValue: API.CurrentPageParams | undefined,
  ) => {
    const hide = message.loading('Configuring');
    let submitData = {
      ...FieldsValue,
      ...fields,
    };
    let params: API.handleAvatarUploadUsingPOSTParams = {
      name: submitData.userAccount || '',
    };
    // return
    if (submitData.file) {
      const res1 = await handleAvatarUploadUsingPOST(params, { file: submitData.file });
      submitData.avatarUrl = String(res1.data);
    }
    try {
      // @ts-ignore
      const res = await updateUserUsingPUT(submitData);
      const params2 = {
        tagNames: submitData.tags,
        userId: submitData.id,
      };
      // @ts-ignore
      const res2 = await updateUserTagUsingPOST(params2);
      if (res.code === 0 && res2.code === 0) {
        message.success('修改成功');
        handleUpdateModalOpen(false);
        actionRef.current?.reload();
        return true;
      }
      hide();
      return false;
    } catch (error) {
      console.log(error, 'error');
      hide();
      return false;
    }
    return false;
  };
  return (
    <PageContainer>
      <ProTable<API.Current>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sorter, filter) => {
          console.log(filter);
          // 将ProTable的sorter对象转换为后端接受的格式
          let sortField, sortOrder;
          if (sorter && Object.keys(sorter).length) {
            sortField = Object.keys(sorter)[0];
            console.log(sorter[sortField], sorter, sortField);
            sortOrder = sorter[sortField] || '';
          }
          const response = await listInterfaceInfoByPageUsingPOST1({
            ...params,
            sortField,
            sortOrder,
          });
          // 假设后端返回的数据格式如下
          if (response.data) {
            // @ts-ignore
            let data: API.Current[] = response.data.records.map((item) => {
              const userRole = String(item.userRole);
              const userStatus = String(item.userStatus);
              const gender = String(item.gender);
              return {
                ...item,
                userRole,
                userStatus,
                gender,
              };
            });
            console.log(data, response.data.records, '999999999999');
            setPageSize(response.data.size || 5);
            return {
              data,
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
            await logicalDeleteUserUsingPOST1([record.id]);
          },
          onSave: async (key, record) => {
            // 这里调用更新数据的API
            console.log(record, 'record');
            // @ts-ignore
            const res = await updateUserUsingPUT(record);
            if (res.code === 0) message.success('修改成功');
          },
          onCancel: async (key, record) => {
            // 取消编辑的逻辑
            console.log('Cancelled edit:', key, record);
          },
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="用户管理中心"
      ></ProTable>
      <UpdateModal
        columns={columns}
        onCancel={() => handleUpdateModalOpen(false)}
        onSubmit={(
          values: API.CurrentPageParams | undefined,
          FieldsValue: API.CurrentPageParams | undefined,
        ) => handleUpdate(values, FieldsValue)}
        visible={updateModalOpen}
        values={currentRow}
      ></UpdateModal>
    </PageContainer>
  );
};
