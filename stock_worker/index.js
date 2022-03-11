const CronJob = require('cron').CronJob
const { getData } = require('./src/db/stock.db')
require('./src/db/mongodb')

const { url, time1, time2, time3 } = require('./src/config/config')

const job1 = new CronJob(time1, () => {
  getData(url)
}, null, true)
job1.start()

const job2 = new CronJob(time2, () => {
  getData(url)
}, null, true)
job2.start()

const job3 = new CronJob(time3, () => {
  getData(url)
}, null, true)
job3.start()
