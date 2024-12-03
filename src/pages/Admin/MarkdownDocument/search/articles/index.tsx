import { getDocumentsUsingPOST } from '@/services/muxeu-backend/markdown';
import { LikeOutlined, LoadingOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { useLocation, useRequest } from '@umijs/max';
import { Avatar, Button, Card, Col, Form, List, Row, Select, Tag } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import dayjs from 'dayjs';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { categoryOptions } from '../../mock';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import useStyles from './style.style';

const FormItem = Form.Item;

function createPreview(htmlContent: string | undefined): string {
  if (!htmlContent) {
    return '';
  }
  const strippedString = htmlContent.replace(/(<([^>]+)>)/gi, '');
  return strippedString.length > 350 ? strippedString.substring(0, 350) + '...' : strippedString;
}

const Articles: FC = () => {
  const [form] = Form.useForm();
  const { styles } = useStyles();
  const [pageSize] = useState<number>(5);
  const [total, setTotal] = useState<number>(5);
  const [current, setCurrent] = useState<number>(1);
  const [list, setList] = useState<API.MarkdowmDto[]>([]);
  const location = useLocation();
  const [search, setSearch] = useState<string | null>('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchValue = queryParams.get('search');
    setSearch(searchValue);
  }, [location]);

  const { reload, loading, loadMore, loadingMore } = useRequest(
    async () => {
      let searchText = '';
      if (search) {
        searchText = search;
      }
      const result = await getDocumentsUsingPOST({ pageSize, current, searchText });
      return result;
    },
    {
      loadMore: true,
      manual: true, // 确保手动控制数据加载
      onSuccess: (result) => {
        if (current === 1) {
          setTotal(result.total);
          setList(result.records); // 初始加载或重置
        } else {
          setList((prevList) => [...prevList, ...result.records]); // 追加新数据
        }
      },
    },
  );
  useEffect(() => {
    loadMore(); // 初始加载数据
  }, []); // 空依赖数组，确保只在组件挂载时执行

  useEffect(() => {
    loadMore(); // 当页码变化时，加载更多数据
  }, [current, search]); // 依赖于 current 的变化

  const handleLoadMore = () => {
    setCurrent((prevCurrent) => prevCurrent + 1);
  };

  const setOwner = () => {
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  const owners = [
    {
      id: 'wzj',
      name: '我自己',
    },
    {
      id: 'wjh',
      name: '吴家豪',
    },
    {
      id: 'zxx',
      name: '周星星',
    },
    {
      id: 'zly',
      name: '赵丽颖',
    },
    {
      id: 'ym',
      name: '姚明',
    },
  ];

  const IconText: React.FC<{
    type: string;
    text: React.ReactNode;
  }> = ({ type, text }) => {
    switch (type) {
      case 'star-o':
        return (
          <span>
            <StarOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'like-o':
        return (
          <span>
            <LikeOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'message':
        return (
          <span>
            <MessageOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      default:
        return null;
    }
  };

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
    },
  };
  const loadMoreDom = list.length > 0 && list.length < total && (
    <div style={{ textAlign: 'center', marginTop: 16 }}>
      <Button onClick={handleLoadMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
        {loadingMore ? (
          <span>
            <LoadingOutlined /> 加载中...
          </span>
        ) : (
          '加载更多'
        )}
      </Button>
    </div>
  );

  const ownerOptions = useMemo<DefaultOptionType[]>(
    () =>
      owners.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    [owners],
  );

  return (
    <>
      <Card bordered={false}>
        <Form
          layout="inline"
          form={form}
          initialValues={{
            owner: ['wjh', 'zxx'],
          }}
          onValuesChange={reload}
        >
          <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
            <FormItem name="category">
              <TagSelect expandable>
                {categoryOptions.map((category) => (
                  <TagSelect.Option value={category.value!} key={category.value}>
                    {category.label}
                  </TagSelect.Option>
                ))}
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="owner" grid>
            <FormItem name="owner" noStyle>
              <Select
                mode="multiple"
                placeholder="选择 owner"
                style={{ minWidth: '6rem' }}
                options={ownerOptions}
              />
            </FormItem>
            <a className={styles.selfTrigger} onClick={setOwner}>
              只看自己的
            </a>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="活跃用户" name="user">
                  <Select
                    placeholder="不限"
                    style={{ maxWidth: 200, width: '100%' }}
                    options={[
                      {
                        label: '李三',
                        value: 'lisa',
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="好评度" name="rate">
                  <Select
                    placeholder="不限"
                    style={{ maxWidth: 200, width: '100%' }}
                    options={[
                      {
                        label: '优秀',
                        value: 'good',
                      },
                    ]}
                  />
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <Card
        style={{ marginTop: 24 }}
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <List<API.MarkdowmDto>
          size="large"
          loading={loading}
          rowKey="id"
          itemLayout="vertical"
          loadMore={loadMoreDom}
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <IconText key="star" type="star-o" text={item.favoriteCount} />,
                <IconText key="like" type="like-o" text={item.likeCount} />,
                <IconText key="message" type="message" text={item.commentCount} />,
              ]}
              onClick={() => {
                window.open('/MarkdownDocument/read/' + item.id, '_blank');
              }}
              extra={<div className={styles.listItemExtra} />}
            >
              <List.Item.Meta
                title={
                  <a className={styles.listItemMetaTitle} href={item.coverImage}>
                    {item.title}
                  </a>
                }
                description={
                  <>
                    {item.tags ? (
                      item.tags.map((element) => <Tag key={element.id}>{element.tagName}</Tag>)
                    ) : (
                      <></>
                    )}
                  </>
                }
              />
              <div>
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{ __html: createPreview(item.content) }}
                />
                <div className={styles.extra}>
                  <Avatar src={item.avatarUrl} size="small" />
                  <a href="http://localhost:8080">{item.username}</a> 发布在{' '}
                  <a href="https://muxuetian.cn">muxuetian</a>
                  <em>{dayjs(item.updateTime).format('YYYY-MM-DD HH:mm')}</em>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default Articles;
