"use strict";

const fetch = require("node-fetch");

const getSpeedtestPort = async () => {
  try {
    const url = "https://rpd.speedtest.unitymedia.de/";

    let res = await fetch(url);
    res = await res.json();
    return res.port;
  } catch (error) {
    return error.name;
  }
};

const fetchMetrics = async () => {
  const port = await getSpeedtestPort();
  if (typeof port === "string")
    return Promise.reject(`could not fetch port (${port})`);

  try {
    const url = `https://speedtest.vodafone.de/ajax/speedtest-init/?port=${port}`;

    const res = await fetch(url);
    let json = await res.json();
    delete json.speedtestId; // we don't need the id
    return Promise.resolve(json);
  } catch (error) {
    return Promise.reject(`could not fetch information (${error.name})`)
  }
};

const printReadable = (metrics) => {
  process.stdout.write(`\n`)

  const downstream = metrics['downstreamBooked'];
  const upstream = metrics['upstreamBooked'];
  if (downstream && upstream) {
    process.stdout.write(`💫 Your current connection is equipped with ${downstream}mbits down and ${upstream}mbits upload.\n\n`);
  }

  const isp = metrics['isp'];
  const country = metrics['ipCountry'];
  const ip = metrics['clientIp'];
  process.stdout.write(`🌍 Internet is provided by ${isp} in ${country}\n`);
  process.stdout.write(`📠 ${ip} is your ip address\n\n`);

  const isCustomer = metrics['isCustomer'];
  const isO2Customer = metrics['isO2Customer'];
  if (isCustomer || isO2Customer) {
    const plannedImprovement = metrics['plannedImprovement'];
    process.stdout.write(`👨‍🚀 You are ${isO2Customer ? 'an O2' : 'a'} customer ${plannedImprovement ? 'with' : 'without'} a planned improvement\n`)
  }

  const vendor = metrics['vendor'];
  const modemType = metrics['modemType'];
  if (vendor && modemType) {
    process.stdout.write(`📡 You receive internet from the modem of type ${modemType} vendored by ${vendor}\n\n`)
  }

  const vpnDetected = metrics['vpnDetected']
  process.stdout.write(`🎭 A VPN was ${!vpnDetected ? 'not detected' : 'detected'}\n`)

  process.stdout.write(`\n`)
}

module.exports = {fetchMetrics, printReadable};
