import { getAllTagByPageUsingGET } from '@/services/muxeu-backend/tags';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ProFormInstance } from '@ant-design/pro-form';
import { ProColumns, ProTable } from '@ant-design/pro-table';
import '@umijs/max';
import { Image, message, Modal, Select, SelectProps, Tag, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
type TagRender = SelectProps['tagRender'];

export type Props = {
  columns: ProColumns<API.Current>[];
  onCancel: () => void;
  onSubmit: (
    value: API.CurrentPageParams | undefined,
    FieldsValue: (API.fileParams & API.Current) | undefined,
  ) => Promise<boolean>;
  visible: boolean;
  values?: API.Current;
};
const CreateModal: React.FC<Props> = (props) => {
  const { columns, visible, onCancel, onSubmit, values } = props;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(values?.avatarUrl);
  const [FieldsValue, setFieldsValue] = useState<API.CurrentPageParams>();
  const [tags, setTags] = useState<API.Tag[]>([]);
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    if (formRef) {
      setImageUrl(values?.avatarUrl);
      console.log(values, 'values');
      setFieldsValue(values);
      formRef.current?.setFieldsValue(values);
      const tagNames = values?.tags?.map((tag) => tag.tagName);
      formRef.current?.setFieldsValue({ tags: tagNames });
    }
  }, [values]);
  const getTag = async () => {
    const res = await getAllTagByPageUsingGET({});
    if (res.code === 0) {
      if (res.data) setTags(res.data.records || []);
    }
  };
  useEffect(() => {
    getTag();
  }, []);

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('你只能上传 JPG/PNG 文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片必须小于 2MB!');
    }
    setImageUrl(URL.createObjectURL(file));
    //返回文件给外层
    if (FieldsValue)
      setFieldsValue({
        ...FieldsValue,
        file: file,
      });
    return false; // 阻止文件自动上传
  };
  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: React.SetStateAction<string | undefined>) => {
        setLoading(false);
        console.log(imageUrl);
        // setImageUrl(URL.createObjectURL(file));
      });
    }
  };
  const handleRemove = () => {
    setImageUrl('');
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  const tagRender: TagRender = (props) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };
  // 添加一个用于上传图片的列
  const setColumn: ProColumns<API.Current>[] = [
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        return (
          <div>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              beforeUpload={beforeUpload}
              onChange={handleChange}
              onRemove={handleRemove}
            >
              {imageUrl ? (
                <Image src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
        );
      },
    },
    {
      title: '标签',
      dataIndex: 'tags',
      renderFormItem: (_, {}, form) => {
        // 使用状态来管理标签列表
        return (
          <Select
            mode="multiple"
            tagRender={tagRender}
            // defaultValue={['gold', 'cyan']}
            style={{ width: '100%' }}
            onChange={(value) => {
              form.setFieldsValue({ tags: value });
            }}
            fieldNames={{
              value: 'tagName',
              label: 'tagName',
            }}
            options={tags}
          />
        );
      },
    },
  ];
  const extendedColumns = [...setColumn, ...columns];

  return (
    <Modal visible={visible} onCancel={() => onCancel?.()} footer={null}>
      <ProTable
        formRef={formRef}
        type="form"
        columns={extendedColumns}
        onSubmit={async (value) => {
          // @ts-ignore
          onSubmit?.(value, FieldsValue);
        }}
      />
    </Modal>
  );
};
export default CreateModal;
