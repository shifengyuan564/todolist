import React, {Component} from 'react';
import PropTypes from 'prop-types';
// Line 1:  React.PropTypes is deprecated since React 15.5.0,
// use the npm module prop-types instead  react/no-deprecated

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    /*
        当组件将要从父组件接收参数props
        只要父组件的render函数被重新执行，子组件的该函数就会被执行
        如果子组件第一次存在于父组件中，不会执行的；（有点复杂）
    */
    componentWillReceiveProps() {

    }

    // 为了防止父组件每次render带着子组件render重复渲染，可以控制一下
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.content !== this.props.content) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const {content, test} = this.props;
        return (
            <div onClick={this.handleClick}>
                {test} - {content}
            </div>
        )
    }

    handleClick() {
        const {deleteItem, idx} = this.props;
        deleteItem(idx);
    }
}

// 校验
TodoItem.propTypes = {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    deleteItem: PropTypes.func,
    index: PropTypes.number,
    test: PropTypes.string.isRequired
};

// 若如果父组件没有向子组件传递该属性，则给一个默认值
TodoItem.defaultProps = {
    test: 'hello world'
};
export default TodoItem;