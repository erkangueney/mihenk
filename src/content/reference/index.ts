import type { ReferenceGroup } from "@/lib/types";
import { excelReference } from "./excel";
import { gitReference } from "./git";
import { powerBiReference } from "./power-bi";
import { pythonReference } from "./python";
import { sqlReference } from "./sql";
import { tableauReference } from "./tableau";

/**
 * Referans grupları — menüde ve listede bu sırayla görünür.
 * En çok aranan araçlar önde.
 */
export const referenceGroups: ReferenceGroup[] = [
  sqlReference,
  pythonReference,
  excelReference,
  powerBiReference,
  tableauReference,
  gitReference,
];
