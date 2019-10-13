import React from 'react'

export class ArtistGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
        };
    }

    componentDidMount() {
        fetch(
            "https://api.spotify.com/v1/me/top/artists", {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer XXXX"
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                this.setState({
                    artists: data.items,
                });
            })
    }

    render() {
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
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <img src={this.props.image.url} alt={this.props.name} width={this.props.image.width} height={this.props.image.height}/>
            </div>
        )
    }
}