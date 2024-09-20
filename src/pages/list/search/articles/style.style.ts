import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    listItemMetaTitle: {
      color: token.colorTextHeading,
    },
    listItemExtra: {
      width: '272px',
      height: '1px',
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        width: '0',
        height: '1px',
      },
    },
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
    description: {
      maxWidth: '720px',
      lineHeight: '22px',
    },
    extra: {
      marginTop: '16px',
      color: token.colorTextSecondary,
      lineHeight: '22px',
      '& > em': {
        marginLeft: '16px',
        color: token.colorTextDisabled,
        fontStyle: 'normal',
      },
      [`@media screen and (max-width: ${token.screenXS}px)`]: {
        '& > em': {
          display: 'block',
          marginTop: '8px',
          marginLeft: '0',
        },
      },
    },
  };
});

export default useStyles;
