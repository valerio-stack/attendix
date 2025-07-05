import { useNavigate } from 'react-router-dom'
import NProgress from 'nprogress'

export default function FirstView() {
    const navigate = useNavigate()

    return (
        <div className='firstView'>
            <div className='textContainer_firstView'>
            <h1>Attendix</h1>
            <p>Manage attendance record easier, less headache to deal with.</p>
            </div>

            <div className='buttonsContainer_firstView'>
            <button onClick={() => {
                NProgress.start()
                navigate('/getStarted')
                NProgress.done()
            }}>
                Get started
            </button>
            </div>
        </div>
    )
}