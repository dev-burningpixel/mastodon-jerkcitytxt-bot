/*
JERKCITY Mastodon bot
Daily message from a txt file
*/

//import { login } from 'masto';

const masto = require('masto');
const fs = require('fs');

async function main() {
  // get line from jerkcity text
  console.log("opening working_jerkcity.txt");
  await fs.readFile("data/working_jerkcity.txt", 'utf8', async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let newPost = "";
    let jerkLines;

    jerkLines = data.split("\n");

    newPost = jerkLines[0];

    jerkLines.shift();

    console.log("newPost: " + newPost);
    console.log("saving working_jerkcity.txt");
    fs.writeFile("data/working_jerkcity.txt", jerkLines.join("\n"), { flag: 'w+' }, async (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log("connecting to mastodon...");
      
      require('dotenv').config();

      const mastoClient = await masto.login({
        url: 'https://free.burningpixel.net',
        accessToken: process.env.ACCESSKEY,
      });

      console.log("writing post");

      await mastoClient.statuses.create({
        status: newPost,
        visibility: 'public',
      });
    });
  });
}

main().catch((error) => {
  console.log("running bot!")
  console.error(error);
});