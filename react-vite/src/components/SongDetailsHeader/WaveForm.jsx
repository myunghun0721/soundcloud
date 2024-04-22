import { useRef, useEffect, useState } from "react";
import WaveSurfer from 'wavesurfer.js'
// import 'dotenv/config'


const WaveForm  = ({ url, isPlaying }) => {
    // Element containing the waveform
    const waveformRef = useRef(null)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')


    // Element containing audio wave
    const wavesurferRef = useRef(null)

    //
    const [isReady, setIsReady] = useState(false)
    let backendUrl;

        if (import.meta.env.MODE === 'production') {
            backendUrl = 'https://soundcloud-project-m0ku.onrender.com'; // Production URL
        } else {
            backendUrl = 'http://localhost:8000'; // Development URL
        }

    // console.log(url)
    // fetch the audio by using backend server at middle man to avoid cors policy
    const audioUrl = `${backendUrl}/fetch-audio?url=${encodeURIComponent(url)}`
    console.log(import.meta.env.VITE_BACKEND_URL)
    console.log(import.meta.env)
    // Define the waveform gradient
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
gradient.addColorStop(0, '#656666') // Top color
gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
gradient.addColorStop(1, '#B1B1B1') // Bottom color

// Define the progress gradient
const progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
progressGradient.addColorStop(0, '#EE772F') // Top color
progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926') // Top color
progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094') // Bottom color
progressGradient.addColorStop(1, '#F6B094') // Bottom color

    useEffect(() => {
        // Create a WaveSurfer instance

        wavesurferRef.current = WaveSurfer.create({
            container: waveformRef.current, //
            minPxPerSec:50,
            waveColor: gradient,
            progressColor: progressGradient,
            barWidth: 3
        })

        wavesurferRef.current.once('ready', () => {
            setIsReady(true)
        })

        // Load the audio file from the URL prop
        wavesurferRef.current.load(audioUrl)

        wavesurferRef.current.on('ready', () => {
            if(isPlaying) {
                wavesurferRef.current.play()
            }
        })

        // clean up function
        // so the audio wont stack
        return () => wavesurferRef.current.destroy();


    }, []) // by using the useEffect when the url change it will trigger re-render
    useEffect (() => {
        if(isReady) {
            isPlaying ? wavesurferRef.current.play() : wavesurferRef.current.pause()
        }

    },[isPlaying,isReady])


    return (
        <div className="waveform-container">
            <div id="waveform" ref={waveformRef}></div>
            {/* <button onClick={handlePlayPause} disabled={!isReady}>
                {isReady ? 'Play/Pause' : 'Loading...'}
            </button> */}
        </div>
    )



}

export default WaveForm
