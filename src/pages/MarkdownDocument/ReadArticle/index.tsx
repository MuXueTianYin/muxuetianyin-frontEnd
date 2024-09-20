import RichTextEditor from '@/components/RichTextEditor';
import { getDocumentsUsingPOST, updateDocumentUsingPUT } from '@/services/muxeu-backend/markdown';
import { PageContainer } from '@ant-design/pro-layout';
import { useModel } from '@umijs/max';
import { Alert, Button, Card, message, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from './style.style';

const ReadArticle = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<API.MarkdowmDto>({});
  const [edit, setEdit] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { styles } = useStyles();
  const [articleTitle, setArticleTitle] = useState<string>('');
  const { initialState } = useModel('@@initialState');
  useEffect(() => {
    const loadArticle = async () => {
      try {
        // @ts-ignore  这里id转number精度会丢失
        const response = await getDocumentsUsingPOST({ id: id });
        if (response.data?.records && response.data.records.length > 0) {
          setArticle(response.data.records[0]);
          setArticleTitle(response.data.records[0].title || '');
        } else {
          setError('Article not found');
        }
      } catch (error) {
        setError('Failed to load the article');
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [id]);

  useEffect(() => {
    setUserId(initialState?.currentUser?.data.id);
  }, [initialState?.currentUser?.data.id]);

  const updateArticle = async () => {
    if (!article.id) {
      message.error('更新失败，当前更新文章异常');
      return;
    }
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
    const result = await updateDocumentUsingPUT({ id: article.id }, body);
    if (result.code === 0) {
      message.success('更新成功');
      setEdit(false);
    }
  };

  return (
    <PageContainer title={edit ? '更新文章' : article ? article.title : 'Loading...'}>
      {article && article.userID && userId === article.userID ? (
        <>
          {edit ? (
            <Button key="3" type="primary" onClick={() => updateArticle()} className={styles.edit}>
              更新
            </Button>
          ) : (
            <Button key="3" type="primary" onClick={() => setEdit(true)} className={styles.edit}>
              编辑
            </Button>
          )}
        </>
      ) : (
        <></>
      )}
      <>
        {edit ? (
          <>
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
        ) : (
          <Card bordered={false}>
            {loading ? (
              <Spin size="large" />
            ) : error ? (
              <Alert message={error} type="error" />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: article.content || '' }} />
            )}
          </Card>
        )}
      </>
    </PageContainer>
  );
};

export default ReadArticle;
