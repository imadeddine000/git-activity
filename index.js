import axios from "axios"

const token = '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';
axios.defaults.headers.common['Authorization'] = `token ${token}`;
axios.defaults.headers.common['X-GitHub-Api-Version'] = '2022-11-28';

let dates = []

const fetchCommits = async () => {
  await axios.get('https://api.github.com/repos/larbi-ishak/bioPro/commits')
    .then(response => {
      console.log("total commits: ", response.data.length)

      // append commits to the array 
      response.data.forEach((other) => {
        dates.push(other?.commit?.author?.date)
      })
      consumeCommits()

    })
    .catch(error => {
      console.error('Error:', error.response.status, error.response.data);
    });

}
fetchCommits()

const consumeCommits = () => {
  console.log("dates", dates)
  const first_commit = dates[dates.length - 1]
  const fCommit_date = new Date(first_commit)
  const last_commit = dates[0]
  const lCommit_date = new Date(last_commit)

  console.log("first commit", fCommit_date)
  console.log("last commit", lCommit_date)

  const convertUnit = 1000 * 60 * 60 * 24 // ms * second * minute * hour  a day
  const days_number_between_last_first = Math.floor((lCommit_date - fCommit_date) / convertUnit)

  console.log(days_number_between_last_first, "Days between the first and the last commit")



}
