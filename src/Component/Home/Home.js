import React from "react";
import openai from "openai";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: "",
      outputText: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ inputText: event.target.value });
    alert(process.env.REACT_APP_OPENAI_API_KEY);
  }

  async handleFormSubmit(event) {
    event.preventDefault();

    const prompt = this.state.inputText;
    const model = "text-davinci-002";
    const maxTokens = 60;

    const response = await openai.complete({
      engine: model,
      prompt,
      maxTokens,
      apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Use the API key from the environment variable
    });

    this.setState({ outputText: response.choices[0].text });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Input text:
            <input
              type="text"
              value={this.state.inputText}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <p>Output text: {this.state.outputText}</p>
      </div>
    );
  }
}

export default Home;
