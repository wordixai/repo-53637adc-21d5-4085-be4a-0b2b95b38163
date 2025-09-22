import { Composition } from 'remotion';
import { TechVideo } from './compositions/TechVideo';
import { CodeRevealDemo } from './compositions/CodeRevealDemo';
import { LogoAnimationDemo } from './compositions/LogoAnimationDemo';
import { KineticTypographyDemo } from './compositions/KineticTypographyDemo';
import { GeometricShapesDemo } from './compositions/GeometricShapesDemo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TechVideo"
        component={TechVideo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Advanced Tech Demo",
          subtitle: "Cutting-edge animations and effects"
        }}
      />
      
      <Composition
        id="CodeReveal"
        component={CodeRevealDemo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      
      <Composition
        id="LogoAnimation"
        component={LogoAnimationDemo}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      
      <Composition
        id="KineticTypography"
        component={KineticTypographyDemo}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      
      <Composition
        id="GeometricShapes"
        component={GeometricShapesDemo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};