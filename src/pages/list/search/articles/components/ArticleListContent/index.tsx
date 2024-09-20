import { Avatar } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import useStyles from './index.style';

const ArticleListContent: React.FC<API.MarkdowmDto> = ({ updateTime, avatarUrl, username }) => {
  const { styles } = useStyles();
  return (
    <div>
      <div className={styles.extra}>
        <Avatar src={avatarUrl} size="small" />
        <a href="http://localhost:8080">{username}</a> 发布在{' '}
        <a href="https://muxuetian.cn">muxuetian</a>
        <em>{dayjs(updateTime).format('YYYY-MM-DD HH:mm')}</em>
      </div>
    </div>
  );
};
export default ArticleListContent;
