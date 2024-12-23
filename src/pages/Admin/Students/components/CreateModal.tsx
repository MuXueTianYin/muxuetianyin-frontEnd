import { ProColumns, ProTable } from '@ant-design/pro-table';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';

export type Props = {
  columns: ProColumns<API.students>[];
  onCancel: () => void;
  onSubmit: (values: API.students) => Promise<boolean>;
  visible: boolean;
};
const CreateModal: React.FC<Props> = (props) => {
  const { columns, visible, onCancel, onSubmit } = props;
  return (
    <Modal visible={visible} onCancel={() => onCancel?.()} footer={null}>
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};
export default CreateModal;
