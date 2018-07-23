import React, {Component, Fragment} from 'react';
import TodoItem from './TodoItem';
import './style.css';

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
                    <label htmlFor='insertArea'>输入内容</label>
                    <input
                        id='insertArea' className='input'
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                    />
                    <button onClick={this.handleBtnClick}>提交</button>
                </div>
                <ul>
                    {this.getItems()}
                </ul>
            </Fragment>


        )
    }

    getItems() {
        return (
            this.state.list.map((item, index) => {
                return (
                        <TodoItem key={index}
                                  content={item}
                                  idx={index}
                                  deleteItem={this.handleItemDelete}/>

                    // 传参需要用一个lambda表达式将onClick包裹
                    /*<li key={index} onClick={()=>this.handleItemDelete(index)}>
                        {item}
                    </li>*/
                )
            })
        );
    }

    handleInputChange(e) {

        // 新版本推荐用函数返回的写法，是一个异步的setState(性能上的优化)
        const value = e.target.value;
        this.setState(() => ({
            inputValue: value
        }));

        // 老版本写法
        /*this.setState({
            inputValue: e.target.value
        })*/
    }

    handleBtnClick() {

        // prevState等价于this.state，之前的状态值
        this.setState((prevState) => ({
            list: [...prevState.list, prevState.inputValue],
            inputValue: ''
        }));

        /*this.setState({
            list: [...this.state.list, this.state.inputValue],
            inputValue: ''
        })*/
    }

    handleItemDelete(index) {
        this.setState((prevState) => {
            const temp = [...prevState.list];
            temp.splice(index, 1);
            return {list: temp};
        });

        // immutable的概念：state不允许我们做任何的改变
        /*
          const temp = [...this.state.list];    // this.state.list（不建议这么写）
          temp.splice(index, 1);  // 删除1个
          this.setState({list: temp})
        */
    }

}

export default TodoList;