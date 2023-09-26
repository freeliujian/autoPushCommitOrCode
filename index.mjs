#!/usr/bin/env node

import { $ } from 'zx';

const commitNum = process.argv[2];


async function initCommit () {
  let codeTemplate = '';
  const addReactCode = `
  import React from 'react';


  export interface IArrowLeftIconProps extends ISvgIconProps {}

  const ArrowLeftIcon = (props: IArrowLeftIconProps) => {
    // css-in-js created style
    const classes = useStyles();
    const { children } = props;

    return (
      <div>{children}</div>
    );
  };

  export default ArrowLeftIcon;
  `
  const addReduxCode = `
    //  thunk 的state
    const mapStateToProps = (state: any) => {
      return {
        selectedSource: state.getIn(['NewsFilterSelectedItems', 'selectedSources']),
        sourceAdditionalInfo: state.getIn([
          'NewsFilterSelectedItems',
          'NewsFilterSelectedItemsInfo',
          'source',
        ]),
      };
    };

    //  thunk 的action
    const mapDispatchToProps = (dispatch: any) => ({
      ...bindActionCreators(
        {
          updateSelectedSource,
        },
        dispatch
      ),
    });

    export default React.memo(
      connect<
      IFilterSourceStateProps,
      IFilterSourceDispatchProps,
      IFilterSourceOwnProps
      >(
        mapStateToProps,
        mapDispatchToProps
      )(FilterSource)
    );
  `;

  codeTemplate = addReactCode + addReduxCode;
  await $`echo ${codeTemplate} >> test.tsx`;
  await pushGit('add a new icon component');

};

const getAddOrRemove = parseInt(Math.random() * 10);

async function setRandomAddOrRemove() {
  const checkFileContent = await $`cat ./test.tsx`;
  const addCode = ['const import = "asdasd";'];
  const fileContent = checkFileContent.stdout;
  const codeLines = fileContent.split('\n');
  const lines =  codeLines.length
  const randomLine = parseInt(Math.random() * lines);
  const newCodeLines  = JSON.parse(JSON.stringify( codeLines));
  if (getAddOrRemove > 5) {
    newCodeLines.splice(randomLine, 0, addCode);
  } else {
    // 删除行数也可以改成可以设置
    newCodeLines.splice(randomLine, 1);
  }
  console.log(newCodeLines, 111);
};


function getRandomCommit() {
  const getActionRandom = parseInt(Math.random() * 6);
  const action = ['added', 'removed', 'optimized', 'changed', 'merged', 'fixed'];
  const getThingRandom = parseInt(Math.random() * 10);
  const Thing = ['function','issues', 'data tracking'];
  return `${action[getActionRandom]} ${Thing[getThingRandom]}`
};

// 只是一个demo，默认使用master分支
const getCommit = `${(getAddOrRemove>5) ? `feat: ${getRandomCommit()} `:`chore: ${getRandomCommit()}` }`

async function pushGit(getCommit) {
  await $`git add .`;
  await $`git commit -m ${getCommit}`;
  await $`git pull origin master`;
  await $`git push origin master`;
};

(async function (num) {
  await initCommit();
  await setRandomAddOrRemove();
})(commitNum);