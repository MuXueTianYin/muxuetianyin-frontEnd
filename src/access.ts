/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  console.log(currentUser)
  return {
    canAdmin:
      (currentUser && currentUser?.data?.userRole === 1 || currentUser?.data?.userRole === 2),
  };
}
