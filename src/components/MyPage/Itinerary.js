import { useEffect } from 'react'
import Event from './Event'

const Itinerary = ({ profile }) => {
useEffect(() => console.log("Itinerary Rendered"))
let today = new Date().toLocaleDateString()

return (
    <div>
            <div style={{ margin:'5%', display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center' }}>
                <h2 style={{ borderBottom:'1px solid rgb(211,211,211)' }}>itinerary</h2>
                <h2> {today} </h2>
            </div>
            <div style={{margin:'5%', height:'80%', display:'flex', flexDirection:'column', alignItems:'center' }}>
                {profile.events.length > 0 ?
                    profile.events.map(event => <Event event={event} key={event._id}/>)
                    : <div>no events right now, send someone an invite!</div>
                }
            </div>
    </div>
)
}

export default Itinerary