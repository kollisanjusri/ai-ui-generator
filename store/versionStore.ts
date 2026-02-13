import { UIPlan } from "@/types/plan";

let versions: UIPlan[] = [];

export function addVersion(plan: UIPlan) {
  versions.push(plan);
}

export function getVersions() {
  return versions;
}

export function getVersion(index: number) {
  return versions[index];
}

export function clearVersions() {
  versions = [];
}
