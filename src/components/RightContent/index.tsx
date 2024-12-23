import { QuestionCircleOutlined } from '@ant-design/icons';
import '@umijs/max';
export type SiderTheme = 'light' | 'dark';

function UmiSelectLang(props: { style: { padding: number } }) {
  console.log(props);
  return null;
}

export const SelectLang = () => {
  return (
    <UmiSelectLang
      style={{
        padding: 4,
      }}
    />
  );
};
export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://www.muxuetianyin.cn/');
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};
