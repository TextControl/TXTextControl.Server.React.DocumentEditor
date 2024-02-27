// External imports
import React, { Component } from "react";

const CONTAINER_ID = "txDocumentEditorContainer";
var TX_SCRIPT_PATH = "";
var WS_URL = "";

function editModeFromString(value) {
    switch (value) {
        case 'Edit': return 1;
        case 'ReadAndSelect': return 2;
        case 'ReadOnly': return 3;
        case 'UsePassword': return 2048;
    }
    return 1;   // EditMode.Edit
}

class DocumentEditor extends Component {

    constructor(props) {
        super(props);

        // Get the WebSocket URL.
        WS_URL = this.props.webSocketURL;

        // Set the TX_SCRIPT_PATH.
        // If the WebSocket URL starts with wss://, replace it with https://.
        // If the WebSocket URL starts with ws://, replace it with http://.
        if (WS_URL.startsWith("wss://")) {
            TX_SCRIPT_PATH = WS_URL.replace("wss://", "https://");
        } else if (WS_URL.startsWith("ws://")) {
            TX_SCRIPT_PATH = WS_URL.replace("ws://", "http://");
        }

        // Append the path to the TX Text Control resources.
        TX_SCRIPT_PATH += "/GetResource?name=tx-document-editor.min.js";
    }

    // Set the default props.
    static defaultProps = {
        webSocketURL: null,
        style: {
            width: "1000px",
            height: "800px",
            display: "inline-block"
        },
        editMode: "Edit",
        contextMenusEnabled: true,
        formattingPrinter: "",
        culture: "",
        uiCulture: "",
        userNames: [],
        reconnectTimeout: 0
    }

    // Render the component.
    render() {
        return <div id={CONTAINER_ID} style={this.props.style}></div>;
    }

    componentDidMount() {
    // Create the settings object.
    var mySettings = {
        containerID: CONTAINER_ID,
        webSocketURL: this.props.webSocketURL,
        editorSettings: {
            culture: this.props.culture,
            uiCulture: this.props.uiCulture,
            editMode: editModeFromString(this.props.editMode),
            contextMenusEnabled: this.props.contextMenusEnabled,
            formattingPrinter: this.props.formattingPrinter,
            reconnectTimeout: this.props.reconnectTimeout,
            userNames: this.props.userNames,
        },
    };

    // Load the editor script.
    let script = document.createElement("script");
    script.src = TX_SCRIPT_PATH;
    script.async = true;
    script.addEventListener("load", () => {
        // Initialize the editor.
        window.TXTextControl.init(mySettings);
    });
    document.getElementById(CONTAINER_ID).appendChild(script);
}
}

// Export the DocumentEditor class.
export default DocumentEditor;
