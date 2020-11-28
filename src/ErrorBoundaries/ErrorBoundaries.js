import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

	static getDerivedStateFromError (error) {
		return { hasError: true}
	}

  componentDidCatch(error) {
		console.log(error);
	}

  render() {
    if (this.state.hasError) {
			return (
				<>
				<h1>Something went wrong</h1>
				<h2>Return to the <a href='/'>Homescreen</a></h2>
				</>
			);
		}
    return this.props.children;
  }
}
