import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setPixelFormat('yuv420p');
Config.setConcurrency(1);
Config.setFrameRange([0, 300]); // 10 seconds at 30fps

export default Config;