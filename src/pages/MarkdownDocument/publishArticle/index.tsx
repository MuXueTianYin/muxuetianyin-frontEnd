import RichTextEditor from '@/components/RichTextEditor';
import { createDocumentUsingPOST } from '@/services/muxeu-backend/markdown';
import { history } from '@@/core/history';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, message } from 'antd';
import { useState } from 'react';
import useStyles from './style.style';

const ReadArticle = () => {
  const [article, setArticle] = useState<API.MarkdowmDto>({});
  const { styles } = useStyles();
  const [articleTitle, setArticleTitle] = useState<string>('');
  const updateArticle = async () => {
    let body: API.DocumentModificationRequest = {
      content: article.content || '',
      coverImage: article.coverImage || '',
      title: articleTitle,
    };
    const tags = article.tags
      ?.map((item) => item.id)
      .filter((id): id is number => id !== undefined);
    if (tags && tags.length > 0) {
      body.tags = tags;
    }
    const result = await createDocumentUsingPOST(body);
    if (result.code === 0) {
      message.success('更新成功');
      const id = result.data?.id;
      history.replace({ pathname: `/MarkdownDocument/read/${id}` });
    }
  };

  return (
    <PageContainer title={article ? article.title : 'Loading...'}>
      <>
        <Button key="3" type="primary" onClick={() => updateArticle()} className={styles.edit}>
          更新
        </Button>
        <RichTextEditor
          content={article.content}
          setContent={(newContent) => {
            let NewArticle = { ...article, content: newContent };
            setArticle(NewArticle);
          }}
          title={articleTitle}
          setTitle={setArticleTitle}
          closeClipboardImg={false}
        />
      </>
    </PageContainer>
  );
};

export default ReadArticle;
