import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    selfTrigger: {
      marginLeft: '12px',
      [`@media screen and (max-width: ${token.screenXS}px)`]: {
        display: 'block',
        marginLeft: '0',
      },
      [`@media screen and (max-width: ${token.screenMD}px)`]: {
        display: 'block',
        marginLeft: '0',
      },
    },
    edit: {
      margin: '12px 0',
    },
  };
});

export default useStyles;
