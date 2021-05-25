import Graph from '../Graph/Graph';
import { Fade } from 'react-reveal';

const Percentile = () => {
    return (
        <div className="percentile-container center tc">
            <Fade top delay={600}>
                <h2 className="f2">Percentile</h2>
            </Fade>
            <Fade delay={700}>
                <div className="percentile-graph">
                    <Graph />
                </div>
            </Fade>
        </div>
    )
}

export default Percentile;