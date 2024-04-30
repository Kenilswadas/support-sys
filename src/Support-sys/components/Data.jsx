import React from "react";
const products = [
  { id: "1", name: "Power Analyzer" },
  { id: "2", name: "Transformer Turn Ratio Meter" },
  { id: "3", name: "Oil Breakdown Voltage Tester" },
  { id: "4", name: "Meter" },
  { id: "5", name: "Panels" },
  { id: "6", name: "Digital Iron Loss Tester-VDW" },
  { id: "7", name: "Automatic Digital Epstein Tester-VET" },
  { id: "8", name: "AC High Voltage Tester-VHT" },
  { id: "9", name: "Core Loss Tester-VCL" },
  { id: "10", name: "Holiday Detector-VHD" },
  { id: "11", name: "Vacuum Interrupter Tester-VIT" },
  { id: "12", name: "Single  Sheet Tester - SST" },
  { id: "13", name: "CT Core Tester-VCCT" },
];
const Category = [
  { id: "1", P_id: "1", name: "1 Phase Power Analyzer - VPAe" },
  { id: "2", P_id: "1", name: "3 Phase Precision Power Analyzer - VPA" },
  {
    id: "3",
    P_id: "2",
    name: "3 Phase Automatic Transformer Turn Ratio Meter-VTRM-3A/3B ",
  },
  {
    id: "4",
    P_id: "2",
    name: "3 Phase Automatic Transformer Turn Ratio Meter-VTRM-3C",
  },
  {
    id: "5",
    P_id: "2",
    name: "3 Phase Automatic Transformer Turn Ratio Meter-VTRM-3D",
  },
  {
    id: "6",
    P_id: "2",
    name: "1 Phase Automatic Transformer Turn Ratio Meter-VTRMe",
  },
  {
    id: "7",
    P_id: "2",
    name: "1 Phase Transformer Turn Ratio Meter VTRM-1C",
  },
  {
    id: "8",
    P_id: "2",
    name: "1 Phase Transformer Turn Ratio Meter VTRM-1D",
  },
  {
    id: "9",
    P_id: "3",
    name: "Automatic Oil Breakdown Voltage Tester-VOT",
  },
  {
    id: "10",
    P_id: "3",
    name: "Digital Oil Breakdown Voltage Tester-VOTe",
  },
  {
    id: "11",
    P_id: "4",
    name: "Slip Speed Meter-VSS",
  },
  {
    id: "12",
    P_id: "4",
    name: "Torque Speed Meter-VTS",
  },
  {
    id: "13",
    P_id: "5",
    name: "Transformer Testing Panel-VTTP",
  },
  {
    id: "14",
    P_id: "5",
    name: "Motor Testing Panel-VMTP",
  },
  {
    id: "15",
    P_id: "5",
    name: "Pump Testing Panel-VPTP",
  },
  {
    id: "16",
    P_id: "5",
    name: "Pre Core Loss Testing Panel",
  },
];
const modelnos = [{ name: "A" }, { name: "B" }, { name: "C" }];
const issues = [
  { name: "issue-1", solution: "solution : 1" },
  { name: "issue-2", solution: "solution : 2" },
  { name: "other" },
];
const option = [{ name: "yes" }, { name: "no" }];

export { products, Category, issues, modelnos, option };
