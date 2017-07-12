#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
let filename = process.argv[2]

const content =
`<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title>${filename}</title>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    Hello world !

    <script>
      console.log('hello world !')
    </script>
  </body>
</html>`

if (filename) {
  fs.open(`${filename}.html`, 'r', (err, fd) => {
    if (err) {
      fs.writeFile(`${filename}.html`, content, (err) => {
        if (err) return err
        console.log(`${filename}.html has been created !`)

        exec(`atom ${filename}.html`, (err, stdout, stderr) => {
          if (err) return err
          exec(`open ${filename}.html`, (err, stdout, stderr) => {
            if (err) return err
          })
        })
      })
    } else {
      console.log(`${filename}.html already exist !`)

      exec(`atom ${filename}.html`, (err, stdout, stderr) => {
        if (err) return err
        exec(`open ${filename}.html`, (err, stdout, stderr) => {
          if (err) return err
        })
      })
    }
  })
} else {
  console.error('Lost file name')
}
