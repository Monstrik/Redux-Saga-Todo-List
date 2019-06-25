import axios from 'axios';
import {call, put, takeEvery, all} from 'redux-saga/effects';


const config = {
    crossDomain: true,
    headers: {'Access-Control-Allow-Origin': '*'}
};

const ROOT_URL = 'https://coolspammail.pythonanywhere.com';


export function* fetchTodos() {
    try {
        const todos = yield call(axios.get, `${ROOT_URL}/todo`, config);
        yield put({type: 'FETCH_TODOS_SUCCESS', todos: todos.data})
    } catch (error) {
        console.log('fetchTodos error:', error.message)
    }
}

function* watchFetchTodos() {
    yield takeEvery('FETCH_TODOS', fetchTodos)
}

export function* createTodo(action) {
    // console.log(action)
    const newTodo = {text: action.payload};
    try {
        yield call(axios.post, `${ROOT_URL}/todo`, newTodo);
        yield put({type: 'FETCH_TODOS'});
    } catch (error) {
        console.log('createTodo error:', error.message);
    }
}

function* watchAddToDo() {
    yield takeEvery('ADD_TODO', createTodo)
}

export function* deleteTodo({id}) {
    try {
        yield call(axios.delete, `${ROOT_URL}/todo/${id}`);
        yield put({type: 'FETCH_TODOS'})
    } catch (error) {
        console.log('deleteTodo Error:', error.message);
    }
}

function* watchDeleteTodo() {
    yield takeEvery('DELETE_TODO', deleteTodo)
}

export default function* rootSaga() {
    yield all([
        watchFetchTodos(),
        watchAddToDo(),
        watchDeleteTodo()
    ])
};
