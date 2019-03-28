import React from 'react';
import TextField from "@material-ui/core/TextField";
//export form
export default class form extends React.Component {
//setting state for the form (input data)
    state ={
        text: '',
    };
//putting events on the state
//handleChange => input characters in text field
    handleChange = e => {
        const newText = e.target.value;
        console.log(newText)
        this.setState({
            text: newText
        })
    }
//handleKeyDown => submit using enter and change the state to a blank text input
    handleKeyDown = e => {
        if (e.key === 'Enter') {
            this.props.submit(this.state.text);
            this.setState({ text: ""});
        }
    }
//text field settings and calling state in the text field
    render() {
        const { text } = this.state;
        return (
        <TextField
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            label=" To Do..." 
            margin="normal"
            value={text}
            fullWidth/>
            )
        
    }
}