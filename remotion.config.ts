/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
// Melhor qualidade (pedido do dono): quadros em PNG (sem perda, em vez de JPEG 80), CRF 14 e preset "slow" no x264.
Config.setVideoImageFormat("png");
Config.setCrf(14);
Config.setX264Preset("slow");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);
