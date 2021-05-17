import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { newQuote, randomColor } from './functions';
import './App.css';

library.add(fab, fas);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.renewQuote = this.renewQuote.bind(this);
    this.state = {
      quote: undefined,
      color: randomColor(),
    }
  }

    async renewQuote() {
      let result = await newQuote();
      this.setState({
        quote: result.data,
        color: randomColor(),
      });
      console.log(result.data);
    }

  render() {
    return (
      <div className="App" style={{background: this.state.color, color: this.state.color}}>
        <header className="App-header">

        </header>
        <div id="quote-box">
          <div id="text">
            <FontAwesomeIcon icon={['fas', 'quote-left']}/>
            {` ${this.state.quote !== undefined ? this.state.quote.content : ''} `}
            <FontAwesomeIcon icon={['fas', 'quote-right']}/>
          </div>
          <div id="author">
            {`- ${this.state.quote !== undefined ? this.state.quote.author : ''} `}
          </div>
          <div id="controls">
            <a id="tweet-quote" target="_blank" rel="noreferrer"
              href="https://twitter.com/intent/tweet"
              style={{ background: this.state.color }}
            >
              <FontAwesomeIcon icon={['fab', 'twitter']}/>
            </a>
            <button id="new-quote" style={{ background: this.state.color }}
              onClick={this.renewQuote}
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  componentDidMount() {
    this.renewQuote();
  }
}

export default App;
