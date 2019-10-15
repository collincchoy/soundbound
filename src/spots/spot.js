import React from 'react'
import {spotify} from './auth'

export class ArtistGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
        };
    }

    componentDidMount() {
        spotify.fetch("https://api.spotify.com/v1/me/top/artists", {
            method: 'GET',
            headers: {},
        }).then((data) => {
            if (data.error) {
                this.setState({
                    errors: data.error,
                });
            }
            console.log(data);
            this.setState({
                artists: data.items,
            });
        }).catch((error)=>this.setState({errors: error}));
    }

    render() {
        if (this.state.errors) {
            if (this.state.errors.status === 401) {
                return (
                    <section>
                        Oops you need to authorize this app:
                        <a href={spotify.authorizeUrl}>Click here to authorize.</a>
                    </section>);
            }
            return <section>Uh oh. An Error Occurred: {this.state.errors.status} {this.state.errors.message}</section>
        }
        return (
            <section>
                {this.state.artists.map((artist) => {
                    return <ArtistCard name={artist.name} image={artist.images[2]}/>
                })}
            </section>
        );
    }
}

class ArtistCard extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <img src={this.props.image.url} alt={this.props.name} width={this.props.image.width} height={this.props.image.height}/>
            </div>
        )
    }
}