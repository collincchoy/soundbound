import React from 'react';
import {spotify} from './auth';

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageUrl: "",
        }
    }
    componentDidMount() {
        spotify.fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {},
        }).then((data) => {
            console.log(data);
            this.setState({
                name: data.display_name,
                imageUrl: data.images[0].url,
            });
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.name}</h1>
                <img src={this.state.imageUrl} alt="Profile" />
            </div>
        );
    }
}