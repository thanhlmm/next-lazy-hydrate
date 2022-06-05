import Lottie from 'react-lottie';
import * as animationData from './107267-meta.json';

const Animation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div style={{ padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <h2>Test animation which load huge amount of JavaScript</h2>
      <Lottie options={defaultOptions}
        height={400}
        width={400} />
    </div>
  )
}

export default Animation;
