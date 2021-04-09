# vodafone-connection-metrics

**View speed and connection metrics of the vodafone gateway you're behind.** Including ISP and network information.

## Installation
```shell
npm install -g vodafone-connection-metrics
```

## Usage
```
Usage:
  vodafone-metrics [options]
    View speed and connection metrics of the vodafone gateway you"re behind
Options:
  --json | -j
    Get metrics in json format
```

## Output
Default:
```
🌍 Internet is provided by Vodafone GmbH in DE
📠 77.22.XXX.XXX is your ip address

👨‍🚀 You are a customer without a planned improvement
🎭 A VPN was not detected
```

JSON:
```JSON
{
  "downstreamSpeed": 0,
  "upstreamSpeed": 0,
  "downstreamBooked": null,
  "upstreamBooked": null,
  "isp": "Vodafone GmbH",
  "ipCountry": "DE",
  "clientIp": "77.22.XXX.XXX",
  "isCustomer": true,
  "vendor": "",
  "modemType": null,
  "plannedImprovement": false,
  "isO2Customer": false,
  "swapScenario": null,
  "swapLink": null,
  "vpnDetected": null,
  "vpnDetectedBy": "ext"
}
```

## Contributing

At it"s current state, vodafone-connection-metrics queries a speedtest endpoint provided by vodafone. If you have additional data sources that could fit in with the tool, feel free to create an [issue](https://github.com/Adwirawien/vodafone-connection-metrics/issues) or a pull request.

