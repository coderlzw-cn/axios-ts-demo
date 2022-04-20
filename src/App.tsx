import {getInfo} from './service/api'

function App() {
    return (
        <div className="App">
            <button onClick={() => {
                getInfo().then(res => {
                    console.log(res)
                }).catch(err => {
                    console.error(err.message)
                })
            }}>发送请求
            </button>
        </div>
    );
}

export default App;
