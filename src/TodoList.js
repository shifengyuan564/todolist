import React, {Component, Fragment} from 'react';

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            list: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
    }

    render() {
        return (
            <Fragment>
                <div>
                    <input
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                    />
                    <button onClick={this.handleBtnClick}>提交</button>
                </div>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                // 传参需要用一个lambda表达式将onClick包裹
                                <li key={index} onClick={()=>this.handleItemDelete(index)}>
                                    {item}
                                </li>
                            )
                        })
                    }
                </ul>
            </Fragment>


        )
    }

    handleInputChange(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    handleBtnClick() {
        this.setState({
            list: [...this.state.list, this.state.inputValue],
            inputValue: ''
        })
    }

    handleItemDelete(index) {
        // immutable的概念：state不允许我们做任何的改变
        const temp = [...this.state.list];    // this.state.list（不建议这么写）
        temp.splice(index, 1);  // 删除1个
        this.setState({
            list: temp
        })
    }
}

export default TodoList;