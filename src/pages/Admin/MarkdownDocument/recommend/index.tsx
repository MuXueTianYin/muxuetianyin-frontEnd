import {recommendUsingGET} from '@/services/muxeu-backend/markdown';
import {LikeOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons';
import {ProList} from '@ant-design/pro-components';
import {Avatar, Button, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import './css/recommend.less';
import {history} from "@@/core/history";


const IconText = ({icon, text}: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, {style: {marginInlineEnd: 8}})}
    {text}
  </span>
);

export default () => {
  const [Page, setPage] = useState<any>([]);

  function createPreview(htmlContent: string | undefined): string {
    if (!htmlContent) {
      return ""
    }
    const strippedString = htmlContent.replace(/(<([^>]+)>)/gi, "");
    return strippedString.length > 350
      ? strippedString.substring(0, 350) + "..."
      : strippedString;
  }

  const getPage = async () => {
    const {code, data} = await recommendUsingGET();
    if (code === 0 && data && data.records) {
      const Page = data.records.map(({avatarUrl, content, coverImage, tags, title, id,updateTime,username}) => ({
        title: <div className={'title'}>{title}</div>,
        subTitle:(<div>{updateTime}</div>),
        description: (
          <>
            {tags ? tags.map(
              (element) => (
                <Tag key={element.id}>{element.tagName}</Tag>
              ),
            ) : <></>}
          </>
        ),
        extra: (
          coverImage ?
            <img
              width={200}
              src={coverImage}
            /> : <></>),
        avatar: <div >{avatarUrl ?
          <div className={'avatar'}>
            <Avatar
          size={{xs: 24, sm: 26, md: 28, lg: 30, xl: 32, xxl: 45}}
          src={avatarUrl}
          // icon={<UserOutlined />}
        /><div className={'username'}>{username}</div> </div>
          :<div>{username}</div>}</div>,
        content: (
          <div dangerouslySetInnerHTML={{__html: createPreview(content)}}/>
        ),
        id
      }));
      setPage(Page);
    }
  };

  useEffect(() => {
    getPage();
    // 组件卸载
    return () => {
    };
  }, []);
  return (
    <ProList<any>
      pagination={{
        defaultPageSize: 5,
        showSizeChanger: true,
      }}
      toolBarRender={() => {
        return [
          <Button key="3" type="primary" onClick={() => history.push('/MarkdownDocument/publish')}>
            新建
          </Button>,
        ];
      }}
      itemLayout="vertical"
      rowKey="id"
      headerTitle="文章推荐"
      dataSource={Page}
      onItem={(record: any) => {
        return {
          onClick: () => {
            window.open('/MarkdownDocument/read/' + record.id, '_blank');
          },
        };
      }}
      metas={{
        title: {},
        description: {},
        actions: {
          render: () => [
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o"/>,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
          ],
        },
        avatar: {},
        extra: {},
        content: {},
        subTitle: {},
      }}
    />
  );
};
