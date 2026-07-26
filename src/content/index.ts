import type { Track } from "@/lib/types";
import { pythonTrack } from "./tracks/python";
import { sqlTrack } from "./tracks/sql";
import { tableauTrack } from "./tracks/tableau";
import { powerBiTrack } from "./tracks/power-bi";
import { fabricTrack } from "./tracks/fabric";
import { excelTrack } from "./tracks/excel";
import { statisticsTrack } from "./tracks/statistics";
import { mlTrack } from "./tracks/machine-learning";
import { rTrack } from "./tracks/r";
import { dataEngineeringTrack } from "./tracks/data-engineering";
import { gitTrack } from "./tracks/git";
import { vizTrack } from "./tracks/data-viz";

/**
 * Tüm patikalar. Sıra, öğrenme sayfasındaki varsayılan sıralamadır:
 * önce en çok kullanılan araçlar, sonra temeller ve ileri konular.
 */
export const tracks: Track[] = [
  sqlTrack,
  pythonTrack,
  powerBiTrack,
  tableauTrack,
  excelTrack,
  fabricTrack,
  statisticsTrack,
  vizTrack,
  mlTrack,
  dataEngineeringTrack,
  rTrack,
  gitTrack,
];

export { projects } from "./projects";
