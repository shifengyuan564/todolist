import React, {Component, Fragment} from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';
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

    /*
        componentWillMount     在页面被渲染(render方法)之前执行，一般在componentWillMount中触发请求数据的方法
        componentDidMount      也就是页面的组件渲染完毕之后(常用于调用ajax请求)，类似js中的window.onload，执行在render方法之后
        componentWillUnmount   组件要被从界面上移除的时候，就会调用
     */
    componentWillMount() {
    }

    componentDidMount() {
        // ajax写在这里最合适
        axios.get('http://localhost:3000/json/todoList.json')
            .then((res) => {
                this.setState(() => ({list: [...res.data]}))
            })
            .catch(() => alert('ajax error'))
    }

    componentWillUnmount() {
    }

    /*
        shouldComponentUpdate   组件被更新前，自动执行(可以利用做子组件的性能优化)
        componentWillUpdate     组件被更新前，shouldComponent执行返回true后，自动执行
        componentDidUpdate      render执行更新之后
    */
    shouldComponentUpdate() {
        return true;
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {

    }

    // (1) 当组件的state或props改变，render函数会重新执行
    // (2) 父组件render函数执行，其子组件的render也将重新执行
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
                    <TodoItem key={item}
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