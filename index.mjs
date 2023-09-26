#!/usr/bin/env node

import { $ } from 'zx';

// let codeTemplate = '';
// const addReactCode = `
// import React from 'react';


// export interface IArrowLeftIconProps extends ISvgIconProps {}

// const ArrowLeftIcon = (props: IArrowLeftIconProps) => {
//   // css-in-js created style
//   const classes = useStyles();
//   const { children } = props;

//   return (
//     <div>{children}</div>
//   );
// };

// export default ArrowLeftIcon;
// `
// const addReduxCode = `
//   //  thunk 的state
//   const mapStateToProps = (state: any) => {
//     return {
//       selectedSource: state.getIn(['NewsFilterSelectedItems', 'selectedSources']),
//       sourceAdditionalInfo: state.getIn([
//         'NewsFilterSelectedItems',
//         'NewsFilterSelectedItemsInfo',
//         'source',
//       ]),
//     };
//   };

//   //  thunk 的action
//   const mapDispatchToProps = (dispatch: any) => ({
//     ...bindActionCreators(
//       {
//         updateSelectedSource,
//       },
//       dispatch
//     ),
//   });

//   export default React.memo(
//     connect<
//     IFilterSourceStateProps,
//     IFilterSourceDispatchProps,
//     IFilterSourceOwnProps
//     >(
//       mapStateToProps,
//       mapDispatchToProps
//     )(FilterSource)
//   );
// `;

// codeTemplate = addReactCode + addReduxCode;
// await $`echo ${codeTemplate} >> test.tsx`;
// const checkFileContent = await $`cat ./test.tsx`;
// const fileContent = checkFileContent.stdout
// console.log(fileContent);

// 如果大于5就增加，小于5就删除
const getAddOrRemove = parseInt(Math.random() * 10);

function getRandomCommit() {
  const getActionRandom = parseInt(Math.random() * 6);
  const action = ['added', 'removed', 'optimized', 'changed', 'merged', 'fixed'];
  const getThingRandom = parseInt(Math.random() * 10);
  const Thing = ['function','issues', 'data tracking'];
  return `${action[getActionRandom]} ${Thing[getThingRandom]}`
}

async function pushGit() {
  // 只是一个demo，默认使用master分支
  const getCommit = `${(getAddOrRemove>5) ? `feat: ${getRandomCommit()} `:`chore: ${getRandomCommit()}` }`
  await $`git add .`;
  await $`git commit -m ${getCommit}`;
  await $`git pull origin master`;
  await $`git push origin master`;
};
pushGit();