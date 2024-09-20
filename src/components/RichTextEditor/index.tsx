import { uploadFileUsingPOST } from '@/services/muxeu-backend/commonController';
import { Input, message } from 'antd';
import Quill from 'quill';
import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  content: string | undefined;
  setContent: (content: string) => void;
  title: string | undefined; // 添加标题属性
  setTitle: (title: string) => void; // 添加设置标题的回调函数
  closeClipboardImg: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  setContent,
  title,
  setTitle,
  closeClipboardImg,
}) => {
  const handleContentChange = (content: string) => {
    console.log('Content changed: ', content);
    setContent(content);
  };
  const reactQuillRef = useRef<ReactQuill>(null);

  let fontFamily = ['宋体', '黑体', '微软雅黑', '楷体', '仿宋', 'Arial', '苹方'];
  Quill.import('attributors/style/font').whitelist = fontFamily;
  Quill.register(Quill.import('attributors/style/font'));
  // 自定义文字大小
  let fontSize = ['10px', '12px', '14px', '16px', '20px', '24px', '36px'];
  Quill.import('attributors/style/size').whitelist = fontSize;
  Quill.register(Quill.import('attributors/style/size'));
  // 新增行高
  let Parchment = Quill.import('parchment');
  let lingHeight = ['initial', '1', '1.5', '1.75', '2', '3', '4'];

  // @ts-ignore
  class lineHeightAttributor extends Parchment.Attributor.Style {}

  // @ts-ignore
  const lineHeightStyle = new lineHeightAttributor('lineHeight', 'line-height', {
    scope: Parchment.Scope.INLINE,
    whitelist: lingHeight,
  });
  Quill.register({ 'formats/lineHeight': lineHeightStyle }, true);
  // 对齐方式样式都改成style方式，而不是class
  let Align = Quill.import('attributors/style/align');
  Align.whitelist = ['right', 'center', 'justify'];
  Quill.register(Align, true);

  //todo
  function base64toFile(dataurl: string, filename: string) {
    let arr = dataurl.split(','),
      // @ts-ignore
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const customImgForPaste = async (node: any, delta: any) => {
    for (const op of delta) {
      if (op.insert && op.insert.image) {
        let file = base64toFile(op.insert.image, 'pasted-image.png');
        const formData = new FormData();
        formData.append('file', file);
        try {
          const uploadResult = await uploadFileUsingPOST({ biz: 'article_image' }, { file });
          if (uploadResult.code === 0) {
            const url = uploadResult.data;
            const quill = reactQuillRef.current?.getEditor();
            const range = quill?.getSelection();
            if (range && quill) {
              const cursorPosition = range.index;
              range.index = 99999; //粘贴的时候失去焦点拿不到光标位置
              quill.insertEmbed(cursorPosition, 'image', url);
              quill.setSelection(range);
            }
          } else {
            message.error(`文件失败: ${uploadResult.message}`);
            continue;
          }
        } catch (error) {
          console.error('Error uploading image: ', error);
          alert('Failed to upload image');
        }
      }
    }
  };

  // 上传图片
  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'true');
    input.click();
    input.onchange = async () => {
      if (input.files && input.files.length > 0) {
        try {
          // 假设 uploadFileUsingPOST 函数需要一个文件对象和其他参数
          const uploadResult = await uploadFileUsingPOST(
            { biz: 'article_image' },
            { file: input.files[0] },
          );
          if (uploadResult.code === 0) {
            const url = uploadResult.data;
            const quill = reactQuillRef.current?.getEditor();
            const range = quill?.getSelection();
            if (range && quill) {
              // const imageHtml = `<img src="${url}" style="max-width:100%; height:auto;">`;
              // quill.insertEmbed(range.index, 'html', imageHtml);
              quill.insertEmbed(range.index, 'image', url);
              range.index = range.index + 1;
              quill.setSelection(range); // 更新光标位置
            }
          } else {
            message.error(`上传失败: ${uploadResult.message}`);
          }
        } catch (error) {
          console.error('Error uploading image: ', error);
          message.error(`上传失败: ${error}`);
        }
      }
    };
  };

  const toolbar = React.useMemo(
    () => ({
      toolbar: {
        container: [
          ['clean'],
          [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: fontFamily }],
          [{ size: fontSize }],
          [{ lineheight: lingHeight }], // 行高
          [
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'code-block',
            { header: 1 },
            { header: 2 },
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { script: 'sub' }, // 下标
            { script: 'super' }, // 上标
            { align: [] },
          ],
          ['link', 'image'],
          [{ color: [] }, { background: [] }, { align: [] }],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchers: [
          // 粘贴事件和setEditorContents有冲突报错，但在readOnly=true的时候可以正常使用
          // 临时处理方式：需要setEditorContents的地方先将readOnly=true再使用，或者先去掉粘贴功能比如表单编辑的时候
          closeClipboardImg ? [] : ['img', customImgForPaste],
        ],
      },
      // imageDrop: true,
    }),
    [],
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'background',
    'size',
  ];

  const defaultProps = {
    theme: 'snow',
    modules: toolbar,
    formats,
    placeholder: '请输入',
    // className: styles.default_style,
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Input
          variant="borderless"
          id="articleTitle"
          style={{ width: '100%', fontSize: '32px', fontWeight: 'bold' }}
          placeholder="请输入文章标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="large"
        />
      </div>
      <ReactQuill
        ref={reactQuillRef}
        value={content}
        onChange={handleContentChange}
        {...defaultProps}
      />
    </>
  );
};

export default RichTextEditor;
