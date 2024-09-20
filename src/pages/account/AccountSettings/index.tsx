import { uploadFileUsingPOST } from '@/services/muxeu-backend/commonController';
import { getCurrentUserUsingGET, updateMyUserUsingPOST } from '@/services/muxeu-backend/user';
import { UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';

const AccountSettings: React.FC = () => {
  const [userData, setUserData] = useState<API.UserDto>({});
  const [file, setFile] = useState<File>();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [form] = Form.useForm();
  useEffect(() => {
    const getCurrentUser = async () => {
      const result = await getCurrentUserUsingGET();
      if (result.code === 0 && result.data) {
        setUserData(result.data);
        setPreviewUrl(result.data.avatarUrl || '');
        form.setFieldsValue(result.data || {});
      } else {
        message.error(result.message);
      }
    };
    getCurrentUser();
  }, [form]);

  const onFinish = async (values: any) => {
    console.log('提交表单');
    if (file) {
      const uploadResult = await uploadFileUsingPOST({ biz: 'user_avatar' }, { file });
      if (uploadResult.code === 0) {
        values.avatarUrl = uploadResult.data;
      } else {
        message.error(`文件上传失败: ${uploadResult.message}`);
        return;
      }
    }
    const response = await updateMyUserUsingPOST(values);
    if (response.code === 0) {
      setComponentDisabled(true);
      message.success('更新成功');
      setUserData({ ...userData, ...values }); // Update user data state
    } else {
      message.error(`更新失败: ${response.message}`);
    }
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('你只能上传 JPG/PNG 文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片必须小于 2MB!');
    }
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    setFile(file);
    return false;
  };

  // const handleUpload = ({ file, onSuccess }: any) => {
  //   setTimeout(() => {
  //     console.log('上传的文件:', file);
  //     onSuccess("ok");
  //   }, 0);
  // };

  return (
    <PageContainer>
      <Row gutter={20}>
        <Col span={12}>
          <Card bordered={false}>
            <Form
              layout="vertical"
              initialValues={userData}
              onFinish={onFinish}
              disabled={componentDisabled}
              form={form}
            >
              <div className="avatar-uploader">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                >
                  {previewUrl ? (
                    <img src={previewUrl} alt="avatar" style={{ width: '100%' }} />
                  ) : (
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </div>
              <Col span={12}>
                <Form.Item label="昵称" name="username">
                  <Input defaultValue={userData?.username} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="邮箱" name="email">
                  <Input defaultValue={userData?.email} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="性别" name="gender">
                  <Select>
                    <Select.Option value={1}>男</Select.Option>
                    <Select.Option value={2}>女</Select.Option>
                    <Select.Option value={0}>未知</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="手机号" name="phone">
                  <Input defaultValue={userData?.phone} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="个性签名" name="signature">
                  <Input.TextArea defaultValue={userData?.signature} />
                </Form.Item>
              </Col>
              {!componentDisabled && (
                <Row gutter={10}>
                  <Col span={5}>
                    <Button type="default" onClick={() => setComponentDisabled(true)}>
                      取消
                    </Button>
                  </Col>
                  <Col span={5}>
                    <Button type="primary" htmlType="submit">
                      确定更新
                    </Button>
                  </Col>
                </Row>
              )}
            </Form>
            {componentDisabled && (
              <Button type="primary" onClick={() => setComponentDisabled(false)}>
                更新基本信息
              </Button>
            )}
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default AccountSettings;
