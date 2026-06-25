/* Drilling Toolkit — calculation engines */
(function () {
'use strict';

function nozzleTFA(nozzles) {
  // nozzles: array of diameters in 1/32 inch
  const tfa = nozzles.reduce((sum, n) => {
    const d = n / 32;
    return sum + (Math.PI / 4) * d * d;
  }, 0);
  return { tfa, tfaMm2: tfa * 645.16, count: nozzles.length };
}

function nozzleFromTFA(tfaIn2, count = 3) {
  const d = Math.sqrt((tfaIn2 * 4) / (Math.PI * count));
  return { diameter32: d * 32, diameterIn: d };
}

function mudPumpDisplacement(cylinders, boreMm, strokeMm, spm, efficiency = 0.95) {
  const boreM = boreMm / 1000;
  const strokeM = strokeMm / 1000;
  const volPerStroke = cylinders * (Math.PI / 4) * boreM * boreM * strokeM;
  const lps = (volPerStroke * spm * efficiency) / 60;
  return {
    lps,
    gpm: lps / 0.06309,
    m3min: lps / 16.667,
    volPerStroke: volPerStroke * 1000,
  };
}

function casingBurst(wallMm, yieldMpa, odMm, safety = 1.1) {
  const t = wallMm;
  const d = odMm;
  const burst = (2 * yieldMpa * t) / d;
  return { burst, safeBurst: burst / safety };
}

function casingCollapse(wallMm, yieldMpa, odMm, idMm, safety = 1.1) {
  const t = wallMm;
  const d = odMm;
  const e = d / t;
  const collapse =
    yieldMpa * ((e * e - 1) / (e * e + 1)) * (2 / Math.sqrt(3));
  return { collapse, safeCollapse: collapse / safety };
}

function casingTension(areaMm2, yieldMpa, safety = 1.6) {
  const tension = (areaMm2 * yieldMpa) / 1000;
  return { tension, safeTension: tension / safety };
}

function drillpipeTorsion(odMm, idMm, yieldMpa, safety = 1.5) {
  const J = (Math.PI / 32) * (Math.pow(odMm, 4) - Math.pow(idMm, 4));
  const torque = (J * yieldMpa) / (odMm * 1000 * safety);
  return { torque, J };
}

function drillpipeTension(areaMm2, yieldMpa, safety = 1.5) {
  const tension = (areaMm2 * yieldMpa) / 1000;
  return { tension, safeTension: tension / safety };
}

function wireRopeLoad(diameterMm, grade = '1770', safety = 5) {
  const grades = { 1770: 1770, 1960: 1960, 2160: 2160 };
  const tensile = grades[grade] || 1770;
  const area = Math.PI * Math.pow(diameterMm / 2, 2);
  const breaking = (area * tensile) / 1000;
  return { breaking, working: breaking / safety, area };
}

function makeupTorque(odIn, factor = 0.2, yieldKsi = 75) {
  // simplified API RP 7G style: T = factor × Y × A × OD
  const od = odIn;
  const area = Math.PI * Math.pow(od * 0.8, 2) / 4;
  const torque = factor * yieldKsi * 1000 * area * od / 12;
  return { torque: torque / 1000, torqueFtLbf: torque };
}

function convertUnit(value, fromFactor, toFactor) {
  const base = value * fromFactor;
  return base / toFactor;
}

function decodeIADC(code) {
  const s = String(code).replace(/\D/g, '').padStart(3, '0').slice(0, 3);
  const [a, b, c] = s.split('');
  return { series: a, formation: b, feature: c, code: s };
}

function pipeArea(odMm, idMm) {
  return (Math.PI / 4) * (odMm * odMm - idMm * idMm);
}

function fromApiGravity(api) {
  const sg = 141.5 / (api + 131.5);
  return { api, sg, densityGcm3: sg };
}

function apiFromGravity(sg) {
  const api = 141.5 / sg - 131.5;
  return { api, sg, densityGcm3: sg };
}

window.DTCalc = {
  nozzleTFA,
  nozzleFromTFA,
  mudPumpDisplacement,
  casingBurst,
  casingCollapse,
  casingTension,
  drillpipeTorsion,
  drillpipeTension,
  wireRopeLoad,
  makeupTorque,
  convertUnit,
  decodeIADC,
  pipeArea,
  fromApiGravity,
  apiFromGravity,
};
})();
