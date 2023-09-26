
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
  
