import React from 'react'
import styled from 'styled-components'
import KnockoutText from './KnockoutText'


class AudioPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.songList = [null]
        this.currentCue = 0
        this.initialized = false
        this.state = {
            currentSong: this.songList[this.currentCue]
        }
    }

    componentDidMount() {
        fetch('./playlist/playlist.json').then(response => {
            return response.json();
        }).then(data => {
            this.songList = data.tracks
            this.setState({
                currentSong: this.songList[this.currentCue]
            })
        }).catch(err => {
            console.log("Error Reading data " + err);
        });
    }

    componentWillUnmount() {
        this.playerEl.removeEventListener("ended", this.endHandler)
    }

    componentDidUpdate() {
        if (this.initialized === false && this.state.currentSong !== null) this.initialize()
    }

    initialize = () => {
        // console.log("initialize only once")
        this.initialized = true
        this.playerEl = document.getElementById('player')
        this.endHandler = x => this.next_btnHandler()
        this.playerEl.addEventListener('ended', this.endHandler)
    }

    play_btnHandler = () => {
        this.playerEl.play()
    }

    pause_btnHandler = () => {
        this.playerEl.pause()
    }

    volUp_btnHandler = () => {
        const newVolume = this.playerEl.volume === 1 ? 1 : Math.round(this.playerEl.volume * 10 + 1) / 10
        console.log("newVolume", newVolume)
        this.playerEl.volume = newVolume
    }

    volDown_btnHandler = () => {
        const newVolume = this.playerEl.volume === 0 ? 0 : Math.round(this.playerEl.volume * 10 - 1) / 10
        console.log("newVolume", newVolume)
        this.playerEl.volume = newVolume
    }

    prev_btnHandler = () => {
        this.currentCue = (this.currentCue + (this.songList.length - 1)) % this.songList.length
        this.changeSong()
    }

    next_btnHandler = (cue) => {
        this.currentCue = (typeof cue !== 'number') ? (this.currentCue + 1) % this.songList.length : cue
        this.changeSong()
    }

    changeSong = () => {
        this.setState({
            currentSong: this.songList[this.currentCue]
        })
        this.playerEl.src = this.songList[this.currentCue].URL
    }

    render() {
        // console.log("this.state.currentSong", this.state.currentSong)
        if (this.state.currentSong === null) return <h1>loading</h1>

        return (
            <Container>
                <KnockoutText ID="React_knockout" txt="REACT"
                    fontSize="90px" offset_x="" offset_y="100%"
                    src="https://media3.giphy.com/media/5UH51qWQaShz7KCug8/giphy.gif"
                />

                <Title >AudioPlayer</Title>

                <KnockoutText ID="AudioPlayer_knockout" txt={this.state.currentSong.title}
                    fontSize="50px" offset_x="" offset_y="-140" colorOverlay={true}
                    src="https://media.giphy.com/media/l49FlFL6PPPxYKNEs/giphy.gif"

                />

                <ArtistName>by {this.state.currentSong.artist}</ArtistName>

                <audio controls autoPlay id="player" src={this.songList[this.currentCue].URL} ></audio>

                <Controls>
                    <button onClick={this.play_btnHandler} className="button-start">Play</button>
                    <button onClick={this.pause_btnHandler}>Pause</button>
                    <button onClick={this.volUp_btnHandler}>Vol+ </button>
                    <button onClick={this.volDown_btnHandler}>Vol- </button>
                    <button onClick={this.prev_btnHandler}>Previous</button>
                    <button onClick={this.next_btnHandler} className="button-end">Next</button>
                </Controls>

                <Playlist>
                    <SongList>
                        {this.songList.map((song, i) => (
                            <SongListItem key={"k" + i} onClick={() => this.next_btnHandler(i)} >
                                <td className="playIndicator" > {i === this.currentCue && ">"} </td>
                                <td> {song.title} </td>
                                <td>  by {song.artist} </td>
                            </SongListItem>
                        ))}
                    </SongList>
                </Playlist>

                <Credit>Simple audio player example built in React Copyright 2019 Joseph B Howard</Credit>
            </Container>
        )
    }
}

export default AudioPlayer


const Title = styled.h1`
    margin-top: 0;
`
const ArtistName = styled.h5`
    margin-top: 0
`
const Credit = styled.p`
    font-size: 0.85rem;
`
const Playlist = styled.table`
    width: 100%;
    margin-top: 3rem;
    margin-bottom: 3rem;
`
const SongList = styled.tbody``
const SongListItem = styled.tr`
    cursor: pointer;
    display: flex;
    justify-content: flex-start;       
    color: #2288fe;
    :hover {
        color: white;
    }
    justify-content: space-between;
    .playIndicator {
        width: 2rem;
    }
`
const Container = styled.div`
    margin: 2rem;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: inset 0 0 5px 5px #233498;
    background: linear-gradient(180deg, black, #243968);
`
const Controls = styled.div`
    margin-top: 1.5rem;
    padding: 1rem;
    border-radius: 2rem;
    box-shadow:  0 0 5px 5px #2439c8;
    // background: linear-gradient(0deg, black, transparent);
    background: url("https://media3.giphy.com/media/5UH51qWQaShz7KCug8/giphy.gif");
    background-size: cover;
    background-position: 0px 300px ;
    display: flex;
    justify-content: center;
    .button-start {
        border-radius: 1rem 0 0 1rem;
    }
    .button-end {
        border-radius: 0 1rem 1rem 0;
    }
    button {
        box-shadow: inset 0 0 3px 3px #4354f8;
        border: 0;
        color: #aaaaff;
        background: linear-gradient(0deg, #233498, black);
        font-size: 2rem;
        padding-left: 1rem;
        padding-right: 1rem;    
        :hover {
            color: white;
        }
    }
`
