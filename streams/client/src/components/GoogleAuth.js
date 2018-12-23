import React from 'react';

class GoogleAuth extends React.Component {
    state = {
        isSignedIn: null
    };
    // google restricts gapi because of the amount of people using it, because of it was must load it through componentDidMount to load it manually and using window for scope.
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '11648960831-ng4iufb7l7ga8ommnllmv8pej51a8q57.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    };

    onAuthChange = () => {
        this.setState({isSignedIn: this.auth.isSignedIn.get() });
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return <button>I don't know if we are signed in</button>
        } else if (this.state.isSignedIn) {
            return <button>I am signed in</button>
        } else {
            return <button>I am not signed in.</button>
        }
    }

    render() {
        return (
            <div className="item">{this.renderAuthButton()}</div>
        )
    };
}

export default GoogleAuth;