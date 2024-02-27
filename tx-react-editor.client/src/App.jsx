import './App.css';
import DocumentEditor from './DocumentEditor'


function App() {
    return (
        <DocumentEditor
            webSocketURL="wss://localhost:7182/api/TXWebSocket"
            editMode="Edit">
        </DocumentEditor>
    );
}

export default App;
