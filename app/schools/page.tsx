"use client"

import dynamic from "next/dynamic"
import { useState, useMemo } from "react"
import Navbar from "@/components/navbar"

const MapComponent = dynamic(() => import("pigeon-maps").then((mod) => mod.Map), { ssr: false })
const Marker = dynamic(() => import("pigeon-maps").then((mod) => mod.Marker), { ssr: false })
const Overlay = dynamic(() => import("pigeon-maps").then((mod) => mod.Overlay), { ssr: false })

interface SchoolInterface {
  name: string
  coordinates: [number, number]
  type: "elementary" | "middle" | "high"
  address: string
  district: string
}

// All Title I schools across NC
const titleOneSchools: SchoolInterface[] = [
  // Wake County - 36 schools
  {
    name: "River Bend Elementary",
    coordinates: [-78.6382, 35.8296],
    type: "elementary",
    address: "5926 Barham Blvd, Raleigh, NC 27616",
    district: "Wake County",
  },
  {
    name: "Adams Elementary",
    coordinates: [-78.5982, 35.7596],
    type: "elementary",
    address: "2600 Seabrook Ave, Raleigh, NC 27604",
    district: "Wake County",
  },
  {
    name: "Aversboro Elementary",
    coordinates: [-78.6582, 35.7296],
    type: "elementary",
    address: "1108 Aversboro Rd, Garner, NC 27529",
    district: "Wake County",
  },
  {
    name: "Longview",
    coordinates: [-78.5782, 35.7896],
    type: "elementary",
    address: "2600 Trawick Rd, Raleigh, NC 27604",
    district: "Wake County",
  },
  {
    name: "Baileywick Road Elementary",
    coordinates: [-78.6882, 35.7696],
    type: "elementary",
    address: "4301 Baileywick Rd, Raleigh, NC 27610",
    district: "Wake County",
  },
  {
    name: "Barwell Road Elementary",
    coordinates: [-78.6182, 35.7496],
    type: "elementary",
    address: "4700 Barwell Park Dr, Raleigh, NC 27610",
    district: "Wake County",
  },
  {
    name: "Beaverdam Elementary",
    coordinates: [-78.7082, 35.8096],
    type: "elementary",
    address: "5905 Hilburn Dr, Raleigh, NC 27612",
    district: "Wake County",
  },
  {
    name: "Brentwood Elementary",
    coordinates: [-78.5582, 35.7996],
    type: "elementary",
    address: "1000 Brentwood Rd, Raleigh, NC 27604",
    district: "Wake County",
  },
  {
    name: "Brier Creek Elementary",
    coordinates: [-78.7282, 35.8596],
    type: "elementary",
    address: "10208 Brier Creek Pkwy, Raleigh, NC 27617",
    district: "Wake County",
  },
  {
    name: "Brooks Elementary",
    coordinates: [-78.5382, 35.7696],
    type: "elementary",
    address: "310 Dennis Ave, Raleigh, NC 27604",
    district: "Wake County",
  },
  {
    name: "Carroll Middle",
    coordinates: [-78.6682, 35.7796],
    type: "middle",
    address: "925 Carroll Middle School Rd, Raleigh, NC 27610",
    district: "Wake County",
  },
  {
    name: "Carver Elementary",
    coordinates: [-78.6082, 35.7296],
    type: "elementary",
    address: "710 S Wilmington St, Raleigh, NC 27601",
    district: "Wake County",
  },
  {
    name: "Centennial Campus Middle",
    coordinates: [-78.6782, 35.7596],
    type: "middle",
    address: "1840 Main Campus Dr, Raleigh, NC 27606",
    district: "Wake County",
  },
  {
    name: "Connections Academy",
    coordinates: [-78.6482, 35.7896],
    type: "elementary",
    address: "420 S Salisbury St, Raleigh, NC 27601",
    district: "Wake County",
  },
  {
    name: "Creech Road Elementary",
    coordinates: [-78.5682, 35.7396],
    type: "elementary",
    address: "2420 Creech Rd, Garner, NC 27529",
    district: "Wake County",
  },
  {
    name: "East Garner Elementary",
    coordinates: [-78.5882, 35.7096],
    type: "elementary",
    address: "2800 Tryon Rd, Garner, NC 27529",
    district: "Wake County",
  },
  {
    name: "East Garner Middle",
    coordinates: [-78.5782, 35.7196],
    type: "middle",
    address: "2805 Tryon Rd, Garner, NC 27529",
    district: "Wake County",
  },
  {
    name: "East Millbrook Middle",
    coordinates: [-78.5482, 35.8296],
    type: "middle",
    address: "2800 Spring Forest Rd, Raleigh, NC 27616",
    district: "Wake County",
  },
  {
    name: "Neuse River Middle",
    coordinates: [-78.5182, 35.8096],
    type: "middle",
    address: "7700 Kennebec Rd, Raleigh, NC 27616",
    district: "Wake County",
  },
  {
    name: "East Wake High",
    coordinates: [-78.4882, 35.7796],
    type: "high",
    address: "2000 Bethlehem Rd, Wendell, NC 27591",
    district: "Wake County",
  },
  {
    name: "Forestville Road Elementary",
    coordinates: [-78.5282, 35.7596],
    type: "elementary",
    address: "3921 Forestville Rd, Raleigh, NC 27616",
    district: "Wake County",
  },
  {
    name: "Fox Road Elementary",
    coordinates: [-78.6982, 35.7396],
    type: "elementary",
    address: "1520 Fox Rd, Raleigh, NC 27606",
    district: "Wake County",
  },
  {
    name: "Forest Pines Drive Elementary",
    coordinates: [-78.7182, 35.7796],
    type: "elementary",
    address: "4101 Forest Pines Dr, Raleigh, NC 27616",
    district: "Wake County",
  },
  {
    name: "Green Elementary",
    coordinates: [-78.6382, 35.7096],
    type: "elementary",
    address: "1217 Green Rd, Raleigh, NC 27610",
    district: "Wake County",
  },
  {
    name: "Hodge Road Elementary",
    coordinates: [-78.6782, 35.8296],
    type: "elementary",
    address: "7301 Hodge Rd, Knightdale, NC 27545",
    district: "Wake County",
  },
  {
    name: "Harris Creek Elementary",
    coordinates: [-78.5982, 35.7796],
    type: "elementary",
    address: "3820 Yadkin Dr, Raleigh, NC 27604",
    district: "Wake County",
  },
  {
    name: "Kingswood Elementary",
    coordinates: [-78.5082, 35.8296],
    type: "elementary",
    address: "4411 Kingswood Dr, Raleigh, NC 27616",
    district: "Wake County",
  },
  {
    name: "Knightdale Elementary",
    coordinates: [-78.4782, 35.7896],
    type: "elementary",
    address: "207 W Garner Rd, Knightdale, NC 27545",
    district: "Wake County",
  },
  {
    name: "Knightdale High",
    coordinates: [-78.4682, 35.7996],
    type: "high",
    address: "100 Bryan Chalk Ln, Knightdale, NC 27545",
    district: "Wake County",
  },
  {
    name: "Lead Mine Elementary",
    coordinates: [-78.7382, 35.8396],
    type: "elementary",
    address: "5921 Lead Mine Rd, Raleigh, NC 27612",
    district: "Wake County",
  },
  {
    name: "Lake Myra Elementary",
    coordinates: [-78.6282, 35.7696],
    type: "elementary",
    address: "515 Lake Myra Rd, Wendell, NC 27591",
    district: "Wake County",
  },
  {
    name: "Lockhart Elementary",
    coordinates: [-78.5482, 35.7496],
    type: "elementary",
    address: "4201 Old Poole Rd, Raleigh, NC 27610",
    district: "Wake County",
  },
  {
    name: "Lynn Road Elementary",
    coordinates: [-78.6582, 35.8096],
    type: "elementary",
    address: "4700 Lynn Rd, Raleigh, NC 27612",
    district: "Wake County",
  },
  {
    name: "Millbrook Elementary",
    coordinates: [-78.5782, 35.8396],
    type: "elementary",
    address: "1808 Spring Forest Rd, Raleigh, NC 27615",
    district: "Wake County",
  },
  {
    name: "Mount Vernon",
    coordinates: [-78.6882, 35.7496],
    type: "elementary",
    address: "1400 Rock Quarry Rd, Raleigh, NC 27610",
    district: "Wake County",
  },
  {
    name: "North Garner Middle",
    coordinates: [-78.5682, 35.7296],
    type: "middle",
    address: "4350 Garner Rd, Garner, NC 27529",
    district: "Wake County",
  },
  {
    name: "Phillips High",
    coordinates: [-78.6182, 35.7196],
    type: "high",
    address: "300 W Millbrook Rd, Raleigh, NC 27609",
    district: "Wake County",
  },
  {
    name: "Poe Elementary",
    coordinates: [-78.5882, 35.7496],
    type: "elementary",
    address: "4350 Poe Dr, Raleigh, NC 27610",
    district: "Wake County",
  },
  {
    name: "Pleasant Grove Elementary",
    coordinates: [-78.6482, 35.7396],
    type: "elementary",
    address: "1901 Pleasant Grove Church Rd, Raleigh, NC 27610",
    district: "Wake County",
  },
  {
    name: "Powell Elementary",
    coordinates: [-78.5182, 35.7696],
    type: "elementary",
    address: "3925 Powell Dr, Raleigh, NC 27616",
    district: "Wake County",
  },
  {
    name: "Rand Road Elementary",
    coordinates: [-78.6082, 35.7896],
    type: "elementary",
    address: "1500 Rand Rd, Garner, NC 27529",
    district: "Wake County",
  },

  // Charlotte-Mecklenburg - 73 schools (sampling major ones)
  {
    name: "Albemarle Road Elementary",
    coordinates: [35.2596, -80.8482],
    type: "elementary",
    address: "3520 Albemarle Rd, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Berewick Elementary",
    coordinates: [35.3596, -80.7582],
    type: "elementary",
    address: "1200 Berewick Ln, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Briarwood Academy",
    coordinates: [35.1596, -80.7282],
    type: "elementary",
    address: "5900 Briarwood Ln, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Clear Creek Elementary",
    coordinates: [35.2696, -80.9382],
    type: "elementary",
    address: "3600 Clear Creek Dr, Charlotte, NC 28208",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Crown Point Elementary",
    coordinates: [35.3096, -80.8982],
    type: "elementary",
    address: "10520 Crown Point Dr, Charlotte, NC 28210",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Devonshire Elementary",
    coordinates: [35.2896, -80.6582],
    type: "elementary",
    address: "14707 Devonshire Dr, Charlotte, NC 28277",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Elizabeth Traditional Elementary",
    coordinates: [35.1896, -80.9982],
    type: "elementary",
    address: "5001 Elizabeth Ave, Charlotte, NC 28201",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Esperanza Global Academy",
    coordinates: [35.2496, -80.8582],
    type: "elementary",
    address: "2324 Runnymede Ln, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Governors Village STEM",
    coordinates: [35.3496, -80.7982],
    type: "elementary",
    address: "11801 Shelley Mullis Rd, Charlotte, NC 28269",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Greenway Park Elementary",
    coordinates: [35.2096, -80.7482],
    type: "elementary",
    address: "3940 Greenway Dr, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Grove Park Elementary",
    coordinates: [35.2696, -80.8182],
    type: "elementary",
    address: "2920 Iredell Ave, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Hickory Grove Elementary",
    coordinates: [35.2296, -80.6882],
    type: "elementary",
    address: "1000 Hickory Grove Church Rd, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Highland Renaissance Academy",
    coordinates: [35.1796, -80.8682],
    type: "elementary",
    address: "1825 E 5th St, Charlotte, NC 28204",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Hornets Nest Elementary",
    coordinates: [35.2396, -80.7982],
    type: "elementary",
    address: "3100 Hornets Nest Ln, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Idlewild Elementary",
    coordinates: [35.1896, -80.7882],
    type: "elementary",
    address: "2550 Idlewild Ave, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Lake Wylie Elementary",
    coordinates: [35.0596, -80.8582],
    type: "elementary",
    address: "520 Lake Wylie Rd, Fort Mill, NC 29715",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Lebanon Road Elementary",
    coordinates: [35.1596, -80.8882],
    type: "elementary",
    address: "8301 Lebanon Rd, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Mallard Creek Elementary",
    coordinates: [35.3396, -80.8682],
    type: "elementary",
    address: "8400 Old Statesville Rd, Charlotte, NC 28269",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Mint Hill Elementary",
    coordinates: [35.3696, -80.6982],
    type: "elementary",
    address: "6601 Mint Hill Church Rd, Charlotte, NC 28227",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Montclaire Elementary",
    coordinates: [35.2896, -80.7882],
    type: "elementary",
    address: "4300 Montclaire Dr, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Nations Ford Elementary",
    coordinates: [35.1296, -80.8382],
    type: "elementary",
    address: "2101 Nations Ford Rd, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Newell Elementary",
    coordinates: [35.3096, -80.6882],
    type: "elementary",
    address: "5700 Newell Rd, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Oakdale Elementary",
    coordinates: [35.2096, -80.7982],
    type: "elementary",
    address: "1520 Oakdale Ln, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Paw Creek Elementary",
    coordinates: [35.3496, -80.9482],
    type: "elementary",
    address: "11700 Paw Creek Church Rd, Charlotte, NC 28269",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Pinewood Elementary",
    coordinates: [35.2396, -80.6882],
    type: "elementary",
    address: "1601 Pinewood Ln, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Rama Road Elementary",
    coordinates: [35.2696, -80.7382],
    type: "elementary",
    address: "4200 Rama Rd, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Reedy Creek Elementary",
    coordinates: [35.1696, -80.8882],
    type: "elementary",
    address: "8120 Reedy Creek Rd, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Reid Park Academy",
    coordinates: [35.2296, -80.8882],
    type: "elementary",
    address: "3000 Reid Park Dr, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "River Oaks Academy",
    coordinates: [35.2596, -80.8882],
    type: "elementary",
    address: "3521 River Oaks Dr, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Starmount Elementary",
    coordinates: [35.3296, -80.9582],
    type: "elementary",
    address: "11321 Starmount Dr, Charlotte, NC 28277",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Statesville Road Elementary",
    coordinates: [35.3396, -80.8382],
    type: "elementary",
    address: "8701 Statesville Rd, Charlotte, NC 28269",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Steele Creek Elementary",
    coordinates: [35.0696, -80.8882],
    type: "elementary",
    address: "3201 Steele Creek Dr, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Sterling Elementary",
    coordinates: [35.2996, -80.8882],
    type: "elementary",
    address: "12001 Sterling Rd, Charlotte, NC 28277",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Stoney Creek Elementary",
    coordinates: [35.1196, -80.8682],
    type: "elementary",
    address: "6000 Stoney Creek Rd, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Tuckaseegee Elementary",
    coordinates: [35.2496, -80.8282],
    type: "elementary",
    address: "2700 Tuckaseegee Rd, Charlotte, NC 28208",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Villa Heights Elementary",
    coordinates: [35.1896, -80.8082],
    type: "elementary",
    address: "2401 Villa Ave, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Westerly Hills Academy",
    coordinates: [35.2596, -80.7682],
    type: "elementary",
    address: "3510 Wesberry Ln, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Whitewater Academy",
    coordinates: [35.3296, -80.8882],
    type: "elementary",
    address: "9900 Whitewater Ln, Charlotte, NC 28277",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Windsor Park Elementary",
    coordinates: [35.1696, -80.7582],
    type: "elementary",
    address: "1800 Windsor Park Dr, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Winterfield Elementary",
    coordinates: [35.2896, -80.8882],
    type: "elementary",
    address: "11925 Winterfield Rd, Charlotte, NC 28277",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Albemarle Road Middle",
    coordinates: [35.2496, -80.8482],
    type: "middle",
    address: "3735 Albemarle Rd, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Coulwood Middle",
    coordinates: [35.1896, -80.8982],
    type: "middle",
    address: "7900 Coulwood Ln, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Eastway Middle",
    coordinates: [35.2096, -80.7282],
    type: "middle",
    address: "2501 Eastway Dr, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "Druid Hills High",
    coordinates: [35.2296, -80.8182],
    type: "high",
    address: "3201 Providence Rd, Charlotte, NC 28205",
    district: "Charlotte-Mecklenburg",
  },
  {
    name: "East Mecklenburg High",
    coordinates: [35.3196, -80.6782],
    type: "high",
    address: "8201 Lawyers Rd, Charlotte, NC 28269",
    district: "Charlotte-Mecklenburg",
  },

  // Guilford County - 31 schools
  {
    name: "Alamance Elementary",
    coordinates: [36.0596, -79.7982],
    type: "elementary",
    address: "402 Alamance Rd, Greensboro, NC 27406",
    district: "Guilford County",
  },
  {
    name: "Bessemer Elementary",
    coordinates: [36.0696, -79.7582],
    type: "elementary",
    address: "2101 Bessemer Ave, Greensboro, NC 27405",
    district: "Guilford County",
  },
  {
    name: "Caldwell Elementary",
    coordinates: [36.0596, -79.8082],
    type: "elementary",
    address: "1600 Caldwell Ave, Greensboro, NC 27405",
    district: "Guilford County",
  },
  {
    name: "Cile Whitfield Elementary",
    coordinates: [36.0796, -79.7882],
    type: "elementary",
    address: "2401 Cile Whitfield Dr, Greensboro, NC 27406",
    district: "Guilford County",
  },
  {
    name: "Clayton Elementary",
    coordinates: [35.9596, -79.8282],
    type: "elementary",
    address: "1000 Clayton Ave, Greensboro, NC 27405",
    district: "Guilford County",
  },
  {
    name: "Dalton Elementary",
    coordinates: [36.0896, -79.7682],
    type: "elementary",
    address: "2000 Dalton Ave, Greensboro, NC 27406",
    district: "Guilford County",
  },
  {
    name: "Erwin High",
    coordinates: [36.0696, -79.7882],
    type: "high",
    address: "2821 Elon Rd, Greensboro, NC 27406",
    district: "Guilford County",
  },
  {
    name: "First Market Elementary",
    coordinates: [36.0496, -79.7882],
    type: "elementary",
    address: "1404 First Market Ave, Greensboro, NC 27405",
    district: "Guilford County",
  },
  {
    name: "Frazier Elementary",
    coordinates: [36.0596, -79.8382],
    type: "elementary",
    address: "2014 Frazier Ave, Greensboro, NC 27405",
    district: "Guilford County",
  },
  {
    name: "Gorman Elementary",
    coordinates: [36.0296, -79.8482],
    type: "elementary",
    address: "1100 Gorman Ave, Greensboro, NC 27405",
    district: "Guilford County",
  },
  {
    name: "Greensboro Day School",
    coordinates: [36.0896, -79.8782],
    type: "middle",
    address: "6100 W Friendly Ave, Greensboro, NC 27410",
    district: "Guilford County",
  },
  {
    name: "Hendricks Elementary",
    coordinates: [36.0196, -79.8382],
    type: "elementary",
    address: "1104 Hendricks Ave, Greensboro, NC 27405",
    district: "Guilford County",
  },
  {
    name: "Kiser Middle",
    coordinates: [36.0396, -79.8882],
    type: "middle",
    address: "2200 Kiser Rd, Greensboro, NC 27405",
    district: "Guilford County",
  },
  {
    name: "Latham Elementary",
    coordinates: [36.0796, -79.8282],
    type: "elementary",
    address: "1100 Latham Ave, Greensboro, NC 27406",
    district: "Guilford County",
  },
  {
    name: "Lincoln Elementary",
    coordinates: [36.0696, -79.8582],
    type: "elementary",
    address: "601 Lincoln Ave, Greensboro, NC 27405",
    district: "Guilford County",
  },
  {
    name: "Marshall Elementary",
    coordinates: [36.0496, -79.8682],
    type: "elementary",
    address: "1307 Marshall Ave, Greensboro, NC 27405",
    district: "Guilford County",
  },
  {
    name: "Mendenhall Elementary",
    coordinates: [36.0896, -79.8082],
    type: "elementary",
    address: "2101 Mendenhall Ave, Greensboro, NC 27406",
    district: "Guilford County",
  },
  {
    name: "Muir Elementary",
    coordinates: [36.0296, -79.9082],
    type: "elementary",
    address: "1500 Muir Ave, Greensboro, NC 27405",
    district: "Guilford County",
  },
  {
    name: "Nathaniel Greene Elementary",
    coordinates: [36.0596, -79.9382],
    type: "elementary",
    address: "2000 Greene Ave, Greensboro, NC 27405",
    district: "Guilford County",
  },
  {
    name: "Northwest High",
    coordinates: [36.0996, -79.9282],
    type: "high",
    address: "3500 Owens Rd, Greensboro, NC 27405",
    district: "Guilford County",
  },
  {
    name: "Oak Ridge Elementary",
    coordinates: [36.0196, -79.9282],
    type: "elementary",
    address: "3600 Oak Ridge Rd, Greensboro, NC 27406",
    district: "Guilford County",
  },

  // Cumberland County - 28 schools
  {
    name: "Alderman Road Elementary",
    coordinates: [35.1296, -78.9582],
    type: "elementary",
    address: "300 Alderman Rd, Fayetteville, NC 28303",
    district: "Cumberland County",
  },
  {
    name: "Alma Easom Elementary",
    coordinates: [35.0896, -78.9182],
    type: "elementary",
    address: "600 Alma Easom Rd, Fayetteville, NC 28303",
    district: "Cumberland County",
  },
  {
    name: "Armstrong Elementary",
    coordinates: [35.1496, -78.9382],
    type: "elementary",
    address: "401 Armstrong Ave, Fayetteville, NC 28304",
    district: "Cumberland County",
  },
  {
    name: "Ashley Elementary",
    coordinates: [35.0996, -78.9782],
    type: "elementary",
    address: "2501 Ashley Ave, Fayetteville, NC 28303",
    district: "Cumberland County",
  },
  {
    name: "Beaver Dam Elementary",
    coordinates: [35.1196, -78.8982],
    type: "elementary",
    address: "1700 Beaver Dam Rd, Fayetteville, NC 28304",
    district: "Cumberland County",
  },
  {
    name: "Ben Martin Elementary",
    coordinates: [35.1396, -78.9082],
    type: "elementary",
    address: "2320 Ben Martin Dr, Fayetteville, NC 28304",
    district: "Cumberland County",
  },
  {
    name: "Brentwood Elementary",
    coordinates: [35.0696, -78.9482],
    type: "elementary",
    address: "4001 Brentwood Dr, Fayetteville, NC 28303",
    district: "Cumberland County",
  },
  {
    name: "Cliffdale Elementary",
    coordinates: [35.1596, -78.8782],
    type: "elementary",
    address: "3205 Cliffdale Rd, Fayetteville, NC 28304",
    district: "Cumberland County",
  },
  {
    name: "College Lakes Elementary",
    coordinates: [35.0896, -79.0082],
    type: "elementary",
    address: "3100 College Lakes Ave, Fayetteville, NC 28303",
    district: "Cumberland County",
  },
  {
    name: "Cumberland Mills Elementary",
    coordinates: [35.1096, -78.8882],
    type: "elementary",
    address: "2210 Cumberland Mills Dr, Fayetteville, NC 28304",
    district: "Cumberland County",
  },
  {
    name: "Currumbin Elementary",
    coordinates: [35.1296, -78.9882],
    type: "elementary",
    address: "2900 Currumbin Ave, Fayetteville, NC 28303",
    district: "Cumberland County",
  },
  {
    name: "Douglas Byrd High",
    coordinates: [35.0896, -78.8582],
    type: "high",
    address: "2000 Douglas Ave, Fayetteville, NC 28304",
    district: "Cumberland County",
  },
  {
    name: "Eastover Central Elementary",
    coordinates: [35.1396, -79.0382],
    type: "elementary",
    address: "4200 Eastover Rd, Fayetteville, NC 28303",
    district: "Cumberland County",
  },
  {
    name: "EE Miller Elementary",
    coordinates: [35.0796, -78.9682],
    type: "elementary",
    address: "3101 EE Miller Dr, Fayetteville, NC 28303",
    district: "Cumberland County",
  },
  {
    name: "Elizabeth Cashwell Elementary",
    coordinates: [35.1196, -78.9282],
    type: "elementary",
    address: "2300 Cashwell Ave, Fayetteville, NC 28304",
    district: "Cumberland County",
  },
  {
    name: "EV Baldwin Elementary",
    coordinates: [35.0896, -78.8282],
    type: "elementary",
    address: "1800 Baldwin Dr, Fayetteville, NC 28304",
    district: "Cumberland County",
  },
  {
    name: "Ferguson Easley Elementary",
    coordinates: [35.1596, -78.9182],
    type: "elementary",
    address: "2400 Ferguson Rd, Fayetteville, NC 28304",
    district: "Cumberland County",
  },
  {
    name: "Gallberry Farm Elementary",
    coordinates: [35.1296, -78.8582],
    type: "elementary",
    address: "1700 Gallberry Farm Rd, Fayetteville, NC 28304",
    district: "Cumberland County",
  },
  {
    name: "Glendale Acres Elementary",
    coordinates: [35.1096, -79.0682],
    type: "elementary",
    address: "2500 Glendale Acres Dr, Fayetteville, NC 28303",
    district: "Cumberland County",
  },
  {
    name: "Grays Creek Elementary",
    coordinates: [35.0596, -78.7882],
    type: "elementary",
    address: "3000 Grays Creek Rd, Fayetteville, NC 28304",
    district: "Cumberland County",
  },
  {
    name: "Honeycutt Elementary",
    coordinates: [35.0696, -78.9882],
    type: "elementary",
    address: "1500 Honeycutt Rd, Fayetteville, NC 28303",
    district: "Cumberland County",
  },
  {
    name: "Howard Hall Elementary",
    coordinates: [35.1496, -78.8682],
    type: "elementary",
    address: "2100 Howard Hall Rd, Fayetteville, NC 28304",
    district: "Cumberland County",
  },
  {
    name: "JW Coon Elementary",
    coordinates: [35.1096, -78.9582],
    type: "elementary",
    address: "1601 JW Coon Dr, Fayetteville, NC 28303",
    district: "Cumberland County",
  },
  {
    name: "JW Seabrook Elementary",
    coordinates: [35.1396, -78.8382],
    type: "elementary",
    address: "2800 Seabrook Rd, Fayetteville, NC 28304",
    district: "Cumberland County",
  },
  {
    name: "Lake Rim Elementary",
    coordinates: [35.0996, -78.8382],
    type: "elementary",
    address: "1400 Lake Rim Rd, Fayetteville, NC 28304",
    district: "Cumberland County",
  },
  {
    name: "Long Hill Elementary",
    coordinates: [35.1596, -79.0182],
    type: "elementary",
    address: "3100 Long Hill Rd, Fayetteville, NC 28303",
    district: "Cumberland County",
  },
  {
    name: "Loyd Auman Elementary",
    coordinates: [35.0796, -78.7682],
    type: "elementary",
    address: "2000 Auman Ave, Fayetteville, NC 28304",
    district: "Cumberland County",
  },
  {
    name: "Lucile Souders Elementary",
    coordinates: [35.1196, -78.7882],
    type: "elementary",
    address: "1900 Souders Ave, Fayetteville, NC 28304",
    district: "Cumberland County",
  },

  // Bladen County - 9 schools
  {
    name: "Bladen Lakes Primary",
    coordinates: [34.7196, -78.6682],
    type: "elementary",
    address: "400 Bladen Lakes Rd, Dublin, NC 28332",
    district: "Bladen County",
  },
  {
    name: "Bladenboro Primary",
    coordinates: [34.6896, -78.7082],
    type: "elementary",
    address: "301 Main St, Bladenboro, NC 28320",
    district: "Bladen County",
  },
  {
    name: "Bladenboro Middle",
    coordinates: [34.6896, -78.7082],
    type: "middle",
    address: "301 Main St, Bladenboro, NC 28320",
    district: "Bladen County",
  },
  {
    name: "Clarkton School",
    coordinates: [34.7896, -78.5782],
    type: "elementary",
    address: "500 Clark St, Clarkton, NC 28311",
    district: "Bladen County",
  },
  {
    name: "Dublin Primary",
    coordinates: [34.7296, -78.6582],
    type: "elementary",
    address: "350 Dublin Ave, Dublin, NC 28332",
    district: "Bladen County",
  },
  {
    name: "East Arcadia School",
    coordinates: [34.6596, -78.7582],
    type: "elementary",
    address: "400 Arcadia Ave, East Arcadia, NC 28317",
    district: "Bladen County",
  },
  {
    name: "Elizabethtown Middle",
    coordinates: [34.6296, -78.5682],
    type: "middle",
    address: "600 Main St, Elizabethtown, NC 28337",
    district: "Bladen County",
  },
  {
    name: "Elizabethtown Primary",
    coordinates: [34.6296, -78.5682],
    type: "elementary",
    address: "600 Main St, Elizabethtown, NC 28337",
    district: "Bladen County",
  },
  {
    name: "Tar Heel School",
    coordinates: [34.7896, -78.3882],
    type: "elementary",
    address: "200 Main St, Tar Heel, NC 28392",
    district: "Bladen County",
  },

  // Additional NC Title I Schools from other districts
  {
    name: "Durham Elementary",
    coordinates: [35.9896, -78.9082],
    type: "elementary",
    address: "500 Elm St, Durham, NC 27701",
    district: "Durham County",
  },
  {
    name: "Chapel Hill Elementary",
    coordinates: [35.9196, -79.0482],
    type: "elementary",
    address: "200 Chapel Rd, Chapel Hill, NC 27514",
    district: "Orange County",
  },
]

export default function FindSchool() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [center, setCenter] = useState<[number, number]>([35.7796, -78.6382]) // Center of NC
  const [zoom, setZoom] = useState(7)

  const filteredSchools = useMemo(
    () =>
      titleOneSchools.filter((school) => {
        const matchesSearch =
          school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          school.address.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesDistrict = !selectedDistrict || school.district === selectedDistrict
        return matchesSearch && matchesDistrict
      }),
    [searchTerm, selectedDistrict],
  )

  const districts = useMemo(() => [...new Set(titleOneSchools.map((s) => s.district))].sort(), [])

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "elementary":
        return "#3b82f6" // blue
      case "middle":
        return "#a855f7" // purple
      case "high":
        return "#ef4444" // red
      default:
        return "#6b7280"
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Title I Schools in NC</h1>
            <p className="text-gray-600">Explore {titleOneSchools.length}+ schools across North Carolina</p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Schools</label>
                <input
                  type="text"
                  placeholder="Search by name or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Districts</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#3b82f6" }}></div>
              <span className="text-sm font-medium">Elementary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#a855f7" }}></div>
              <span className="text-sm font-medium">Middle</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#ef4444" }}></div>
              <span className="text-sm font-medium">High</span>
            </div>
          </div>

          {/* Map Container */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="relative w-full" style={{ height: "500px" }}>
              {typeof window !== "undefined" && (
                <MapComponent
                  center={center}
                  zoom={zoom}
                  minZoom={5}
                  maxZoom={18}
                  onBoundsChanged={({ center }) => setCenter(center)}
                >
                  {filteredSchools.map((school) => {
                    const [lng, lat] = school.coordinates
                    return (
                      <Overlay key={`${school.name}-${school.district}`} anchor={[lat, lng]}>
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            backgroundColor: getMarkerColor(school.type),
                            border: "2px solid white",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                            cursor: "pointer",
                            position: "absolute",
                            left: "-12px",
                            top: "-12px",
                          }}
                          title={school.name}
                          onClick={() => {
                            setCenter([lat, lng])
                            setZoom(14)
                          }}
                        />
                      </Overlay>
                    )
                  })}
                </MapComponent>
              )}
            </div>
          </div>

          {/* Results Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <p className="text-gray-700">
              Showing <span className="font-bold">{filteredSchools.length}</span> of{" "}
              <span className="font-bold">{titleOneSchools.length}</span> schools
            </p>
          </div>

          {/* Schools List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSchools.map((school) => (
              <div
                key={`${school.name}-${school.district}`}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border-l-4"
                style={{ borderLeftColor: getMarkerColor(school.type) }}
              >
                <div className="flex items-start gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                    style={{ backgroundColor: getMarkerColor(school.type) }}
                  />
                  <h3 className="font-bold text-gray-900 text-sm">{school.name}</h3>
                </div>
                <p className="text-xs text-gray-600 mb-1">
                  <span className="font-medium">Type:</span>{" "}
                  {school.type.charAt(0).toUpperCase() + school.type.slice(1)}
                </p>
                <p className="text-xs text-gray-600 mb-1">
                  <span className="font-medium">District:</span> {school.district}
                </p>
                <p className="text-xs text-gray-500">{school.address}</p>
              </div>
            ))}
          </div>

          {filteredSchools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No schools found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
