# Xinchro's World Clocks

Once upon a time [Xinchro](https://github.com/xinchro) got tired of googling timezones, so he made this.

Written in [VueJS](http://vuejs.org/).

## Usage

This assumes you already have the AWS CLI installed and working, as well as Ruby SASS.
Everything else is pretty self explanatory: There are a few commands for watching for code changes (as well as hosting on localhost:80) and one for syncing to your(mine in the code) S3 bucket.

To add more clocks, you just need to add a new object with a name and UTC offset to the `locations` array.

Colors are handled in `getColorByHour`, 4 colors (not including text) per state. These are the background and the 3 arms. Currently supports 4 color states: dawn, noon, dusk and zero((midnight).

## Contributing

No need for contributions at this time, but if you feel like you have to: just follow the extemely loose code style and PR the changes.