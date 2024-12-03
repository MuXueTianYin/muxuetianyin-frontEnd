import { getAllPhotoAlbumsUsingGET } from '@/services/muxeu-backend/photoAlbum';
import { delImages, getAllCategories, ImageSave, upload } from '@/services/muxue-service/api';
import { eventBus } from '@/utils/EventBus';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  message,
  Modal,
  Pagination,
  Row,
  Select,
  Space,
  Tabs,
  Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import './ImageGallery.less';

// const {TabPane} = Tabs;
const { Option } = Select;

interface ImageInfo {
  id?: number;
  name?: string;
  url?: string;
  category?: string;
  createTime?: string;
  isDeleted?: string;
  updateTime?: string;
}

const ImageGallery: React.FC = () => {
  // 创建表单实例
  const [formInstance] = Form.useForm();
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [search, setSearch] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [categories, setCategories] = useState<string[]>([]);
  const [title, setTitle] = useState('上传图片');
  const [total, setTotal] = useState(4);
  const fetchImages = async (
    name: string = '',
    category: string = '',
    page: number = 1,
    size: number = 10,
  ) => {
    let params = { name, category, page, size };
    try {
      const { code, data } = await getAllPhotoAlbumsUsingGET(params);
      if (code === 0) {
        let categorySet = new Set<string>();
        setTotal(data?.total);
        data?.records.forEach((image: ImageInfo) => {
          categorySet.add(String(image.category));
        });
        await setCategories(Array.from(categorySet));
        setImages(data?.records); // 直接设置 images 状态
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      if (response.code === 0) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCategories();
    eventBus.on('tokenRefreshed', fetchCategories);
    eventBus.on('tokenRefreshed', fetchImages);
    // 组件卸载时取消订阅
    return () => {
      eventBus.off('tokenRefreshed', fetchCategories);
      eventBus.on('tokenRefreshed', fetchImages);
    };
  }, []);

  useEffect(() => {
    fetchImages(search, '', currentPage, pageSize);
  }, [search, currentPage, pageSize]);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const handleBeforeUpload = (file: any) => {
    // @ts-ignore
    setFileList([file]);
    setPreviewImage(URL.createObjectURL(file));
    formInstance.setFieldsValue({
      file: file,
    });
    return false; // 阻止文件自动上传
  };
  /*
   * 删除图片
   * */
  const handleRemove = () => {
    setFileList([]);
    setPreviewImage('');
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    fetchImages(value, '', currentPage, pageSize);
  };

  const handleCancel = () => setPreviewVisible(false);
  /*
   * 提交保存方法
   * */
  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append('file', fileList[0]);
    let list = { ...values };
    // 删除list中的file属性
    delete list.file;
    try {
      // console.log(formData);
      const response = await upload(formData);
      if (response.code === 0) {
        list.url = response.data;
        let res = await ImageSave(list);
        if (res.code === 0 && res.data) {
          fetchImages(search, '', currentPage, pageSize);
          message.success('上传成功');
          formInstance.resetFields();
        }
      }
    } catch (error) {
      console.error('Error', error);
    }
  };
  const showModal = (val: string, image: ImageInfo = {}) => {
    setTitle(val);
    formInstance.setFieldsValue(image);
    if (val === '上传') {
      formInstance.resetFields();
      handleRemove();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      // 手动触发表单验证
      await formInstance.validateFields();
      formInstance.submit();
      setIsModalVisible(false);
    } catch (error) {
      // 如果有任何表单项没有通过验证，打印错误信息
      console.error('Validation Failed:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };
  const handleDelImages = async (val: ImageInfo) => {
    Modal.confirm({
      title: '确认删除',
      content: '你确定要删除这张图片吗？',
      async onOk() {
        try {
          const response = await delImages(val.id); // 假设 delImages 函数接受一个 id 参数
          if (response.code === 0) {
            message.success('图片删除成功');
            // 从 images 状态中删除该图片
            setImages(images.filter((image) => image.id !== val.id));
          }
        } catch (error) {
          console.error(error);
          // message.error('图片删除失败');
        }
      },
      onCancel() {
        console.log('取消删除');
      },
    });
  };
  /*
   * 列表信息
   * */
  const tabItems = categories.map((category, index) => ({
    key: (index + 1).toString(),
    label: category,
    children: (
      <Space direction="vertical">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
          {images
            .filter((image) => image.category === category)
            .map((image, index) => (
              <div key={index}>
                <Card
                  className="image-card"
                  title={image.name}
                  hoverable // 添加鼠标悬停效果
                  // onClick={() => handlePreview(image.url)}
                >
                  <Image
                    height={400}
                    src={image.url || 'placeholder.png'} // 如果图像 URL 不存在，就显示一个占位符
                  />
                  {/*<Row justify="space-between" align="middle" style={{ marginTop: '1rem' }}>*/}
                  {/*  <Col>更新时间: {image.updateTime}</Col>*/}
                  {/*</Row>*/}
                  <Row justify="space-between" align="middle" style={{ marginTop: '1rem' }}>
                    <Col>上传时间: {image.createTime}</Col>
                    <Col>更新时间: {image.updateTime}</Col>
                  </Row>
                  <Row justify="space-between" align="middle" style={{ marginTop: '1rem' }}>
                    <Col>
                      <Button type="default" onClick={() => showModal('修改', image)}>
                        修改
                      </Button>
                    </Col>
                    <Col>
                      <Button type="default" danger onClick={() => handleDelImages(image)}>
                        删除
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </div>
            ))}
        </div>
        <Row justify="end">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={handlePageChange}
            showSizeChanger
            showQuickJumper
          />
        </Row>
      </Space>
    ),
  }));
  return (
    <div className="image-gallery">
      <div className="top-bar">
        <Input.Search className="search-bar" placeholder="搜索图片" onSearch={handleSearch} />
        <Button type="primary" onClick={() => showModal('上传')}>
          上传
        </Button>
      </div>
      <Modal title={title} open={isModalVisible} onOk={handleOk} onCancel={handleModalCancel}>
        <Form form={formInstance} onFinish={handleSubmit}>
          {title === '修改' && (
            <Form.Item name="id" label="ID">
              <Input disabled />
            </Form.Item>
          )}
          <Form.Item name="name" label="名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="file" label="上传图片" rules={[{ required: true }]}>
            <div>
              <Upload
                beforeUpload={handleBeforeUpload}
                onRemove={handleRemove}
                fileList={fileList}
                listType="picture-card"
              >
                {fileList.length >= 1 ? null : <Button icon={<UploadOutlined />}>上传</Button>}
              </Upload>
              {previewImage && <Image src={previewImage} />}
            </div>
          </Form.Item>
          <Form.Item name="category" label="分类" rules={[{ required: true }]}>
            <Select>
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ display: 'none' }}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Tabs defaultActiveKey="1" items={tabItems} />
      <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default ImageGallery;
