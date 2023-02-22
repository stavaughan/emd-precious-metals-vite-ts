import React from 'react';

type CustomValue = boolean;

interface HasError {
	hasError?: CustomValue;
}

interface Props {
	children: React.ReactNode;
}
interface ErrorState {
	error?: Error | null;
	errorInfo?: React.ErrorInfo | null;
}

type State = ErrorState & HasError;

class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null
		};
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		this.setState({
			hasError: true,
			error: error,
			errorInfo: errorInfo as Pick<React.ErrorInfo, 'componentStack'>,
		})
	}

	render() {

		if (this.state.hasError) {
			return (
				<div className="container">
					<div className="alert alert-danger" role="alert">
						<h4 className="alert-heading">Error Details</h4>
						<p>{this.state.error && this.state.error?.toString()}</p>
						<hr />
						<pre
							className="overflow-auto p-3"
							style={{
								"height": "100%",
								"backgroundColor": "#233445",
								"color": "#ddd"
							}}
						>
							<code style={{ whiteSpace: 'pre-wrap' }}>
								<h5>Stack Trace:</h5>
								{this.state.errorInfo?.componentStack}
							</code>
						</pre>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary
